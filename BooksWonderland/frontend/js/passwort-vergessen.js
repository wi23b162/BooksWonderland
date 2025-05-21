$(document).ready(function () {
  $('#resetForm').on('submit', function (e) {
    e.preventDefault();
    const email = $('#email').val();

    $.ajax({
      url: '../backend/logic/passwortReset.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email }),
      success: function (response) {
        const fb = $('#feedback');
        fb.removeClass('d-none alert-success alert-danger');
        if (response.success) {
          fb.addClass('alert-success').text(response.message);
        } else {
          fb.addClass('alert-danger').text(response.message);
        }
      },
      error: function () {
        $('#feedback')
          .removeClass('d-none alert-success')
          .addClass('alert alert-danger')
          .text('Serverfehler beim Zurücksetzen.');
      }
    });
  });
});
