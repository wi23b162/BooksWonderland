<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

// Zugriffsschutz
if (!isset($_SESSION['user'])) {
  echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$userId = $_SESSION['user']['id'];

// Alle erlaubten Felder
$felder = ['anrede', 'vorname', 'nachname', 'email', 'adresse', 'adresszusatz', 'stadt', 'plz', 'bundesland'];

$sqlParts = [];
$params = [];

foreach ($felder as $feld) {
  if (isset($data[$feld])) {
    $sqlParts[] = "$feld = ?";
    $params[] = trim($data[$feld]);
  }
}

if (empty($sqlParts)) {
  echo json_encode(["success" => false, "message" => "Keine Änderungen erkannt"]);
  exit;
}

$params[] = $userId;
$sql = "UPDATE users SET " . implode(', ', $sqlParts) . " WHERE id = ?";

try {
  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);
  echo json_encode(["success" => true, "message" => "Profil erfolgreich aktualisiert"]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Fehler: " . $e->getMessage()]);
}
?>
