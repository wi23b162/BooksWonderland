$(document).ready(function () {
  $.get('../backend/logic/getOrders.php', function (orders) {
    const tbody = $('#orders-body');
    const noOrders = $('#no-orders');

    if (!orders || orders.length === 0) {
      noOrders.removeClass('d-none');
      return;
    }

    orders.forEach(order => {
      const row = `
        <tr>
          <td>${order.order_number}</td>
          <td>${new Date(order.date).toLocaleDateString('de-DE')}</td>
          <td>${parseFloat(order.total).toFixed(2)} €</td>
          <td>${order.status}</td>
        </tr>
      `;
      tbody.append(row);
    });
  }).fail(function () {
    $('#orders-table-container').html('<div class="alert alert-danger">Fehler beim Laden der Bestellungen.</div>');
  });
});
