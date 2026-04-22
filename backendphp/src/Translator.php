<?php

class Translator {
    private static array $translations = [
        'pt-BR' => [
            'invalid_data' => 'Dados inválidos',
            'doctor_created' => 'Médico criado com sucesso',
            'doctor_updated' => 'Médico atualizado com sucesso',
            'doctor_deleted' => 'Médico removido com sucesso',
            'doctor_restored' => 'Médico restaurado com sucesso',
            'crm_exists' => 'CRM já cadastrado no sistema',
            'error_creating' => 'Erro ao criar médico',
            'error_updating' => 'Erro ao atualizar médico',
            'error_deleting' => 'Erro ao remover médico',
            'error_restoring' => 'Erro ao restaurar médico',
            'patient_created' => 'Paciente criado com sucesso',
            'patient_updated' => 'Paciente atualizado com sucesso',
            'patient_deleted' => 'Paciente removido com sucesso',
            'patient_restored' => 'Paciente restaurado com sucesso',
            'cpf_exists' => 'CPF já cadastrado no sistema',
            'not_found' => 'Registro não encontrado',
        ],
        'en-EN' => [
            'invalid_data' => 'Invalid data',
            'doctor_created' => 'Doctor created successfully',
            'doctor_updated' => 'Doctor updated successfully',
            'doctor_deleted' => 'Doctor removed successfully',
            'doctor_restored' => 'Doctor restored successfully',
            'crm_exists' => 'CRM already registered in the system',
            'error_creating' => 'Error creating doctor',
            'error_updating' => 'Error updating doctor',
            'error_deleting' => 'Error removing doctor',
            'error_restoring' => 'Error restoring doctor',
            'patient_created' => 'Patient created successfully',
            'patient_updated' => 'Patient updated successfully',
            'patient_deleted' => 'Patient removed successfully',
            'patient_restored' => 'Patient restored successfully',
            'cpf_exists' => 'CPF already registered in the system',
            'not_found' => 'Record not found',
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