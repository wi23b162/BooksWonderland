<?php
session_start();
session_unset();
session_destroy();

if (isset($_COOKIE['user_id'])) {
  setcookie("user_id", "", time() - 3600, "/", "", true, true);
}

header('Content-Type: application/json');

// Debug-Ausgabe zur Prüfung
$response = [
  "success" => true,
  "message" => "Logout erfolgreich",
  "session_destroyed" => true,
  "cookie_deleted" => !isset($_COOKIE['user_id']),
  "client_note" => "Bitte sicherstellen, dass localStorage manuell im Frontend gelöscht wird."
];

echo json_encode($response);
?>
