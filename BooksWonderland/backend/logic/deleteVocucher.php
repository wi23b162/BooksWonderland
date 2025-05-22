<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user']) || !$_SESSION['user']['is_admin']) {
  echo json_encode(["success" => false, "message" => "Nicht autorisiert"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$code = trim($data['code'] ?? '');

if (!$code) {
  echo json_encode(["success" => false, "message" => "Kein Code angegeben"]);
  exit;
}

try {
  $stmt = $pdo->prepare("DELETE FROM coupons WHERE code = ?");
  $stmt->execute([$code]);
  echo json_encode(["success" => true]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}