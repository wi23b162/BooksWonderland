<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

// Nur POST erlaubt
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Nur POST erlaubt.']);
  exit;
}

// User muss eingeloggt sein
if (!isset($_SESSION['user']['id'])) {
  echo json_encode(['success' => false, 'message' => 'Nicht eingeloggt.']);
  exit;
}

// Eingabedaten einlesen
$input = json_decode(file_get_contents('php://input'), true);
$oldPassword = $input['oldPassword'] ?? '';
$newPassword = $input['newPassword'] ?? '';

if (!$oldPassword || !$newPassword) {
  echo json_encode(['success' => false, 'message' => 'Bitte alle Felder ausfüllen.']);
  exit;
}

$userId = $_SESSION['user']['id'];


// Passwort aus DB holen
$stmt = $pdo->prepare("SELECT passwort FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch();

if (!$user || !password_verify($oldPassword, $user['passwort'])) {
  echo json_encode(['success' => false, 'message' => 'Falsches aktuelles Passwort.']);
  exit;
}

// Neues Passwort speichern
$newHash = password_hash($newPassword, PASSWORD_DEFAULT);
$update = $pdo->prepare("UPDATE users SET passwort = ? WHERE id = ?");
$update->execute([$newHash, $userId]);

echo json_encode(['success' => true]);
