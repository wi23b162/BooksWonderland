<?php
require_once '../config/dbaccess.php';
require_once '../models/user.class.php';

header('Content-Type: application/json');

try {
  $users = User::all($pdo);
  echo json_encode(['users' => $users]);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
