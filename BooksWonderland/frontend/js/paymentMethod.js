$(document).ready(function () {
  // Methode laden
  $.get('../backend/logic/getPaymentMethod.php', function (response) {
    if (response.success) {
      $('#method').val(response.method);
    }
  });

  // Methode speichern
  $('#payment-method-form').on('submit', function (e) {
    e.preventDefault();
    const method = $('#method').val();

    $.ajax({
      url: '../backend/logic/savePaymentMethod.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ method }),
      success: function (response) {
        const fb = $('#payment-feedback');
        fb.removeClass('d-none alert-success alert-danger');
        if (response.success) {
          fb.addClass('alert-success').text('Zahlungsmethode gespeichert');
        } else {
          fb.addClass('alert-danger').text('Fehler: ' + response.message);
        }
      },
      error: function () {
        $('#payment-feedback').removeClass('d-none').addClass('alert alert-danger').text('Serverfehler beim Speichern.');
      }
    });
  });
});
