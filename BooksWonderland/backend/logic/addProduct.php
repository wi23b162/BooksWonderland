<?php
session_start();
require_once '../config/dbaccess.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Nur POST erlaubt.']);
  exit;
}

if (!isset($_SESSION['user']) || $_SESSION['user']['is_admin'] != 1) {
  http_response_code(403);
  echo json_encode(['success' => false, 'message' => 'Nicht autorisiert.']);
  exit;
}

// Bild speichern
$imagePath = null;
$uploadDir = "../../frontend/images/products/";

if (!file_exists($uploadDir)) {
  mkdir($uploadDir, 0777, true);
}

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
  $fileTmp = $_FILES['image']['tmp_name'];
  $fileName = uniqid() . '_' . basename($_FILES['image']['name']);
  $targetPath = $uploadDir . $fileName;

  if (move_uploaded_file($fileTmp, $targetPath)) {
    $imagePath = 'images/products/' . $fileName;
  } else {
    echo json_encode(['success' => false, 'message' => 'Bild-Upload fehlgeschlagen.']);
    exit;
  }
} else {
  echo json_encode(['success' => false, 'message' => 'Kein Bild übergeben.']);
  exit;
}

// Felder lesen
$title = $_POST['title'] ?? '';
$author = $_POST['author'] ?? '';
$description = $_POST['description'] ?? '';
$price = $_POST['price'] ?? '';
$rating = $_POST['rating'] ?? 0;

if (empty($title) || empty($author) || empty($description) || empty($price) || !$imagePath) {
  echo json_encode(['success' => false, 'message' => 'Unvollständige Daten.']);
  exit;
}

try {
  $stmt = $pdo->prepare("INSERT INTO products (title, author, description, price, image, rating) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->execute([$title, $author, $description, $price, $imagePath, $rating]);

  echo json_encode(['success' => true]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => 'Fehler beim Einfügen: ' . $e->getMessage()]);
}
?>
