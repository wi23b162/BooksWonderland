<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
  echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$method = $data['method'] ?? null;
$userId = $_SESSION['user']['id'];

if (!$method) {
  echo json_encode(["success" => false, "message" => "Keine Zahlungsmethode angegeben"]);
  exit;
}

try {
  $stmt = $pdo->prepare("
    INSERT INTO user_payment (user_id, method)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE method = VALUES(method)
  ");
  $stmt->execute([$userId, $method]);
  echo json_encode(["success" => true, "message" => "Zahlungsmethode aktualisiert"]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}
?>
