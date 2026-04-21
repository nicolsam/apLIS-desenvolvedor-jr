<?php

namespace App\Model;

require_once __DIR__ . '/../../config/database.php';

class Medico
{
    private \PDO $db;

    public function __construct()
    {
        $this->db = \App\Config\getDB();
    }

    public function all(): array
    {
        $stmt = $this->db->query("SELECT id, nome, CRM, UFCRM FROM medicos ORDER BY id ASC");
        return $stmt->fetchAll();
    }

    public function create(array $data): bool
    {
        try {
            $stmt = $this->db->prepare("INSERT INTO medicos (nome, CRM, UFCRM) VALUES (:nome, :CRM, :UFCRM)");
            return $stmt->execute([
                ':nome' => $data['nome'],
                ':CRM' => $data['CRM'],
                ':UFCRM' => $data['UFCRM']
            ]);
        } catch (\PDOException $e) {
            if ($e->getCode() == 23000) {
                throw new \Exception('CRM duplicado', 409);
            }
            throw $e;
        }
    }
}