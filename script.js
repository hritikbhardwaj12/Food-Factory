document.addEventListener("DOMContentLoaded", function() {
    // Get references to the elements
    const buyNowButton = document.getElementById("buyNowBtn");
    const addToCartButton = document.getElementById("addToCartBtn");
    const goToCartButton = document.getElementById("goToCartBtn");
    const loginButton = document.querySelector('.login-btn');
    const cartButton = document.querySelector('.cart-btn');

    // Example product data (this could come from a backend or database)
    const product = {
        name: 'Apple',
        price: 40,
        description: 'Delicious and crunchy Aathe, a perfect snack.',
        quantity: 1,
        image: 'image/Apple.png'
    };

    // Event listener for the "Buy Now" button
    buyNowButton.addEventListener('click', function() {
        const product = {
            name: 'Apple',
            price: 40,
            quantity: 1,
            image: 'image/Apple.png'
        };
    });

    // Event listener for the "Add to Cart" button
    addToCartButton.addEventListener('click', function() {
        alert(`${product.name} has been added to your cart.`);
        addToCart(product);
    });

    // Event listener for the "Go to Cart" button
    goToCartButton.addEventListener('click', function() {
        window.location.href = 'cart.html'; // Redirect to the cart page
    });

    // Event listener for the "Login" button (For now, just an alert)
    loginButton.addEventListener('click', function() {
        alert('Login functionality is not implemented yet.');
    });

    // Event listener for the Cart button (Redirects to cart page)
    cartButton.addEventListener('click', function() {
        window.location.href = 'cart.html'; // Redirect to the cart page
    });

    // Function to add the product to the cart
    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the cart from localStorage, or create a new one if it doesn't exist
        let existingItemIndex = cartItems.findIndex(item => item.name === product.name);

        if (existingItemIndex !== -1) {
            // If the product already exists in the cart, update its quantity
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // If the product is not in the cart, add it as a new item
            cartItems.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cartItems)); // Save the updated cart to localStorage
        alert(`${product.name} has been added to your cart.`);
        window.location.href = "cart.html"; // Redirect to cart pages
    }

    // Function to display cart items (Optional, if you want to show the cart data somewhere)
    function displayCart() {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Cart Items:', cartItems);
    }
});

