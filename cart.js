document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let checkoutBtn = document.getElementById("checkoutBtn");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.textContent = "";
        checkoutBtn.style.display = "none";
        return;
    }

    let total = 0;
    cartItems.forEach((item, index) => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.image}" width="50">
            <p><strong>${item.name}</strong> - ₹${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total Price: ₹${total}`;

    // Checkout button functionality
    checkoutBtn.addEventListener("click", function () {
        alert("Proceeding to payment...");
        window.location.href = "checkout.html"; // Redirect to checkout page
    });
});

// Function to remove items from cart
function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    location.reload(); // Refresh the page to update cart
}
