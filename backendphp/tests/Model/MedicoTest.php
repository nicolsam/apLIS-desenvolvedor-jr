<?php

namespace Tests\Model;

require_once __DIR__ . '/../../vendor/autoload.php';

use App\Model\Medico;
use Tests\TestCase;

class MedicoTest extends TestCase
{
    private Medico $medico;

    protected function setUp(): void
    {
        parent::setUp();
        $this->medico = new Medico();
    }

    public function testAllReturnsArray(): void
    {
        $result = $this->medico->all();
        
        $this->assertIsArray($result);
    }

    public function testAllContainsExpectedKeys(): void
    {
        $result = $this->medico->all();
        
        if (count($result) > 0) {
            $this->assertArrayHasKey('id', $result[0]);
            $this->assertArrayHasKey('nome', $result[0]);
            $this->assertArrayHasKey('CRM', $result[0]);
            $this->assertArrayHasKey('UFCRM', $result[0]);
        }
    }

    public function testCreateInsertsData(): void
    {
        $data = [
            'nome' => 'Dr. Test PHPUnit',
            'CRM' => '999999',
            'UFCRM' => 'DF'
        ];
        
        $result = $this->medico->create($data);
        
        $this->assertTrue($result);
        
        $all = $this->medico->all();
        $lastMedico = end($all);
        $this->assertEquals('Dr. Test PHPUnit', $lastMedico['nome']);
    }
}