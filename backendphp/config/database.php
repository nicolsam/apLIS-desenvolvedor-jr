<?php

namespace App\Config;

function getDB(): \PDO
{
    $host = getenv('DB_HOST') ?: 'mysql';
    $port = getenv('DB_PORT') ?: 3306;
    $dbname = getenv('DB_NAME') ?: 'aplis_test';
    $user = getenv('DB_USER') ?: 'root';
    $password = getenv('DB_PASSWORD') ?: 'root_password';

    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";

    $pdo = new \PDO($dsn, $user, $password, [
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        \PDO::ATTR_EMULATE_PREPARES => false
    ]);

    return $pdo;
}