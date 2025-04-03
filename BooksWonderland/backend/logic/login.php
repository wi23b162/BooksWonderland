// backend/logic/login.php
<?php
require_once '../config/dbaccess.php';
session_start();
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);

$sql = "SELECT * FROM users WHERE benutzername = ? OR email = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$data['login'], $data['login']]);
$user = $stmt->fetch();

if ($user && password_verify($data['passwort'], $user['passwort'])) {
  $_SESSION['user'] = $user;
  if (!empty($data['remember'])) {
    setcookie("user_id", $user['id'], time() + (86400 * 30), "/");
  }
  echo json_encode(["success" => true, "message" => "Login erfolgreich"]);
} else {
  echo json_encode(["success" => false, "message" => "Login fehlgeschlagen"]);
}
?>
