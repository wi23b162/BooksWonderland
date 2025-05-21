<?php
require_once '../config/dbaccess.php';
require_once '../models/user.class.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (
  !isset($data['id']) ||
  !isset($data['vorname']) ||
  !isset($data['nachname']) ||
  !isset($data['email']) ||
  !isset($data['is_admin'])
) {
  echo json_encode(['success' => false, 'message' => 'Unvollständige Daten']);
  exit;
}

try {
  $success = User::update($pdo, $data);
  echo json_encode(['success' => $success]);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'message' => 'Fehler: ' . $e->getMessage()]);
}
