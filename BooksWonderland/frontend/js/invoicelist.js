$(document).ready(function () {
  $.getJSON('../backend/logic/getInvoices.php', function (response) {
    if (!response.success) {
      $('#invoice-table').html('<div class="alert alert-danger">Fehler beim Laden der Rechnungen.</div>');
      return;
    }

    const orders = response.orders;
    if (orders.length === 0) {
      $('#invoice-table').html('<p>Keine Rechnungen vorhanden.</p>');
      return;
    }

    let table = '<table class="table table-bordered"><thead><tr><th>Nr.</th><th>Datum</th><th>Gesamt</th><th>Status</th><th>Details</th></tr></thead><tbody>';
    orders.forEach(order => {
      table += `<tr>
        <td>${order.id}</td>
        <td>${new Date(order.created_at).toLocaleDateString('de-DE')}</td>
        <td>${parseFloat(order.total).toFixed(2)} €</td>
        <td>${order.status}</td>
        <td><a href="invoice.html?orderId=${order.id}" class="btn btn-sm btn-info">🧾 Anzeigen</a></td>
      </tr>`;
    });
    table += '</tbody></table>';
    $('#invoice-table').html(table);
  });
});
