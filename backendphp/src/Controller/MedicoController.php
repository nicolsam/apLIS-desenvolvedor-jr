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

    public function show(int $id): void
    {
        $medico = new \App\Model\Medico();
        $result = $medico->find($id);
        
        header('Content-Type: application/json');
        if ($result) {
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(['error' => \Translator::get('not_found')]);
        }
    }

    public function store(): void
    {
        $inputData = $GLOBALS['mock_http_input_data'] ?? null;
        $data = $inputData ? json_decode($inputData, true) : json_decode(file_get_contents('php://input'), true);
        
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

    public function update(int $id): void
    {
        $inputData = $GLOBALS['mock_http_input_data'] ?? null;
        $data = $inputData ? json_decode($inputData, true) : json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['nome']) || !isset($data['CRM']) || !isset($data['UFCRM'])) {
            http_response_code(400);
            echo json_encode(['error' => \Translator::get('invalid_data')]);
            return;
        }

        $medico = new \App\Model\Medico();
        
        $exists = $medico->find($id);
        if (!$exists) {
            http_response_code(404);
            echo json_encode(['error' => \Translator::get('not_found')]);
            return;
        }

        try {
            $result = $medico->update($id, $data);
            if ($result) {
                echo json_encode(['message' => \Translator::get('doctor_updated')]);
            }
        } catch (\Exception $e) {
            if ($e->getCode() == 409) {
                http_response_code(409);
                echo json_encode(['error' => \Translator::get('crm_exists')]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => \Translator::get('error_updating')]);
            }
        }
    }

    public function destroy(int $id): void
    {
        $medico = new \App\Model\Medico();
        
        $exists = $medico->find($id);
        if (!$exists) {
            http_response_code(404);
            echo json_encode(['error' => \Translator::get('not_found')]);
            return;
        }

        $result = $medico->delete($id);
        if ($result) {
            echo json_encode(['message' => \Translator::get('doctor_deleted')]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => \Translator::get('error_deleting')]);
        }
    }

    public function restore(int $id): void
    {
        $medico = new \App\Model\Medico();
        
        $stmt = $medico->findDeleted($id);
        if (!$stmt) {
            http_response_code(404);
            echo json_encode(['error' => \Translator::get('not_found')]);
            return;
        }

        $result = $medico->restore($id);
        if ($result) {
            echo json_encode(['message' => \Translator::get('doctor_restored')]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => \Translator::get('error_restoring')]);
        }
    }
}