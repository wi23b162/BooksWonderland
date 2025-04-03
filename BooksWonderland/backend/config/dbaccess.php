<?php
$pdo = new PDO("mysql:host=localhost;port=8889;dbname=bookswonderland;charset=utf8mb4", "root", "root");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
