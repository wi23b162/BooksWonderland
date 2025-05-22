<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user']) || !$_SESSION['user']['is_admin']) {
  echo json_encode(["success" => false, "message" => "Kein Zugriff"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$code = trim($data['code']);
$amount = floatval($data['amount']);
$type = $data['type'] ?? 'percent';
$valid_until = $data['valid_until'] ?? null;

if (!$code || $amount <= 0 || !in_array($type, ['percent', 'fixed'])) {
  echo json_encode(["success" => false, "message" => "Ungültige Eingaben"]);
  exit;
}

try {
  $stmt = $pdo->prepare("INSERT INTO coupons (code, amount, type, valid_until) VALUES (?, ?, ?, ?)");
  $stmt->execute([$code, $amount, $type, $valid_until]);
  echo json_encode(["success" => true, "message" => "Gutschein erstellt"]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}