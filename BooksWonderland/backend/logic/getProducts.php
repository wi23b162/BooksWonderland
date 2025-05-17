<?php
header('Content-Type: application/json');
require_once '../config/dbaccess.php';

try {
  $stmt = $pdo->query("SELECT * FROM products");
  $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($products);
} catch (Exception $e) {
  echo json_encode(["error" => "Produkte konnten nicht geladen werden."]);
}
?>
