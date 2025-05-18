<?php
session_start();
header('Content-Type: application/json');
require_once '../config/dbaccess.php';

$data = json_decode(file_get_contents("php://input"), true);
$code = trim($data['code'] ?? '');

if (!$code) {
  echo json_encode(["success" => false, "message" => "Kein Gutscheincode angegeben."]);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT * FROM coupons WHERE code = ? AND valid_until >= CURDATE()");
  $stmt->execute([$code]);
  $coupon = $stmt->fetch();

  if (!$coupon) {
    echo json_encode(["success" => false, "message" => "Gutschein ungültig oder abgelaufen."]);
    exit;
  }

  $_SESSION['voucher'] = [
    'code' => $coupon['code'],
    'amount' => $coupon['amount'],
    'type' => $coupon['type'] // 'percent' oder 'fixed'
  ];

  echo json_encode([
    "success" => true,
    "message" => "🎉 Gutschein erfolgreich eingelöst!",
    "amount" => $coupon['amount'],
    "type" => $coupon['type'],
    "code" => $coupon['code']
  ]);

} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}
