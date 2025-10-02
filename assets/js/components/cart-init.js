
let cartComponent = null;

function initCart() {
    if (!cartComponent) {
        cartComponent = new CartComponent();
        
        window.cartComponent = cartComponent;
        
        window.toggleCart = cartComponent.toggleCart.bind(cartComponent);
        window.closeCart = cartComponent.closeCart.bind(cartComponent);
        window.addToCart = cartComponent.addToCart.bind(cartComponent);
        window.proceedToCheckout = cartComponent.proceedToCheckout.bind(cartComponent);
        
        window.onUserLogin = cartComponent.onUserLogin.bind(cartComponent);
        window.onUserLogout = cartComponent.onUserLogout.bind(cartComponent);
        
    }
    
    return cartComponent;
}

function getCartInstance() {
    return cartComponent || initCart();
}

function getCartCount() {
    const cart = getCartInstance();
    return cart.getCartCount();
}

function updateCartCounter() {
    const cart = getCartInstance();
    const counter = document.querySelector('.cart span') || document.getElementById('cart-counter');
    
    if (counter) {
        counter.innerText = cart.getCartCount().toString();
    }
}

// Експорт функцій в window
window.initCart = initCart;
window.getCartInstance = getCartInstance;
window.getCartCount = getCartCount;
window.updateCartCounter = updateCartCounter;

// Автоматична ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    initCart();
});