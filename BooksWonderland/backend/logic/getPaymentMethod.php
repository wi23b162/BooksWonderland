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
  $stmt = $pdo->prepare("SELECT method FROM user_payment WHERE user_id = ?");
  $stmt->execute([$userId]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($row) {
    echo json_encode(["success" => true, "method" => $row['method']]);
  } else {
    echo json_encode(["success" => true, "method" => ""]);
  }
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
