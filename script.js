// Product Data
const products = [
    { name: 'Kitten', price: 1499, description: 'High Protein Meal', image: 'images/power.png' },
    { name: 'Cat', price: 1799, description: 'Special Nourishment', image: 'images/supreme.png' },
];

// Cart Data
let cart = {};

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
            <div class="product-quantity">
                <button onclick="changeQuantity('${product.name}', -1)">-</button>
                <input type="text" id="quantity-${product.name}" value="0" readonly>
                <button onclick="changeQuantity('${product.name}', 1)">+</button>
            </div>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Change Product Quantity (only updates UI, not the cart)
function changeQuantity(productName, change) {
    const quantityInput = document.getElementById(`quantity-${productName}`);
    let currentQuantity = parseInt(quantityInput.value);
    currentQuantity += change;
    if (currentQuantity < 0) currentQuantity = 0; // Prevent negative quantity
    quantityInput.value = currentQuantity;
}

// Add to Cart (only products with a positive quantity will be added to cart)
function addToCart(productName, price) {
    const quantity = parseInt(document.getElementById(`quantity-${productName}`).value);
    if (quantity > 0) {
        cart[productName] = { price: price, quantity: quantity };
        displayCart();
    }
}

// Display Cart with Total Cost and Quantity Management
function displayCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    let totalCost = 0;

    // Only display products that have been added to the cart
    for (const product in cart) {
        const item = cart[product];
        if (item && item.price && item.quantity > 0) {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `<p>${product} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</p>`;
            cartList.appendChild(cartItem);
            totalCost += item.price * item.quantity;
        }
    }

    if (Object.keys(cart).length > 0 && totalCost > 0) {
        cartList.innerHTML += `<p><strong>Total: ₹${totalCost}</strong></p>`;
        document.getElementById('checkout-btn').style.display = 'block';
    } else {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('checkout-btn').style.display = 'none';
    }
}

// Proceed to Checkout (Paytm Checkout Integration)
function proceedToCheckout() {
    const totalAmount = calculateTotalAmount();
    const customerDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    };

    if (!validateEmail(customerDetails.email)) {
        showError("Please enter a valid email address.");
        return;
    }

    if (!validateAddress(customerDetails.address)) {
        showError("We only deliver to Noida. Please enter a valid Noida address.");
        return;
    }

    // Call your Vercel backend to get the transaction token for Paytm
    fetch('https://cozycatkitchen-backend.vercel.app/create-paytm-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount: totalAmount,
            email: customerDetails.email,
            phone: '9876543210'  // Replace with actual phone field if necessary
        })
    })
    .then(response => response.json())
    .then(data => {
        // Paytm Checkout JS - open modal
        if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.init({
                flow: "DEFAULT",
                data: {
                    orderId: data.orderId,  // Received from server
                    token: data.txnToken,   // Transaction token received from server
                    tokenType: "TXN_TOKEN",
                    amount: totalAmount,
                },
                handler: {
                    notifyMerchant: function(eventName, data){
                        if(eventName === 'APPROVED') {
                            // Payment is successful, trigger the Shiprocket order
                            createShiprocketOrder(customerDetails);
                        }
                    }
                }
            }).then(function() {
                window.Paytm.CheckoutJS.invoke();
            }).catch(function(error){
                console.log("Error invoking Paytm CheckoutJS", error);
            });
        }
    })
    .catch(error => {
        showError("Error generating transaction token: " + error.message);
    });
}

// Create Shiprocket Order after successful payment
function createShiprocketOrder(customerDetails) {
    const orderDetails = {
        "order_id": "123456",  // Unique ID for your order
        "order_date": new Date().toISOString(),
        "pickup_location": "Primary Pickup Location",
        "billing_customer_name": customerDetails.name,
        "billing_address": customerDetails.address,
        "billing_city": "Noida",
        "billing_pincode": "201301",
        "billing_country": "India",
        "order_items": Object.keys(cart).map(product => ({
            "name": product,
            "sku": product,
            "units": cart[product].quantity,
            "selling_price": cart[product].price
        }))
    };

    fetch('https://cozycatkitchen-backend.vercel.app/create-shiprocket-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails)
    })
    .then(response => response.json())
    .then(data => {
        showSuccess("Order created successfully with Shiprocket!");
        localStorage.removeItem('cart');
        cart = {}; // Clear the cart
        displayCart(); // Update the cart view
    })
    .catch(error => showError("Error creating Shiprocket order: " + error.message));
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

// Show success message
function showSuccess(message) {
    document.getElementById('success-message').textContent = message;
    document.getElementById('success-modal').style.display = 'block';
}

// Show error message
function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-modal').style.display = 'block';
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

// Helper function to calculate the total amount
function calculateTotalAmount() {
    let total = 0;
    for (const product in cart) {
        if (cart[product].quantity > 0) {
            total += cart[product].price * cart[product].quantity;
        }
    }
    return total;
}
