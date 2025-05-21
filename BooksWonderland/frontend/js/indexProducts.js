$(document).ready(function () {
  $.getJSON('../backend/logic/getProducts.php', function (products) {
    // Neueste 3 Produkte (optional: sortieren nach ID)
    const latest = products.slice(-3).reverse();
    const container = $('#latest-products');
    container.empty();

    latest.forEach(product => {
      const card = `
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text"><strong>Autor:</strong> ${product.author}</p>
              <p class="card-text"><strong>Preis:</strong> ${parseFloat(product.price).toFixed(2)} €</p>
              <p class="card-text">Bewertung: ⭐️ ${product.rating}</p>
              <a href="products.html" class="btn btn-sm btn-primary">Alle Produkte</a>
            </div>
          </div>
        </div>
      `;
      container.append(card);
    });
  });
});
