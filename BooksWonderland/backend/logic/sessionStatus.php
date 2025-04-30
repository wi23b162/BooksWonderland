<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
    echo json_encode([
        'loggedIn' => true,
        'name' => $_SESSION['user']['vorname'] ?? 'Benutzer',
        'isAdmin' => $_SESSION['user']['is_admin'] ?? false
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>