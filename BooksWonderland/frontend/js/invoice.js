$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  const debug = params.get("debug") === "true";

  const $invoiceContent = $('#invoice-content');

  function showError(message, debugInfo = null) {
    let html = `<div class="alert alert-danger"><strong>Fehler:</strong> ${message}</div>`;
    if (debug && debugInfo) {
      html += `<pre class="bg-light p-2 mt-3 border">${JSON.stringify(debugInfo, null, 2)}</pre>`;
    }
    $invoiceContent.html(html);
  }

  if (!orderId) {
    showError("Keine Bestellnummer angegeben.");
    return;
  }

  $.getJSON(`../backend/logic/getInvoice.php?orderId=${orderId}`, function (data) {
    if (!data.success) {
      showError(data.message || "Fehler beim Laden der Rechnung.", data);
      return;
    }

    const order = data.order;
    let html = `<div class="border p-4">
      <h3>Rechnung Nr. ${order.id}</h3>
      <p><strong>Datum:</strong> ${new Date(order.created_at).toLocaleDateString('de-DE')}</p>
      <p><strong>Kunde:</strong> ${order.customer_name}</p>
      <p><strong>Adresse:</strong><br>${order.address.replaceAll('\n', '<br>')}</p>

      <table class="table mt-4">
        <thead><tr><th>Produkt</th><th>Menge</th><th>Einzelpreis</th><th>Gesamt</th></tr></thead>
        <tbody>`;

    order.items.forEach(item => {
      html += `<tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>${parseFloat(item.price).toFixed(2)} €</td>
        <td>${(item.quantity * item.price).toFixed(2)} €</td>
      </tr>`;
    });

    html += `</tbody></table>`;

    if (order.voucher) {
      html += `<p><strong>Gutschein:</strong> -${parseFloat(order.voucher.amount).toFixed(2)} €</p>`;
    }

    html += `<p><strong>Versand:</strong> ${parseFloat(order.shipping).toFixed(2)} €</p>
             <p><strong>Gesamtbetrag:</strong> ${parseFloat(order.total).toFixed(2)} €</p>`;

    html += '</div>';

    if (debug) {
      html += `<pre class="bg-light p-2 mt-3 border">Antwort vom Server:\n${JSON.stringify(data, null, 2)}</pre>`;
    }

    $invoiceContent.html(html);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    showError("Serverfehler beim Laden der Rechnung.", {
      status: textStatus,
      error: errorThrown,
      response: jqXHR.responseText
    });
  });
});
