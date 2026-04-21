<?php

namespace Tests\Controller;

require_once __DIR__ . '/../../vendor/autoload.php';

use App\Controller\MedicoController;
use Tests\TestCase;

class MedicoControllerTest extends TestCase
{
    private MedicoController $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->controller = new MedicoController();
    }

    public function testIndexReturnsJson(): void
    {
        ob_start();
        $this->controller->index();
        $output = ob_get_clean();

        $this->assertJson($output);
        
        $data = json_decode($output, true);
        $this->assertIsArray($data);
        
        if (count($data) > 0) {
            $this->assertArrayHasKey('id', $data[0]);
            $this->assertArrayHasKey('nome', $data[0]);
            $this->assertArrayHasKey('CRM', $data[0]);
            $this->assertArrayHasKey('UFCRM', $data[0]);
        }
    }

    public function testStoreWithValidData(): void
    {
        $testInput = json_encode([
            'nome' => 'Dr. Test Integration',
            'CRM' => 'TEST' . time(),
            'UFCRM' => 'SP'
        ]);
        
        $this->mockHttpInput($testInput);
        
        ob_start();
        $this->controller->store();
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        $this->assertArrayHasKey('message', $response);
        $this->assertEquals('Médico criado com sucesso', $response['message']);
        
        $this->cleanupHttpInput();
    }

    public function testStoreWithDuplicateCRM(): void
    {
        $existingCrm = 'DUPLICATE' . time();
        
        $this->mockHttpInput(json_encode([
            'nome' => 'Dr. First',
            'CRM' => $existingCrm,
            'UFCRM' => 'SP'
        ]));
        ob_start();
        $this->controller->store();
        ob_get_clean();
        $this->cleanupHttpInput();
        
        $this->mockHttpInput(json_encode([
            'nome' => 'Dr. Duplicate',
            'CRM' => $existingCrm,
            'UFCRM' => 'SP'
        ]));
        
        ob_start();
        $this->controller->store();
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        $this->assertArrayHasKey('error', $response);
        $this->assertEquals('CRM já cadastrado no sistema', $response['error']);
        
        $this->cleanupHttpInput();
    }

    public function testStoreWithMissingData(): void
    {
        $testInput = json_encode([
            'nome' => 'Dr. Incomplete'
        ]);
        
        $this->mockHttpInput($testInput);
        
        ob_start();
        $this->controller->store();
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        $this->assertArrayHasKey('error', $response);
        $this->assertEquals('Dados inválidos', $response['error']);
        
        $this->cleanupHttpInput();
    }

    private function mockHttpInput(string $data): void
    {
        $stream = fopen('php://memory', 'w+');
        fwrite($stream, $data);
        rewind($stream);
        stream_wrapper_unregister('php://input');
        stream_wrapper_register('php://input', 'MockInputStream');
        
        class MockInputStream {
            private $data;
            public function stream_open($path, $mode, $options, &$opened_path) {
                $this->data = $GLOBALS['mock_http_input_data'] ?? '';
                return true;
            }
            public function stream_read($count) {
                $data = $this->data;
                $this->data = '';
                return $data;
            }
            public function stream_eof() {
                return $this->data === '';
            }
        }
        
        $GLOBALS['mock_http_input_data'] = $data;
    }

    private function cleanupHttpInput(): void
    {
        stream_wrapper_restore('php://input');
        unset($GLOBALS['mock_http_input_data']);
    }
}