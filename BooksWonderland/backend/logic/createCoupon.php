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

if (!$code || $amount <= 0) {
  echo json_encode(["success" => false, "message" => "Ungültige Eingaben"]);
  exit;
}

try {
  $stmt = $pdo->prepare("INSERT INTO coupons (code, amount) VALUES (?, ?)");
  $stmt->execute([$code, $amount]);
  echo json_encode(["success" => true, "message" => "Gutschein erstellt"]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}
?>
