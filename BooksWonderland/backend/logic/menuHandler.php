<?php
session_start();
header("Content-Type: text/html");
// Backend liefert immernur json dateien zurück.
if (isset($_SESSION['user'])) {
    $user = $_SESSION['user'];
    $vorname = htmlspecialchars($user['vorname']);

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

// Wenn der User einloggt, user json gibt, localstorage. 
// Der Klient macht mit Java Script ein Request ajax Request zum Server um Login der server antwort mit dem Status Code und einem User Json.
// in diesem user Json steht, ob admin,gast usw.
// localstorage: unterschiedliche Menüs anzeigen.