$(document).ready(function () {
  console.log("✅ menuHandler geladen");

  $.get('../backend/logic/sessionStatus.php', function (user) {
    console.log("👤 sessionStatus Antwort:", user);

    let html = '<nav class="navbar navbar-expand-lg sticky-top" style="background-color: #007E87;">';
    html += '<div class="container-fluid">';

    html += '<a class="navbar-brand" href="index.html">';
    html += '<img src="images/logo.png" alt="Books Wonderland Logo" style="height: 50px;">';
    html += '</a>';

    html += '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"';
    html += ' aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">';
    html += '<span class="navbar-toggler-icon"></span>';
    html += '</button>';

    html += '<div class="collapse navbar-collapse" id="navbarNav">';
    html += '<ul class="navbar-nav ml-auto">';

    html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="index.html">Home</a></li>';
    html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="products.html">Produkte</a></li>';
    html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="cart.html">Warenkorb</a></li>';

    if (user.loggedIn) {
      html += '<li class="nav-item dropdown">';
      html += '<a class="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
      html += 'Hallo, ' + user.name + '</a>';
      html += '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">';
      html += '<a class="dropdown-item" href="invoicelist.html">📄 Letzte Rechnung</a>';
      html += '<a class="dropdown-item" href="payment.html">💳 Zahlungsmethode</a>';
      html += '<a class="dropdown-item" href="profil.html">⚙️ Kontodaten verwalten</a>';
      html += '<div class="dropdown-divider"></div>';
      html += '<a class="dropdown-item text-danger" href="#" id="logout-link">🚪 Logout</a>';
      html += '</div></li>';

      if (user.isAdmin) {
        html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="admin.html">Adminbereich</a></li>';
      }
    } else {
      html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="register.html">Registrieren</a></li>';
      html += '<li class="nav-item"><a class="nav-link text-white font-weight-bold" href="login.html">Login</a></li>';
    }

    html += '</ul></div></div></nav>';

    $('#nav').html(html);

    $('#logout-link').on('click', function (e) {
      e.preventDefault();

      console.log("🚪 Logout-Link geklickt");
      console.log("🧹 Warenkorb vorher:", localStorage.getItem('cart'));
      localStorage.removeItem('cart');
      console.log("🧹 Warenkorb nachher:", localStorage.getItem('cart'));

      $.get('../backend/logic/logout.php', function (response) {
        console.log("📤 Antwort von logout.php:", response);
        if (response.success) {
          alert(response.message);
          window.location.href = 'login.html';
        }
      });
    });
  }).fail(function () {
    console.error("❌ Fehler beim Laden von sessionStatus.php");
  });
});
