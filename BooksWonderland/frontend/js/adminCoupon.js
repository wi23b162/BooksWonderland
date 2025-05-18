$('#coupon-form').on('submit', function(e) {
  e.preventDefault();
  const code = $('#code').val().trim();
  const amount = parseFloat($('#amount').val());

  $.ajax({
    url: '../backend/logic/createCoupon.php',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ code, amount }),
    success: function(response) {
      if (response.success) {
        $('#coupon-success').removeClass('d-none');
        $('#coupon-form')[0].reset();
      } else {
        alert("❌ " + response.message);
      }
    },
    error: function() {
      alert("❌ Serverfehler");
    }
  });
});
