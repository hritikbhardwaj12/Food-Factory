// ================== CART MANAGEMENT SYSTEM ==================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add/update item in cart
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity if item exists
  } else {
    cart.push({ ...product, quantity: 1 }); // Add new item
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI(); // Update UI on all pages
}

// Function to update item quantity
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity += change;

    if (item.quantity < 1) {
      cart = cart.filter(item => item.id !== productId); // Remove item if quantity is 0
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI(); // Update UI on all pages
  }
}

// Function to update UI across all pages
function updateCartUI() {
  updateProductCards(); // Update product cards on index.html
  updateProductPage(); // Update product page (e.g., apple.html)
  renderCartItems(); // Update cart page (cart.html)
}

// Function to update product cards on index.html
function updateProductCards() {
  const productCards = document.querySelectorAll('.card');

  productCards.forEach(card => {
    const productId = card.dataset.productId;
    const addButton = card.querySelector('.add-btn');
    const quantityControl = card.querySelector('.quantity-control');
    const quantityDisplay = quantityControl?.querySelector('.quantity');

    const item = cart.find(item => item.id === productId);

    if (item) {
      addButton.style.display = 'none'; // Hide "Add" button
      quantityControl.style.display = 'flex'; // Show quantity controls
      quantityDisplay.textContent = item.quantity; // Update quantity
    } else {
      addButton.style.display = 'block'; // Show "Add" button
      quantityControl.style.display = 'none'; // Hide quantity controls
    }
  });
}

// Function to update product page (e.g., apple.html)
function updateProductPage() {
  const productContainer = document.querySelector('.product-container');

  if (productContainer) {
    const productId = productContainer.dataset.productId;
    const addButton = document.querySelector('.add-btn');
    const quantityControl = document.querySelector('.quantity-control');
    const quantityDisplay = quantityControl?.querySelector('.quantity');

    const item = cart.find(item => item.id === productId);

    if (item) {
      addButton.style.display = 'none'; // Hide "Add" button
      quantityControl.style.display = 'flex'; // Show quantity controls
      quantityDisplay.textContent = item.quantity; // Update quantity
    } else {
      addButton.style.display = 'block'; // Show "Add" button
      quantityControl.style.display = 'none'; // Hide quantity controls
    }
  }
}

// Function to render cart items on cart.html
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartDiv = document.getElementById('empty-cart');
  const cartContentDiv = document.getElementById('cart-content');

  if (!cartItemsContainer) return; // Exit if not on the cart page

  cartItemsContainer.innerHTML = '';
  let itemsTotal = 0;

  if (cart.length === 0) {
    emptyCartDiv.style.display = 'block';
    cartContentDiv.style.display = 'none';
  } else {
    emptyCartDiv.style.display = 'none';
    cartContentDiv.style.display = 'block';

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      itemsTotal += itemTotal;

      const cartItemDiv = document.createElement('div');
      cartItemDiv.className = 'cart-item';
      cartItemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>₹${item.price}/kg</p>
          <p>Total: ₹${itemTotal}</p>
        </div>
        <div class="cart-item-controls">
          ${item.quantity > 0 ? `
            <div class="quantity-control">
              <button class="quantity-btn minus">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn plus">+</button>
            </div>
          ` : `
            <button class="add-btn">Add</button>
          `}
        </div>
      `;

      // Event listeners for quantity buttons
      const minusButton = cartItemDiv.querySelector('.minus');
      const plusButton = cartItemDiv.querySelector('.plus');
      const addButton = cartItemDiv.querySelector('.add-btn');

      if (minusButton) {
        minusButton.addEventListener('click', () => updateQuantity(item.id, -1));
      }

      if (plusButton) {
        plusButton.addEventListener('click', () => updateQuantity(item.id, 1));
      }

      if (addButton) {
        addButton.addEventListener('click', () => addToCart(item));
      }

      cartItemsContainer.appendChild(cartItemDiv);
    });

    // Update totals
    document.getElementById('items-total').textContent = `₹${itemsTotal}`;
    document.getElementById('grand-total').textContent = `₹${itemsTotal + 30}`;
  }
}

// Function to delete an item from the cart
function deleteItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI(); // Update UI on all pages
}

// ================== INITIALIZATION ==================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize product cards on index.html
  const productCards = document.querySelectorAll('.card');
  productCards.forEach(card => {
    const productId = card.dataset.productId;
    const product = {
      id: productId,
      name: card.querySelector('h3').textContent,
      price: parseFloat(card.querySelector('.price').textContent.match(/\d+/)[0]),
      image: card.querySelector('img').src
    };

    // Add event listener to "Add" button
    const addButton = card.querySelector('.add-btn');
    addButton.addEventListener('click', () => addToCart(product));

    // Add event listeners to quantity buttons
    const quantityControl = card.querySelector('.quantity-control');
    if (quantityControl) {
      quantityControl.querySelector('.minus').addEventListener('click', () => updateQuantity(productId, -1));
      quantityControl.querySelector('.plus').addEventListener('click', () => updateQuantity(productId, 1));
    }
  });

  // Initialize product page (e.g., apple.html)
  const productContainer = document.querySelector('.product-container');
  if (productContainer) {
    const productId = productContainer.dataset.productId;
    const product = {
      id: productId,
      name: document.querySelector('.product-details h2').textContent.split(' - ')[0],
      price: parseFloat(document.querySelector('.product-details h2').textContent.match(/\d+/)[0]),
      image: document.querySelector('.product-image img').src
    };

    // Add event listener to "Add" button
    const addButton = document.querySelector('.add-btn');
    addButton.addEventListener('click', () => addToCart(product));

    // Add event listeners to quantity buttons
    const quantityControl = document.querySelector('.quantity-control');
    if (quantityControl) {
      quantityControl.querySelector('.minus').addEventListener('click', () => updateQuantity(productId, -1));
      quantityControl.querySelector('.plus').addEventListener('click', () => updateQuantity(productId, 1));
    }
  }

  // Render cart items on cart.html
  if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
  }

  // Update UI on all pages
  updateCartUI();
});
// Function to handle product card clicks
function handleProductCardClick(event) {
  // Ignore clicks on buttons or quantity controls
  if (
    event.target.classList.contains("add-btn") ||
    event.target.classList.contains("quantity-btn") ||
    event.target.classList.contains("quantity")
  ) {
    return;
  }

  // Get the product link from the card's data attribute
  const productLink = event.currentTarget.getAttribute("data-product-link");

  // Redirect to the product page
  if (productLink) {
    window.location.href = productLink;
  }
}

// Initialize product card clicks
function initializeProductCards() {
  const productCards = document.querySelectorAll(".card");
  productCards.forEach(card => {
    card.addEventListener("click", handleProductCardClick);
  });
}

// ================== INITIALIZATION ==================
document.addEventListener("DOMContentLoaded", () => {
  initializeProductCards(); // Initialize product card clicks
  // Rest of your existing initialization code...
});


const accountBtn = document.getElementById('accountBtn');
const accountDropdown = document.querySelector('.account-dropdown');
const overlay = document.getElementById('overlay');

// Toggle dropdown and overlay

accountBtn.addEventListener('click', (e) => {
  e.stopPropagation();
    accountDropdown.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!accountDropdown.contains(e.target) && !accountBtn.contains(e.target)) {
        accountDropdown.classList.remove('active');
        overlay.classList.remove('active');
      }
    });

    // Close on overlay click
    overlay.addEventListener('click', () => {
      accountDropdown.classList.remove('active');
      overlay.classList.remove('active');
    });
    function redirectToLogin() {
      // Redirect to login page or show login form
      window.location.href = "login.html"; // Change to your login page URL
    }
    function redirectToSignup() {
      // Redirect to signup page
      window.location.href = "signup.html"; // Change to your signup page URL
  }
  function validateForm() {
    // Room number validation
    const roomInput = document.getElementById('room');
    const roomError = document.getElementById('roomError');
    if (roomInput.value < 1 || roomInput.value > 99) {
      roomError.style.display = 'block';
      return false;
    }
    roomError.style.display = 'none';

    // Mobile number validation
    const mobileInput = document.getElementById('mobileNo');
    const mobileError = document.getElementById('mobileError');
    if (!/^\d{10}$/.test(mobileInput.value)) {
      mobileError.style.display = 'block';
      return false;
    }
    mobileError.style.display = 'none';

    return true;
  }
  // Restrict mobile input to numbers only
  document.getElementById('mobileNo').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  function sendOTP() {
    // Your existing OTP sending logic

    // Get form data
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const Hostel = document.getElementById('hostel').value;
const Room = document.getElementById('room').value;
const Mobile_No = document.getElementById('mobileNo').value;


// Prepare the data to be sent
const data = {
    name: name,
    email: email,
    Hostel: Hostel,
    Room: Room,
    Mobile_No: Mobile_No,
    
};

// Fetch API to send POST request
fetch('http://192.168.14.7:5000/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    console.log('Success:', result);
    alert('Registration successful!');
})
.catch(error => {
    console.error('Error:', error);
    alert('Registration failed! Please try again.');
});

    alert("OTP sent to your mobile number!");
  }

  function redirectToLogin() {
    window.location.href = "login.html";
  }

  

  

    