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
        $stmt = $this->db->query("SELECT id, nome, CRM, UFCRM FROM medicos WHERE deleted_at IS NULL ORDER BY id ASC");
        return $stmt->fetchAll();
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare("SELECT id, nome, CRM, UFCRM FROM medicos WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute([':id' => $id]);
        $result = $stmt->fetch();
        return $result ?: null;
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

    public function update(int $id, array $data): bool
    {
        $stmt = $this->db->prepare("UPDATE medicos SET nome = :nome, CRM = :CRM, UFCRM = :UFCRM WHERE id = :id AND deleted_at IS NULL");
        return $stmt->execute([
            ':nome' => $data['nome'],
            ':CRM' => $data['CRM'],
            ':UFCRM' => $data['UFCRM'],
            ':id' => $id
        ]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare("UPDATE medicos SET deleted_at = NOW() WHERE id = :id AND deleted_at IS NULL");
        return $stmt->execute([':id' => $id]);
    }
}