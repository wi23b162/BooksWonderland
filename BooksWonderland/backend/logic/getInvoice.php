<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
  echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
  exit;
}

$orderId = $_GET['orderId'] ?? null;
if (!$orderId) {
  echo json_encode(["success" => false, "message" => "Keine Bestellnummer angegeben"]);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT o.*, u.vorname, u.nachname, u.adresse FROM orders o JOIN users u ON o.user_id = u.id WHERE o.id = ? AND o.user_id = ?");
  $stmt->execute([$orderId, $_SESSION['user']['id']]);
  $order = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$order) {
    echo json_encode(["success" => false, "message" => "Bestellung nicht gefunden"]);
    exit;
  }

  $stmtItems = $pdo->prepare("SELECT p.title, i.quantity, i.price FROM order_items i JOIN products p ON i.product_id = p.id WHERE i.order_id = ?");
  $stmtItems->execute([$orderId]);
  $items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

  // Optional: Gutschein (falls vorhanden)
  $voucher = null;
  if (!empty($order['voucher_code'])) {
    $stmtV = $pdo->prepare("SELECT code, amount FROM coupons WHERE code = ?");
    $stmtV->execute([$order['voucher_code']]);
    $voucher = $stmtV->fetch(PDO::FETCH_ASSOC);
  }

  echo json_encode([
    "success" => true,
    "order" => [
      "id" => $order['id'],
      "created_at" => $order['created_at'],
      "total" => $order['total'],
      "shipping" => $order['shipping'],
      "voucher" => $voucher,
      "customer_name" => $order['vorname'] . ' ' . $order['nachname'],
      "address" => $order['adresse'],
      "items" => $items
    ]
  ]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}
