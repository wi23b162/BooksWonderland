<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
  echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT anrede, vorname, nachname, adresse, adresszusatz, stadt, bundesland, plz FROM users WHERE id = ?");
  $stmt->execute([$_SESSION['user']['id']]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($user) {
    echo json_encode(["success" => true, "user" => $user]);
  } else {
    echo json_encode(["success" => false, "message" => "Benutzer nicht gefunden"]);
  }
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
