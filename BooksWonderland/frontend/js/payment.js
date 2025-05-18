$('#payment-form').on('submit', function(e) {
        // Nach erfolgreicher Speicherung
        window.location.href = 'checkout.html';

  e.preventDefault();
  const selected = $('input[name="payment"]:checked').val();

  $.ajax({
    url: '../backend/logic/savePaymentMethod.php',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ method: selected }),
    success: function(response) {
      if (response.success) {
        $('#confirmation').removeClass('d-none');
      } else {
        alert("❌ Fehler: " + response.message);
      }
      console.log("💾 Serverantwort:", response);
    },
    error: function(xhr) {
      alert("❌ Serverfehler");
      console.error(xhr.responseText);
    }
  });
});
