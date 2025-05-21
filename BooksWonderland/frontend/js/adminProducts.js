// admin-products.js – nur für Produktverwaltung

$(document).ready(function () {
  console.log("✅ adminProducts.js geladen");

  // Produkte laden
  function loadProducts() {
    $.get("../backend/logic/getProducts.php", function (data) {
      const tableBody = $("#admin-product-table tbody");
      tableBody.empty();
      data.forEach((prod) => {
        tableBody.append(`
          <tr>
            <td>${prod.id}</td>
            <td>${prod.title}</td>
            <td>${parseFloat(prod.price).toFixed(2)} €</td>
            <td>${prod.author}</td>
            <td>
              <button class="btn btn-sm btn-warning edit-product" data-id="${prod.id}" data-title="${prod.title}" data-author="${prod.author}" data-description="${prod.description}" data-price="${prod.price}" data-image="${prod.image}" data-rating="${prod.rating || 0}">Bearbeiten</button>
              <button class="btn btn-sm btn-danger delete-product" data-id="${prod.id}">Löschen</button>
            </td>
          </tr>
        `);
      });
    });
  }

  loadProducts();

  // Produkt speichern oder aktualisieren
  $("#add-product-form").on("submit", function (e) {
    e.preventDefault();

    const editing = $(this).data("editing") === true;
    const productId = $(this).data("product-id");

    const productData = {
      title: $("#product-title").val().trim(),
      author: $("#product-author").val().trim(),
      description: $("#product-description").val().trim(),
      price: parseFloat($("#product-price").val()),
      image: $("#product-image").val().trim(),
      rating: parseFloat($("#product-rating").val())
    };

    if (editing) productData.id = productId;

    $.ajax({
      url: editing ? '../backend/logic/updateProduct.php' : '../backend/logic/addProduct.php',
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(productData),
      success: function (res) {
        const feedback = $("#product-feedback");
        feedback.removeClass("text-danger text-success");

        if (res.success) {
          feedback.addClass("text-success").text(editing ? "✅ Produkt aktualisiert." : "✅ Produkt hinzugefügt.");
          $("#add-product-form")[0].reset();
          $("#add-product-form").data("editing", false).removeData("product-id");
          $("#add-product-form button[type='submit']").text("Produkt speichern");
          loadProducts();
        } else {
          feedback.addClass("text-danger").text("❌ Fehler: " + res.message);
        }
      },
      error: function () {
        $("#product-feedback").addClass("text-danger").text("❌ Serverfehler beim Speichern.");
      }
    });
  });

  // Produkt bearbeiten
  $("#admin-product-table").on("click", ".edit-product", function () {
    $("#product-title").val($(this).data("title"));
    $("#product-author").val($(this).data("author"));
    $("#product-description").val($(this).data("description"));
    $("#product-price").val($(this).data("price"));
    $("#product-image").val($(this).data("image"));
    $("#product-rating").val($(this).data("rating"));
    $("#add-product-form").data("editing", true).data("product-id", $(this).data("id"));
    $("#add-product-form button[type='submit']").text("Produkt aktualisieren");
  });

  // Produkt löschen
  $("#admin-product-table").on("click", ".delete-product", function () {
    const productId = $(this).data("id");
    if (confirm("Möchtest du dieses Produkt wirklich löschen?")) {
      $.ajax({
        url: '../backend/logic/deleteProduct.php',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ id: productId }),
        success: function (res) {
          if (res.success) {
            alert("✅ Produkt gelöscht");
            loadProducts();
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
