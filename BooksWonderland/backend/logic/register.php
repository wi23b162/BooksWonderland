// backend/logic/register.php
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
