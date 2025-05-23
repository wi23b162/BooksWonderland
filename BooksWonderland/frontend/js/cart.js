$(document).ready(function () {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCart() {
    const cartList = $('#cart-list');
    cartList.empty();

    let subtotal = 0;

    if (cart.length === 0) {
      cartList.append('<li class="list-group-item">Ihr Warenkorb ist leer.</li>');
    } else {
      cart.forEach(item => {
        const price = parseFloat(item.product.price);
        const total = price * item.quantity;
        subtotal += total;

        cartList.append(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>${item.product.title}</strong><br>
              <small>
                <button class="btn btn-sm btn-outline-secondary decrease-qty" data-id="${item.product.id}">−</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary increase-qty" data-id="${item.product.id}">+</button>
                <button class="btn btn-sm btn-danger ml-3 remove-item" data-id="${item.product.id}">🗑</button>
              </small>
            </div>
            <strong>${total.toFixed(2)} €</strong>
          </li>
        `);
      });

      // Gutschein prüfen
      const coupon = JSON.parse(localStorage.getItem('voucher'));
      let discount = 0;
      if (coupon) {
        if (coupon.type === 'percent') {
          discount = subtotal * (coupon.amount / 100);
        } else {
          discount = coupon.amount;
        }
      }

      const versand = 3.90;
      const steuerSatz = 0.10;
      const steuerBetrag = (subtotal - discount) * steuerSatz;
      const gesamt = subtotal - discount + versand;

      cartList.append(`
        <li class="list-group-item d-flex justify-content-between">
          <span>Zwischensumme:</span>
          <strong>${subtotal.toFixed(2)} €</strong>
        </li>
      `);

      if (coupon) {
        cartList.append(`
          <li class="list-group-item d-flex justify-content-between text-success">
            <span>Gutschein (${coupon.amount}${coupon.type === 'percent' ? '%' : '€'}):</span>
            <strong>- ${discount.toFixed(2)} €</strong>
          </li>
        `);
      }

      cartList.append(`
        <li class="list-group-item d-flex justify-content-between">
          <span>Versandkosten:</span>
          <strong>${versand.toFixed(2)} €</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>inkl. 10% MwSt.:</span>
          <strong>${steuerBetrag.toFixed(2)} €</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between bg-light font-weight-bold">
          <span>Gesamtbetrag:</span>
          <strong>${gesamt.toFixed(2)} €</strong>
        </li>
      `);
    }
  }

  function saveAndUpdate() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }

  $('#cart-list').on('click', '.increase-qty', function () {
    const id = $(this).data('id');
    const item = cart.find(p => p.product.id == id);
    if (item) item.quantity++;
    saveAndUpdate();
  });

  $('#cart-list').on('click', '.decrease-qty', function () {
    const id = $(this).data('id');
    const item = cart.find(p => p.product.id == id);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      cart = cart.filter(p => p.product.id != id);
    }
    saveAndUpdate();
  });

  $('#cart-list').on('click', '.remove-item', function () {
    const id = $(this).data('id');
    cart = cart.filter(p => p.product.id != id);
    saveAndUpdate();
  });

  $('#clear-cart').on('click', function () {
    localStorage.removeItem('cart');
    cart = [];
    updateCart();
  });

  updateCart();
});

  $('#checkout').on('click', function () {
    const voucher = localStorage.getItem('voucher');
    window.location.href = voucher ? 'payment.html' : 'gutschein.html';
  });
