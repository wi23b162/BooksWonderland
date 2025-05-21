$(document).ready(function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const summary = $('#checkout-summary');

  if (cart.length === 0) {
    summary.html('<div class="alert alert-warning">Ihr Warenkorb ist leer.</div>');
    $('#submit-order').hide();
    return;
  }

  let subtotal = 0;
  let table = '<table class="table"><thead><tr><th>Produkt</th><th>Menge</th><th>Preis</th></tr></thead><tbody>';
  cart.forEach(item => {
    subtotal += item.product.price * item.quantity;
    table += `<tr>
      <td>${item.product.title}</td>
      <td>${item.quantity}</td>
      <td>${(item.product.price * item.quantity).toFixed(2)} €</td>
    </tr>`;
  });
  table += '</tbody></table>';

  const versand = 3.90;
  const voucher = JSON.parse(localStorage.getItem('voucher'));
  let rabatt = 0;
  if (voucher) {
    rabatt = voucher.type === 'percent' ? subtotal * (voucher.amount / 100) : voucher.amount;
  }
  const gesamt = subtotal - rabatt + versand;

  table += `<p><strong>Zwischensumme:</strong> ${subtotal.toFixed(2)} €</p>`;
  if (voucher) {
    table += `<p><strong>Gutschein (${voucher.code}):</strong> -${rabatt.toFixed(2)} €</p>`;
  }
  table += `<p><strong>Versandkosten:</strong> ${versand.toFixed(2)} €</p>`;
  table += `<p class="font-weight-bold">Gesamtbetrag: ${gesamt.toFixed(2)} €</p>`;
  summary.html(table);

  $('#submit-order').on('click', function () {
    const items = cart.map(p => ({ id: p.product.id, quantity: p.quantity, price: p.product.price }));

    $.ajax({
      url: '../backend/logic/submitOrder.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ items }),
      success: function (response) {
        if (response.success) {
          localStorage.removeItem('cart');
          localStorage.removeItem('voucher');
          window.location.href = `invoice.html?orderId=${response.orderId}`;
        } else {
          $('#order-feedback')
            .removeClass('d-none alert-success')
            .addClass('alert alert-danger')
            .text('Fehler: ' + response.message);
        }
      },
      error: function () {
        $('#order-feedback')
          .removeClass('d-none alert-success')
          .addClass('alert alert-danger')
          .text('Serverfehler beim Abschicken der Bestellung.');
      }
    });
  });
});
