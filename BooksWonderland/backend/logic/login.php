// backend/logic/login.php
<?php
require_once '../config/dbaccess.php';
session_start();
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

function checkUserExists($pdo, $field, $value) {
  $sql = "SELECT * FROM users WHERE $field = ?";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$value]);
  return $stmt->fetch();
}

$user = checkUserExists($pdo, 'benutzername', $data['login']) ?? checkUserExists($pdo, 'email', $data['login']);

if (!$user) {
  echo json_encode(["success" => false, "message" => "Benutzername oder E-Mail nicht gefunden"]);
  exit;
}

if (!password_verify($data['passwort'], $user['passwort'])) {
  echo json_encode(["success" => false, "message" => "Falsches Passwort"]);
  exit;
}

$_SESSION['user'] = $user;

if (!empty($data['remember'])) {
  setcookie("user_id", $user['id'], time() + (86400 * 30), "/");
}

echo json_encode(["success" => true, "message" => "Login erfolgreich"]);
?>
