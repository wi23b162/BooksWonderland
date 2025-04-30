$(document).ready(function () {
    $.get('../header.html', function (html) {  
        $('#nav').html(html);  
    }).fail(function() {
        console.error("Fehler beim Laden des Headers.");
    });

    const userLoggedIn = document.cookie.includes('user_id');  
    if (userLoggedIn) {
        
        document.getElementById('account-link').innerHTML = '<a href="account.html">Mein Konto</a>';
        document.getElementById('login-link').innerHTML = '<a href="logout.php">Abmelden</a>';
    } else {
        
        document.getElementById('login-link').innerHTML = '<a href="login.html">Login</a>';
    }
});
