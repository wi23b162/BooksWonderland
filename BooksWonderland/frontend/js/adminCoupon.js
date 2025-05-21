// adminCoupons.js – Gutscheine verwalten

$(document).ready(function () {
  console.log("✅ adminCoupons.js geladen");

  function loadVouchers() {
    $.get("../backend/logic/getVouchers.php", function (vouchers) {
      const tbody = $("#voucher-table tbody");
      tbody.empty();

      vouchers.forEach(v => {
        tbody.append(`
          <tr>
            <td>${v.code}</td>
            <td>${v.percent} %</td>
            <td>${v.valid_until}</td>
            <td>
              <button class="btn btn-sm btn-danger delete-voucher" data-code="${v.code}">Löschen</button>
            </td>
          </tr>
        `);
      });
    });
  }

  loadVouchers();

  // Gutschein hinzufügen
  $("#add-voucher-form").on("submit", function (e) {
    e.preventDefault();
    const voucher = {
      code: $("#voucher-code").val().trim(),
      percent: parseFloat($("#voucher-percent").val()),
      valid_until: $("#voucher-valid-until").val()
    };

    $.ajax({
      url: "../backend/logic/addVoucher.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(voucher),
      success: function (res) {
        if (res.success) {
          loadVouchers();
          $("#add-voucher-form")[0].reset();
        } else {
          alert("❌ Fehler: " + res.message);
        }
      },
      error: function () {
        alert("❌ Serverfehler beim Hinzufügen");
      }
    });
  });

  // Gutschein löschen
  $("#voucher-table").on("click", ".delete-voucher", function () {
    const code = $(this).data("code");

    if (confirm("Gutschein wirklich löschen?")) {
      $.ajax({
        url: "../backend/logic/deleteVoucher.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ code }),
        success: function (res) {
          if (res.success) {
            loadVouchers();
          } else {
            alert("❌ Fehler: " + res.message);
          }
        },
        error: function () {
          alert("❌ Serverfehler beim Löschen");
        }
      });
    }
  });
});
