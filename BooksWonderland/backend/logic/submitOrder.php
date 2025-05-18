<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
  echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$items = $data['items'] ?? [];
$shipping = 3.90;

if (empty($items)) {
  echo json_encode(["success" => false, "message" => "Keine Artikel erhalten"]);
  exit;
}

try {
  $pdo->beginTransaction();
  $userId = $_SESSION['user']['id'];

  $subtotal = 0;
  foreach ($items as $item) {
    $subtotal += $item['quantity'] * $item['price'];
  }

  $voucher = $_SESSION['voucher'] ?? null;
  $discount = 0;
  $voucherCode = null;

  if ($voucher) {
    $voucherCode = $voucher['code'];
    $discount = $voucher['type'] === 'percent'
      ? $subtotal * ($voucher['amount'] / 100)
      : $voucher['amount'];
  }

  $total = max(0, $subtotal - $discount + $shipping);

  $stmt = $pdo->prepare("INSERT INTO orders (user_id, total, shipping, voucher_code, created_at, status) VALUES (?, ?, ?, ?, NOW(), 'offen')");
  $stmt->execute([$userId, $total, $shipping, $voucherCode]);
  $orderId = $pdo->lastInsertId();

  $stmtItem = $pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
  foreach ($items as $item) {
    $stmtItem->execute([$orderId, $item['id'], $item['quantity'], $item['price']]);
  }

  $pdo->commit();

  unset($_SESSION['voucher']); // Gutschein aus Session entfernen

  echo json_encode(["success" => true, "orderId" => $orderId]);
} catch (Exception $e) {
  $pdo->rollBack();
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}
