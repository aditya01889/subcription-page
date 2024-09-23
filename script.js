// Product Data
const products = [
    { name: 'Power', price: 70, description: 'High Protein Meal', image: 'images/power.png' },
    { name: 'Supreme', price: 70, description: 'Special Nourishment', image: 'images/supreme.png' },
    { name: 'Vitality', price: 70, description: 'Energy Booster', image: 'images/vitality.png' },
    { name: 'Nourish', price: 70, description: 'Complete Diet', image: 'images/nourish.png' }
];

// Cart Data
let cart = [];

// Load Products
function loadProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 10px;">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>₹${product.price}</p>
            <label for="frequency">Subscription Frequency</label>
            <select id="frequency-${product.name}">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add to Cart
function addToCart(productName, price) {
    const frequency = document.getElementById(`frequency-${productName}`).value;
    const product = { name: productName, price: price, frequency: frequency };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to local storage
    displayCart();
}

// Display Cart with Total Cost
function displayCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    let totalCost = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `<p>${item.name} - ₹${item.price} (${item.frequency})</p>`;
        cartList.appendChild(cartItem);
        totalCost += item.price;
    });

    if (cart.length > 0) {
        cartList.innerHTML += `<p><strong>Total: ₹${totalCost}</strong></p>`;
        document.getElementById('checkout-btn').style.display = 'block';
    } else {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('checkout-btn').style.display = 'none';
    }
}

// Proceed to Checkout
function proceedToCheckout() {
    document.getElementById('checkout-form').style.display = 'block';
}

// Submit Form and Process Payment
function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Validate form inputs
    if (!validateEmail(email)) {
        showError("Please enter a valid email address.");
        return;
    }

    if (!validateAddress(address)) {
        showError("We only deliver to Noida. Please enter a valid Noida address.");
        return;
    }

    if (!cart || cart.length === 0) {
        showError("Your cart is empty.");
        return;
    }

    // Show loading while processing
    showLoading();

    const orderDetails = {
        customer: { name, email, address },
        cart: cart
    };

    // Simulate success or error
    setTimeout(() => {
        hideLoading();
        // Simulate success or error randomly
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
            showSuccess("Payment and shipment created successfully!");
            localStorage.removeItem('cart'); // Clear cart after success
            cart = []; // Reset cart in-memory
            displayCart(); // Update cart view
        } else {
            showError("An error occurred during payment or shipment.");
        }
    }, 2000);
}

// Validate Email (Regex)
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Validate Address (Only Noida)
function validateAddress(address) {
    return address.toLowerCase().includes("noida");
}

// Show loading indicator
function showLoading() {
    document.getElementById('loading-indicator').style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    document.getElementById('loading-indicator').style.display = 'none';
}

// Function to show success modal
function showSuccess(message) {
    document.getElementById('success-message').textContent = message;
    document.getElementById('success-modal').style.display = 'block';
}

// Function to show error modal
function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-modal').style.display = 'block';
}

// Function to close modals
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Load Cart from Local Storage on Page Load
window.onload = function() {
    loadProducts();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayCart();
    }
};
