$(document).ready(function () {
  function loadVouchers() {
    $.get("../backend/logic/getVouchers.php", function (vouchers) {
      const tbody = $("#voucher-table tbody").empty();
      vouchers.forEach(v => {
        tbody.append(`<tr>
          <td>${v.code}</td>
          <td>${v.amount} ${v.type === 'percent' ? '%' : '€'}</td>
          <td>${v.valid_until}</td>
          <td><button class="btn btn-sm btn-danger delete-voucher" data-code="${v.code}">Löschen</button></td>
        </tr>`);
      });
    });
  }

  loadVouchers();

  $("#add-voucher-form").on("submit", function (e) {
    e.preventDefault();
    const voucher = {
      code: $("#voucher-code").val().trim(),
      amount: parseFloat($("#voucher-amount").val()),
      type: $("#voucher-type").val(),
      valid_until: $("#voucher-valid-until").val()
    };
    $.ajax({
      url: "../backend/logic/createCoupon.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(voucher),
      success: function (res) {
        if (res.success) {
          $("#add-voucher-form")[0].reset();
          loadVouchers();
        } else {
          alert("Fehler: " + res.message);
        }
      }
    });
  });

  $("#voucher-table").on("click", ".delete-voucher", function () {
    const code = $(this).data("code");
    if (confirm("Gutschein wirklich löschen?")) {
      $.ajax({
        url: "../backend/logic/deleteVoucher.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ code }),
        success: function (res) {
          if (res.success) loadVouchers();
          else alert("Fehler: " + res.message);
        }
      });
    }
  });
});