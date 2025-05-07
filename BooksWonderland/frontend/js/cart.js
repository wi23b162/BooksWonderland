$(document).ready(function () {
    // Warenkorb aus localStorage abrufen
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Warenkorb anzeigen
    function updateCart() {
        const cartList = $('#cart-list');
        cartList.empty();

        if (cart.length === 0) {
            cartList.append('<li class="list-group-item">Ihr Warenkorb ist leer.</li>');
        } else {
            cart.forEach(function (item) {
                cartList.append(
                    `<li class="list-group-item">${item.product.title} - ${item.quantity} Stück</li>`
                );
            });
        }
    }

    updateCart();  // Warenkorb beim Laden der Seite anzeigen

    // Leeren des Warenkorbs
    $('#clear-cart').click(function () {
        localStorage.removeItem('cart');  // Warenkorb aus localStorage entfernen
        cart = [];  // Leeren des Warenkorb-Arrays
        updateCart();  // Warenkorb aktualisieren
    });
});
