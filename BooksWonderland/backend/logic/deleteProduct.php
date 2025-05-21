<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Nur POST erlaubt.']);
  exit;
}

if (!isset($_SESSION['user']) || $_SESSION['user']['is_admin'] != 1) {
  http_response_code(403);
  echo json_encode(['success' => false, 'message' => 'Nicht autorisiert.']);
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$productId = $data['id'] ?? null;

if (!$productId) {
  echo json_encode(['success' => false, 'message' => 'Produkt-ID fehlt.']);
  exit;
}

try {
  $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
  $stmt->execute([$productId]);
  echo json_encode(['success' => true]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Fehler beim Löschen: ' . $e->getMessage()]);
}
