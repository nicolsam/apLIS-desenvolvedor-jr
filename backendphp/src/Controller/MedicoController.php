<?php

namespace App\Controller;

require_once __DIR__ . '/../Model/Medico.php';
require_once __DIR__ . '/../Translator.php';

class MedicoController
{
    public function index(): void
    {
        $medico = new \App\Model\Medico();
        $medicos = $medico->all();
        
        header('Content-Type: application/json');
        echo json_encode($medicos);
    }

    public function store(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['nome']) || !isset($data['CRM']) || !isset($data['UFCRM'])) {
            http_response_code(400);
            echo json_encode(['error' => \Translator::get('invalid_data')]);
            return;
        }

        $medico = new \App\Model\Medico();
        
        try {
            $result = $medico->create($data);
            if ($result) {
                echo json_encode(['message' => \Translator::get('doctor_created')]);
            }
        } catch (\Exception $e) {
            if ($e->getCode() == 409) {
                http_response_code(409);
                echo json_encode(['error' => \Translator::get('crm_exists')]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => \Translator::get('error_creating')]);
            }
        }
    }
}