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

if (!$productId || empty($data['title']) || empty($data['author']) || empty($data['description']) || empty($data['price']) || empty($data['image'])) {
  echo json_encode(['success' => false, 'message' => 'Unvollständige Daten übergeben.']);
  exit;
}

try {
  $stmt = $pdo->prepare("UPDATE products SET title = ?, author = ?, description = ?, price = ?, image = ?, rating = ? WHERE id = ?");

  $stmt->execute([
    $data['title'],
    $data['author'],
    $data['description'],
    $data['price'],
    $data['image'],
    $data['rating'],
    $productId
  ]);
  echo json_encode(['success' => true]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Fehler beim Aktualisieren: ' . $e->getMessage()]);
}
