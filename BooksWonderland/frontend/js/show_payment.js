$(document).ready(function () {
  console.log("📄 show_payment.js geladen");

  $.get('../backend/logic/getPaymentMethod.php', function (response) {
    console.log("🔄 Zahlungsmethode:", response);

    if (response.success && response.method) {
      if (response.method !== "") {
        $('#method-name').text(response.method);
        $('#current-method').removeClass('d-none');
      } else {
        $('#no-method').removeClass('d-none');
      }
    } else {
      $('#error').removeClass('d-none');
    }
  }).fail(function () {
    $('#error').removeClass('d-none');
  });
});
