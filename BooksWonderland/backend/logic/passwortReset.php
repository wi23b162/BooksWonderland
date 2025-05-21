<?php
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');

if (!$email) {
  echo json_encode(["success" => false, "message" => "Keine E-Mail angegeben."]);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  if (!$user) {
    echo json_encode(["success" => false, "message" => "E-Mail nicht gefunden."]);
    exit;
  }

  // Für Schulprojekt: Passwort direkt auf "neuespasswort" setzen
  $newPassword = password_hash("neuespasswort", PASSWORD_DEFAULT);
  $update = $pdo->prepare("UPDATE users SET passwort = ? WHERE id = ?");
  $update->execute([$newPassword, $user['id']]);

  echo json_encode(["success" => true, "message" => "Neues Passwort ist: 'neuespasswort'"]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}
?>
