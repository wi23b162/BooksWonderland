$.get('backend/logic/sessionStatus.php', function(response) {
  if (response.loggedIn) {
    $('#account-link').html('<a class="nav-link" href="profile.html">Hallo, ' + response.name + '</a>');
    $('#login-link').html('<a class="nav-link" href="backend/logic/logout.php">Logout</a>');
  }
});
