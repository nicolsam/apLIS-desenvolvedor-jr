<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/Controller/MedicoController.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

$uri = parse_url($requestUri, PHP_URL_PATH);

if ($uri === '/api/v1/medicos' && $requestMethod === 'GET') {
    $controller = new \App\Controller\MedicoController();
    $controller->index();
} elseif ($uri === '/api/v1/medicos' && $requestMethod === 'POST') {
    $controller = new \App\Controller\MedicoController();
    $controller->store();
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}