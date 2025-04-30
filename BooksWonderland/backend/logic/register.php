<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if ($data['passwort'] !== $data['passwort2']) {
  echo json_encode(["success" => false, "message" => "Passwörter stimmen nicht überein"]);
  exit;
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["success" => false, "message" => "Ungültige E-Mail-Adresse"]);
  exit;
}

$sql_check_username = "SELECT * FROM users WHERE benutzername = ?";
$stmt_check_username = $pdo->prepare($sql_check_username);
$stmt_check_username->execute([$data['benutzername']]);
if ($stmt_check_username->rowCount() > 0) {
  echo json_encode(["success" => false, "message" => "Benutzername bereits vergeben"]);
  exit;
}

$sql_check_email = "SELECT * FROM users WHERE email = ?";
$stmt_check_email = $pdo->prepare($sql_check_email);
$stmt_check_email->execute([$data['email']]);
if ($stmt_check_email->rowCount() > 0) {
  echo json_encode(["success" => false, "message" => "E-Mail bereits vergeben"]);
  exit;
}

try {
  $hash = password_hash($data['passwort'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO users (vorname, nachname, email, benutzername, passwort) VALUES (?, ?, ?, ?, ?)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    $data['vorname'],
    $data['nachname'],
    $data['email'],
    $data['benutzername'],
    $hash
  ]);

  echo json_encode(["success" => true, "message" => "Registrierung erfolgreich"]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}
?>
