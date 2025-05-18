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
});
