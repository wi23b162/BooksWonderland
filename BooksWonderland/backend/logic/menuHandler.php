<?php
session_start();
header("Content-Type: text/html");

if (isset($_SESSION['user'])) {
    $user = $_SESSION['user'];
    $vorname = htmlspecialchars($user['vorname']); // für Sicherheit

    echo "<p>Hallo, $vorname!</p>";
    echo '<nav>';
    echo '<a href="index.html">Home</a>';
    echo '<a href="logout.php">Logout</a>';

    if (!empty($user['is_admin']) && $user['is_admin']) {
        echo '<a href="admin.html">Adminbereich</a>';
    }

    echo '</nav>';
} else {
    echo '<nav>';
    echo '<a href="index.html">Home</a>';
    echo '<a href="register.html">Registrieren</a>';
    echo '<a href="login.html">Login</a>';
    echo '</nav>';
}
?>
