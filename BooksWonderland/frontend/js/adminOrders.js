// admin-orders.js – Bestellungen laden und anzeigen

$(document).ready(function () {
  console.log("adminOrders.js geladen");

  function loadOrders() {
  $.get("../backend/logic/getOrders.php", function (res) {
    const table = $("#admin-orders-table tbody");
    table.empty();

    if (res.success && Array.isArray(res.orders)) {
      res.orders.forEach(order => {
        table.append(`
          <tr>
            <td>${order.id}</td>
            <td>${order.user_name || 'N/A'}</td>
            <td>${order.created_at}</td>
            <td>${parseFloat(order.total).toFixed(2)} €</td>
            <td>${order.status}</td>
            <td><button class="btn btn-sm btn-info view-order" data-id="${order.id}">Anzeigen</button></td>
          </tr>
        `);
      });
    } else {
      table.append('<tr><td colspan="6" class="text-center text-danger">Keine Bestellungen gefunden.</td></tr>');
    }
  });
}


  loadOrders();

  // Einzelne Bestellung anzeigen (optional mit Modal)
  $("#admin-orders-table").on("click", ".view-order", function () {
    const orderId = $(this).data("id");

    $.get(`../backend/logic/getOrderById.php?id=${orderId}`, function (orderDetails) {
      let html = `<p><strong>Bestell-ID:</strong> ${orderDetails.id}</p>`;
      html += `<p><strong>Benutzer:</strong> ${orderDetails.user_name}</p>`;
      html += `<p><strong>Datum:</strong> ${orderDetails.created_at}</p>`;
      html += `<p><strong>Status:</strong> ${orderDetails.status}</p>`;

      html += '<h5>Produkte:</h5><ul>';
      orderDetails.items.forEach(item => {
        html += `<li>${item.title} (x${item.quantity}) – ${parseFloat(item.price).toFixed(2)} €</li>`;
      });
      html += '</ul>';

      html += `<p><strong>Gesamtbetrag:</strong> ${parseFloat(orderDetails.total).toFixed(2)} €</p>`;

      $("#order-details-body").html(html);
      $("#orderDetailModal").modal("show");
    });
  });
});
