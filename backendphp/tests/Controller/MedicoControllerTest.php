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

    public function testStoreCreatesMedico(): void
    {
        $this->markTestSkipped('Store test requires http://input mock - tested via integration test');
    }

    public function testStoreWithInvalidData(): void
    {
        $this->markTestSkipped('Store test requires http://input mock - tested via integration test');
    }
}