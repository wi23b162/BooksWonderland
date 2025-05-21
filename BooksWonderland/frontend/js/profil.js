$(document).ready(function () {
  // Profildaten laden
  $.get('../backend/logic/getProfile.php', function (data) {
    if (data.success) {
      $('#anrede').val(data.user.anrede);
      $('#vorname').val(data.user.vorname);
      $('#nachname').val(data.user.nachname);
      $('#adresse').val(data.user.adresse);
      $('#adresszusatz').val(data.user.adresszusatz);
      $('#stadt').val(data.user.stadt);
      $('#bundesland').val(data.user.bundesland);
      $('#plz').val(data.user.plz);
    }
  });

  // Profil speichern
  $('#profilForm').on('submit', function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));

    $.ajax({
      url: '../backend/logic/updateProfile.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function (response) {
        const fb = $('#feedback');
        fb.removeClass('d-none alert-success alert-danger');
        if (response.success) {
          fb.addClass('alert-success').text('Profil aktualisiert');
        } else {
          fb.addClass('alert-danger').text('Fehler: ' + response.message);
        }
      },
      error: function () {
        $('#feedback').removeClass('d-none').addClass('alert alert-danger').text('Serverfehler beim Speichern.');
      }
    });
  });

  $('#password-change-form').on('submit', function (e) {
  e.preventDefault();

  const oldPassword = $('#old-password').val().trim();
  const newPassword = $('#new-password').val().trim();
  const confirmPassword = $('#confirm-password').val().trim();
  const msg = $('#password-msg').removeClass('text-danger text-success').text('');

  if (newPassword !== confirmPassword) {
    msg.text('❌ Neue Passwörter stimmen nicht überein.').addClass('text-danger');
    return;
  }

  $.ajax({
    url: '../backend/logic/changePassword.php',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      oldPassword,
      newPassword
    }),
    success: function (res) {
      if (res.success) {
        msg.text('✅ Passwort erfolgreich geändert.').addClass('text-success');
        $('#password-change-form')[0].reset();
      } else {
        msg.text('❌ ' + res.message).addClass('text-danger');
      }
    },
    error: function () {
      msg.text('❌ Fehler bei der Verbindung zum Server.').addClass('text-danger');
    }
  });
});

});
