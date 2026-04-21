<?php

class Translator {
    private static array $translations = [
        'pt-BR' => [
            'invalid_data' => 'Dados inválidos',
            'doctor_created' => 'Médico criado com sucesso',
            'crm_exists' => 'CRM já cadastrado no sistema',
            'error_creating' => 'Erro ao criar médico',
            'patient_created' => 'Paciente criado com sucesso',
            'cpf_exists' => 'CPF já cadastrado no sistema',
        ],
        'en-EN' => [
            'invalid_data' => 'Invalid data',
            'doctor_created' => 'Doctor created successfully',
            'crm_exists' => 'CRM already registered in the system',
            'error_creating' => 'Error creating doctor',
            'patient_created' => 'Patient created successfully',
            'cpf_exists' => 'CPF already registered in the system',
        ],
    ];

    public static function get(string $key): string {
        $lang = self::getLanguage();
        return self::$translations[$lang][$key] ?? $key;
    }

    public static function getLanguage(): string {
        $header = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? 'pt-BR';
        if (str_starts_with($header, 'en')) {
            return 'en-EN';
        }
        return 'pt-BR';
    }
}