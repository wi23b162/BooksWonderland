<?php
session_start();
header('Content-Type: application/json');
require_once '../config/dbaccess.php';

$response = [
  'loggedIn' => false,
  'name' => '',
  'isAdmin' => false
];

// Prüfen: Session existiert nicht, aber Cookie ist gesetzt
if (!isset($_SESSION['user']) && isset($_COOKIE['user_id'])) {
  $userId = filter_var($_COOKIE['user_id'], FILTER_VALIDATE_INT); // Sicherheit
  if ($userId) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if ($user) {
      $_SESSION['user'] = [
        'id' => $user['id'],
        'vorname' => $user['vorname'],
        'is_admin' => $user['is_admin']
      ];
    }
  }
}

// Wenn Session jetzt vorhanden → Login-Daten zurückgeben
if (isset($_SESSION['user'])) {
  $response['loggedIn'] = true;
  $response['name'] = $_SESSION['user']['vorname'];
  $response['isAdmin'] = $_SESSION['user']['is_admin'];
}

echo json_encode($response);
?>
