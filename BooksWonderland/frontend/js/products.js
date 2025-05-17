$(document).ready(function () {
  let allProducts = [];

  $.getJSON("../backend/logic/getProducts.php", function (data) {
    allProducts = data;
    renderProducts(allProducts);
  });

  function renderProducts(products) {
    const productList = $('#product-list');
    productList.empty();

    products.forEach(product => {
      const shortDescription = product.description.length > 100
        ? product.description.substring(0, 100) + '…'
        : product.description;

      const formattedPrice = parseFloat(product.price).toFixed(2);

      const cardHtml = `
        <div class="col-md-4 mb-3">
          <div class="card h-100" draggable="true" data-id="${product.id}">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">Autor: ${product.author}</p>
              <p class="card-text">${shortDescription}</p>
              <p class="card-text"><strong>Preis: ${formattedPrice} €</strong></p>
              <p class="card-text">Bewertung: ⭐️ ${product.rating}</p>
              <button class="btn btn-primary add-to-cart" data-id="${product.id}">Zum Warenkorb hinzufügen</button>
              <button class="btn btn-outline-info show-details" data-id="${product.id}">Details</button>
            </div>
          </div>
        </div>`;
      productList.append(cardHtml);
    });
  }

  // Live-Suche
  $('#search-input').on('input', function () {
    const query = $(this).val().toLowerCase();
    const filtered = allProducts.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.author.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  });

  // Drag-Start
  $('#product-list').on('dragstart', '.card', function (e) {
    e.originalEvent.dataTransfer.setData("text/plain", $(this).data('id'));
  });

  // Drop-Zone
  const dropZone = $('#drop-zone');

  dropZone.on('dragover', function (e) {
    e.preventDefault();
    $(this).addClass('drag-over');
  });

  dropZone.on('dragleave', function () {
    $(this).removeClass('drag-over');
  });

  dropZone.on('drop', function (e) {
    e.preventDefault();
    $(this).removeClass('drag-over');
    const productId = e.originalEvent.dataTransfer.getData("text/plain");
    const product = allProducts.find(p => p.id == productId);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.product.id == productId);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} wurde dem Warenkorb per Drag & Drop hinzugefügt.`);
  });

  // Add to cart via Button
  $('#product-list').on('click', '.add-to-cart', function () {
    const productId = $(this).data('id');
    const product = allProducts.find(p => p.id == productId);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.product.id == productId);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} wurde zum Warenkorb hinzugefügt.`);
  });

  // Modal: Details anzeigen
  let lastFocusedButton = null;

  $('#product-list').on('click', '.show-details', function () {
    lastFocusedButton = this;
    const productId = $(this).data('id');

    $.getJSON(`../backend/logic/getProductById.php?id=${productId}`, function (product) {
      if (product.error) {
        $('#modal-body-content').html('<p class="text-danger">Produkt nicht gefunden.</p>');
      } else {
        $('#modal-body-content').html(`
          <div class="row">
            <div class="col-md-6">
              <img src="${product.image}" alt="${product.title}" class="img-fluid">
            </div>
            <div class="col-md-6">
              <h4>${product.title}</h4>
              <p><strong>Autor:</strong> ${product.author}</p>
              <p>${product.description}</p>
              <p><strong>Preis:</strong> ${parseFloat(product.price).toFixed(2)} €</p>
              <p><strong>Bewertung:</strong> ⭐️ ${product.rating}</p>
            </div>
          </div>
        `);
      }
      $('#productModal').modal('show');
    });
  });

  $('#productModal').on('hidden.bs.modal', function () {
    if (lastFocusedButton) {
      lastFocusedButton.focus();
    }
  });
});
