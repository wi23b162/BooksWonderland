<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user']) || $_SESSION['user']['is_admin'] != 1) {
  echo json_encode([]);
  exit;
}

try {
  $stmt = $pdo->query("SELECT code, amount, type, valid_until FROM coupons ORDER BY valid_until DESC");
  $vouchers = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($vouchers);
} catch (Exception $e) {
  echo json_encode([]);
}
