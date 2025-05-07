$(document).ready(function () {
    // Überprüfen, ob der Warenkorb im LocalStorage gespeichert ist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Funktion, um den Warenkorb anzuzeigen
    function updateCart() {
        const cartList = $('#cart-list');
        cartList.empty(); // Warenkorb zuerst leeren

        if (cart.length === 0) {
            cartList.append('<li class="list-group-item">Ihr Warenkorb ist leer.</li>');
        } else {
            cart.forEach(function (item) {
                cartList.append(
                    `<li class="list-group-item">
                        ${item.product} - ${item.quantity} Stück
                    </li>`
                );
            });
        }
    }

    // Warenkorb anzeigen, wenn die Seite geladen wird
    updateCart();

    // Button zum Leeren des Warenkorbs
    $('#clear-cart').click(function () {
        localStorage.removeItem('cart'); // Warenkorb aus dem LocalStorage entfernen
        cart = []; // Warenkorb-Array zurücksetzen
        updateCart(); // Warenkorb aktualisieren
    });
});
