<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
  echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
  exit;
}

try {
  if ($_SESSION['user']['is_admin'] == 1) {
    // Admin sieht alle Bestellungen
    $stmt = $pdo->query("
      SELECT o.*, CONCAT(u.vorname, ' ', u.nachname) AS user_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    ");
  } else {
    // Normale Benutzer sehen nur ihre Bestellungen
    $userId = $_SESSION['user']['id'];
    $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
  }

  $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(["success" => true, "orders" => $orders]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler beim Laden: " . $e->getMessage()]);
}
