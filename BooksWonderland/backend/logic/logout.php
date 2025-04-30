// backend/logic/logout.php
<?php
session_start();
session_unset();
session_destroy();

if (isset($_COOKIE['user_id'])) {
  setcookie("user_id", "", time() - 3600, "/", "", true, true);  
}

header('Content-Type: application/json');
echo json_encode(["success" => true, "message" => "Logout erfolgreich"]);
?>
?>