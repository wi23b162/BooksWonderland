<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
  echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
  exit;
}

$userId = $_SESSION['user']['id'];

try {
  $stmt = $pdo->prepare("SELECT id, total, created_at, status FROM orders WHERE user_id = ? ORDER BY created_at DESC");
  $stmt->execute([$userId]);
  $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(["success" => true, "orders" => $orders]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler beim Laden der Bestellungen: " . $e->getMessage()]);
}
