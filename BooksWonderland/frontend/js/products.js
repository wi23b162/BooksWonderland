$(document).ready(function () {
    const products = [
        {
            id: 'book1',
            title: 'Harry Potter und der Stein der Weisen',
            author: 'J.K Rowling',
            price: '15.99 €',
            description: 'Ein spannendes Abenteuerbuch.',
            image: '../images/products/HarryPotter1.png',
            rating: 4.5
        },
        {
            id: 'book2',
            title: 'Mimik',
            author: 'Sebastian Fitzek',
            price: '12.99 €',
            description: 'Ein Roman über die Geheimnisse des Lebens.',
            image: '../images/products/Mimik.png',
            rating: 4.2
        },
        // Weitere Produkte hier hinzufügen...
    ];

    // Dynamische Erstellung der Produktkarten
    products.forEach(product => {
        // Erstelle das Produkt-Div (div mit Klasse 'col-md-4 mb-3')
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-4', 'mb-3');
        
        // Erstelle die Karte (div mit Klasse 'card')
        const card = document.createElement('div');
        card.classList.add('card');
        productDiv.appendChild(card);

        // Erstelle das Produktbild (img-Tag)
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = product.image;
        img.alt = product.title;
        card.appendChild(img);

        // Erstelle den Card Body (div mit Klasse 'card-body')
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        // Erstelle den Titel (h5-Tag)
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = product.title;
        cardBody.appendChild(title);

        // Erstelle den Autor (p-Tag)
        const author = document.createElement('p');
        author.classList.add('card-text');
        author.textContent = `Autor: ${product.author}`;
        cardBody.appendChild(author);

        // Erstelle die Beschreibung (p-Tag)
        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = product.description;
        cardBody.appendChild(description);

        // Erstelle den Preis (p-Tag)
        const price = document.createElement('p');
        price.classList.add('card-text');
        price.innerHTML = `<strong>Preis: ${product.price}</strong>`;
        cardBody.appendChild(price);

        // Erstelle die Bewertung (p-Tag)
        const rating = document.createElement('p');
        rating.classList.add('card-text');
        rating.textContent = `Bewertung: ⭐️ ${product.rating}`;
        cardBody.appendChild(rating);

        // Erstelle den "Zum Warenkorb hinzufügen"-Button (button-Tag)
        const addButton = document.createElement('button');
        addButton.classList.add('btn', 'btn-primary', 'add-to-cart');
        addButton.textContent = 'Zum Warenkorb hinzufügen';
        addButton.setAttribute('data-product', product.id); // Speichere die Produkt-ID im Button
        cardBody.appendChild(addButton);

        // Füge das Produkt-Div in den DOM ein
        document.getElementById('product-list').appendChild(productDiv);

        // Warenkorb-Funktionalität
        addButton.addEventListener('click', function () {
            // Warenkorb aus localStorage abrufen oder leeres Array erstellen
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Prüfen, ob das Produkt bereits im Warenkorb ist
            const existingProduct = cart.find(item => item.product.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += 1; // Produktanzahl erhöhen
            } else {
                cart.push({ product, quantity: 1 });
            }

            // Warenkorb im localStorage speichern
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });

    // Warenkorb anzeigen
    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';  // Leere den Warenkorb

        if (cart.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.classList.add('list-group-item');
            emptyMessage.textContent = 'Ihr Warenkorb ist leer.';
            cartList.appendChild(emptyMessage);
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.classList.add('list-group-item');
                cartItem.textContent = `${item.product.title} - ${item.quantity} Stück`;
                cartList.appendChild(cartItem);
            });
        }
    }

    updateCart();  // Warenkorb beim Laden der Seite anzeigen
});
