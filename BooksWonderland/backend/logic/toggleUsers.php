<?php
require_once '../config/dbaccess.php';
require_once '../models/user.class.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['active'])) {
  echo json_encode(['success' => false, 'message' => 'Fehlende Daten']);
  exit;
}

$success = User::setActive($pdo, (int)$data['id'], (int)$data['active']);
echo json_encode(['success' => $success]);
