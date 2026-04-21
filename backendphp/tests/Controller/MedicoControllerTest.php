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

    public function testStoreWithEnglishAcceptLanguage(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'en-EN';
        
        $testInput = json_encode([
            'nome' => 'Dr. Incomplete'
        ]);
        
        $this->mockHttpInput($testInput);
        
        ob_start();
        $this->controller->store();
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        $this->assertArrayHasKey('error', $response);
        $this->assertEquals('Invalid data', $response['error']);
        
        $this->cleanupHttpInput();
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testStoreWithPortugueseAcceptLanguage(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR';
        
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
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testShowWithNonExistentId(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR';
        
        ob_start();
        $this->controller->show(999999);
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        $this->assertArrayHasKey('error', $response);
        $this->assertEquals('Registro não encontrado', $response['error']);
        
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testShowWithEnglishAcceptLanguage(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'en-EN';
        
        ob_start();
        $this->controller->show(999999);
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        $this->assertArrayHasKey('error', $response);
        $this->assertEquals('Record not found', $response['error']);
        
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testDestroyWithNonExistentId(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'pt-BR';
        
        ob_start();
        $this->controller->destroy(999999);
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        $this->assertArrayHasKey('error', $response);
        $this->assertEquals('Registro não encontrado', $response['error']);
        
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    public function testDestroyWithEnglishAcceptLanguage(): void
    {
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'en-EN';
        
        ob_start();
        $this->controller->destroy(999999);
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        $this->assertArrayHasKey('error', $response);
        $this->assertEquals('Record not found', $response['error']);
        
        unset($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }

    private function mockHttpInput(string $data): void
    {
        $GLOBALS['mock_http_input_data'] = $data;
    }

    private function cleanupHttpInput(): void
    {
        unset($GLOBALS['mock_http_input_data']);
    }
}