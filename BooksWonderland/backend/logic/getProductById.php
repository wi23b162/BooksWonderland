<?php
header('Content-Type: application/json');
require_once '../config/dbaccess.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
  echo json_encode(['error' => 'Ungültige Produkt-ID']);
  exit;
}

$id = (int) $_GET['id'];

$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

if ($product) {
  echo json_encode($product);
} else {
  echo json_encode(['error' => 'Produkt nicht gefunden']);
}
?>
