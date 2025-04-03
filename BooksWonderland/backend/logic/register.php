// backend/logic/register.php
<?php
require_once '../config/dbaccess.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);

if ($data['passwort'] !== $data['passwort2']) {
  echo json_encode(["success" => false, "message" => "Passwörter stimmen nicht überein"]);
  exit;
}

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
?>