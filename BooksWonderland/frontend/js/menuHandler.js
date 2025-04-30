$(document).ready(function () {
  $.get('../backend/logic/sessionStatus.php', function(user) {
    let html = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">';
    html += '<div class="container-fluid">';
    html += '<a class="navbar-brand" href="index.html">Books Wonderland</a>';
    html += '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">';
    html += '<span class="navbar-toggler-icon"></span></button>';
    html += '<div class="collapse navbar-collapse" id="navbarNav">';
    html += '<ul class="navbar-nav ml-auto">';

    html += '<li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>';
    html += '<li class="nav-item"><a class="nav-link" href="cart.html">Warenkorb</a></li>';

    if (user.loggedIn) {
      html += '<li class="nav-item"><a class="nav-link" href="#">Hallo, ' + user.name + '</a></li>';
      html += '<li class="nav-item"><a class="nav-link" href="#" id="logout-link">Logout</a></li>';
      if (user.isAdmin) {
        html += '<li class="nav-item"><a class="nav-link" href="admin.html">Adminbereich</a></li>';
      }
    } else {
      html += '<li class="nav-item"><a class="nav-link" href="register.html">Registrieren</a></li>';
      html += '<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>';
    }

    html += '</ul></div></div></nav>';
    $('#nav').html(html);
  });

  // Logout-Handler
  $(document).on('click', '#logout-link', function (e) {
    e.preventDefault();
    $.get('../backend/logic/logout.php', function(response) {
      if (response.success) {
        alert(response.message);
        window.location.href = 'login.html';
      }
    });
  });
});