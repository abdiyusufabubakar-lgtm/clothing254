// Sample Products
const products = [
    { id: 1, name: 'Classic T-Shirt', price: 29.99, emoji: '👕', description: 'Premium cotton t-shirt' },
    { id: 2, name: 'Denim Jeans', price: 59.99, emoji: '👖', description: 'Comfortable denim jeans' },
    { id: 3, name: 'Leather Jacket', price: 129.99, emoji: '🧥', description: 'Stylish leather jacket' },
    { id: 4, name: 'Casual Sneakers', price: 79.99, emoji: '👟', description: 'Lightweight sneakers' },
    { id: 5, name: 'Summer Dress', price: 49.99, emoji: '👗', description: 'Breathable summer dress' },
    { id: 6, name: 'Winter Coat', price: 149.99, emoji: '🧤', description: 'Warm winter coat' }
];

// Shopping Cart
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
});

// Load products to the page
function loadProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-description">${product.description}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Open cart modal
document.querySelector('.cart-icon').addEventListener('click', () => {
    openCart();
});

function openCart() {
    const modal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div style="padding: 10px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between;">
                <div>
                    <strong>${item.name}</strong> x${item.quantity}<br>
                    <small>$${item.price.toFixed(2)}</small>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remove</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    modal.style.display = 'block';
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    openCart(); // Refresh the cart display
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle contact form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    document.querySelector('.contact-form').reset();
});