$(document).ready(function () {
  $.get('../backend/logic/sessionStatus.php', function (user) {
    let html = '<nav class="navbar navbar-expand-lg sticky-top" style="background-color: #007E87;">';
    html += '<div class="container-fluid">';

    // Logo
    html += '<a class="navbar-brand" href="index.html">';
    html += '<img src="images/logo.png" alt="Books Wonderland Logo" style="height: 50px;">';
    html += '</a>';

    // Hamburger Menü-Button
    html += '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"';
    html += ' aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">';
    html += '<span class="navbar-toggler-icon"></span>';
    html += '</button>';

    // Navigationslinks
    html += '<div class="collapse navbar-collapse" id="navbarNav">';
    html += '<ul class="navbar-nav ml-auto">';

    html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="index.html">Home</a></li>';
    html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="cart.html">Warenkorb</a></li>';

    if (user.loggedIn) {
      html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="#">Hallo, ' + user.name + '</a></li>';
      html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="#" id="logout-link">Logout</a></li>';
      if (user.isAdmin) {
        html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="admin.html">Adminbereich</a></li>';
      }
    } else {
      html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="register.html">Registrieren</a></li>';
      html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="login.html">Login</a></li>';
    }

    html += '</ul></div></div></nav>';

    $('#nav').html(html);

    // Logout-Handler
    $('#logout-link').on('click', function (e) {
      e.preventDefault();
      $.get('../backend/logic/logout.php', function (response) {
        if (response.success) {
          alert(response.message);
          window.location.href = 'login.html';
        }
      });
    });
  }).fail(function () {
    console.error("Fehler beim Laden von sessionStatus.php");
  });
});
