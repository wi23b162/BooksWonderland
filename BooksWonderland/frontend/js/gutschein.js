$('#voucher-form').on('submit', function(e) {
      // Erfolgreich -> weiter zur Zahlung
      window.location.href = 'payment.html';

  e.preventDefault();
  const code = $('#code').val().trim();

  $.ajax({
    url: '../backend/logic/checkVoucher.php',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ code }),
    success: function(response) {
      const alertBox = $('#result');
      alertBox.removeClass('d-none alert-success alert-danger');
      if (response.success) {
        alertBox.addClass('alert-success');
        alertBox.html(`${response.message} – Rabatt: ${response.amount} ${response.type === 'percent' ? '%' : '€'}`);
        localStorage.setItem('voucher', JSON.stringify(response));
      } else {
        alertBox.addClass('alert-danger');
        alertBox.text(`${response.message}`);
        localStorage.removeItem('voucher');
      }
    },
    error: function(xhr) {
      $('#result').removeClass('d-none').addClass('alert-danger').text("Serverfehler beim Einlösen.");
    }
  });
});
