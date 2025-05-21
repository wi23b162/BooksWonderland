$(document).ready(function () {
  console.log("✅ menuHandler geladen");

  $.get('../backend/logic/sessionStatus.php', function (user) {
    console.log("sessionStatus Antwort:", user);

    let html = `
      <nav class="navbar navbar-expand-lg sticky-top" style="background-color: #007E87;">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html">
            <img src="images/logo.png" alt="Books Wonderland Logo" style="height: 50px;">
          </a>
feature/addi-Sprint-4-Admin
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item"><a class="nav-link text-white font-weight-bold" href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link text-white font-weight-bold" href="products.html">Produkte</a></li>
              <li class="nav-item"><a class="nav-link text-white font-weight-bold" href="cart.html">Warenkorb</a></li>
    `;

    if (user.loggedIn) {
      html += `
        <li class="nav-item dropdown">
    feature/addi-Sprint-4-Admin
          <a class="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="userDropdown" role="button"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Hallo, ${user.name}
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
            <a class="dropdown-item" href="invoicelist.html">Letzte Rechnung</a>
            <a class="dropdown-item" href="show_payment.html">Zahlungsmethode</a>
            <a class="dropdown-item" href="profil.html">Kontodaten verwalten</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item text-danger" href="#" id="logout-link">Logout</a>

          </div>
        </li>
      `;

      if (user.isAdmin) {

        html += `
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="adminDropdown" role="button"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Adminbereich
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="adminDropdown">
              <a class="dropdown-item" href="adminProducts.html#produkte">Produkte</a>
              <a class="dropdown-item" href="adminUsers.html#benutzer">Benutzer</a>
              <a class="dropdown-item" href="adminOrders.html#bestellungen">Bestellungen</a>
              <a class="dropdown-item" href="adminCoupons.html#gutscheine">Gutscheine</a>
            </div>
          </li>
        `;

      }
    } else {
      html += `
        <li class="nav-item"><a class="nav-link text-white font-weight-bold" href="register.html">Registrieren</a></li>
        <li class="nav-item"><a class="nav-link text-white font-weight-bold" href="login.html">Login</a></li>
      `;
    }

    html += `
            </ul>
          </div>
        </div>
      </nav>
    `;

    $('#nav').html(html);

    // Logout-Handler
    $('#logout-link').on('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('cart');
      $.get('../backend/logic/logout.php', function (response) {
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
