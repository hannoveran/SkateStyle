function createNavbar(options = {}) {
    const defaults = {
        logoSrc: 'assets/images/logo/logoRemoveBg.png',
        logoAlt: 'Skate Style Store Logo',
        cartCount: 0,
        currentPage: '' 
    };
    
    const config = { ...defaults, ...options };
    
    return `
        <section class="navbar">
            <div class="logo">
                <a href="index.html">
                    <img src="${config.logoSrc}" alt="${config.logoAlt}">
                </a>
            </div>
            
            <div class="nav-links main-links">
                <nav>
                    <ul>
                        <li><a href="category.html#type=women" ${config.currentPage === 'women' ? 'class="active"' : ''}>Жінкам</a></li>
                        <li><a href="category.html#type=men" ${config.currentPage === 'men' ? 'class="active"' : ''}>Чоловікам</a></li>
                        <li><a href="category.html#type=skates" ${config.currentPage === 'skates' ? 'class="active"' : ''}>Ковзани</a></li>
                        <li><a href="category.html#type=accessories" ${config.currentPage === 'accessories' ? 'class="active"' : ''}>Аксесуари</a></li>
                        <li><a href="aboutUs.html" ${config.currentPage === 'about' ? 'class="active"' : ''}>Про нас</a></li>
                        <li><a href="#phone-number">Контакти</a></li>
                    </ul>
                </nav>
            </div>
            
            <div class="nav-links">
                <nav>
                    <ul>
                        <li class="search">
                            <a href="#" onclick="toggleSearch(event)">
                                <img src="assets/images/index/search.png" alt="Search">
                                <span>Шукати</span>
                            </a>
                        </li>
                        <li>
                            <a href="account.html">
                                <img src="assets/images/index/account.png" alt="Account">
                            </a>
                        </li>
                        <li class="cart">
                            <a href="#" onclick="toggleCart(event)">
                                <img src="assets/images/index/cart.png" alt="Cart">
                            </a>
                            <span id="cart-count">${config.cartCount}</span>
                        </li>
                        <li>
                            <div class="burger" onclick="toggleMenu()">☰</div>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    `;
}

function toggleMenu() {
    const mainLinks = document.querySelector(".main-links");
    
    if (mainLinks) {
        mainLinks.classList.toggle("active");
    } else {
        console.error('Елемент .main-links не знайдено!');
    }
}

function updateCartCount(count) {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Ініціалізація навбара
function initNavbar(options = {}) {
    const navbarContainer = document.querySelector('[data-component="navbar"]');
    if (navbarContainer) {
        navbarContainer.innerHTML = createNavbar(options);
        
        if (options.currentPage) {
            setActiveNavItem(options.currentPage);
        }
        
        // Закриття меню при кліку на посилання (для мобільних)
        const mainLinks = document.querySelector('.main-links');
        if (mainLinks) {
            const links = mainLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 1100) {
                        mainLinks.classList.remove('active');
                    }
                });
            });
        }
        
        // Закриття меню при кліку поза ним
        document.addEventListener('click', (e) => {
            const burger = document.querySelector('.burger');
            const mainLinks = document.querySelector('.main-links');
            
            if (mainLinks && mainLinks.classList.contains('active')) {
                if (!mainLinks.contains(e.target) && !burger.contains(e.target)) {
                    mainLinks.classList.remove('active');
                }
            }
        });
    }
}

function setActiveNavItem(page) {
    const navLinks = document.querySelectorAll('.main-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(page)) {
            link.classList.add('active');
        }
    });
}

// Експорт в window для глобального доступу
window.toggleMenu = toggleMenu;
window.updateCartCount = updateCartCount;
window.initNavbar = initNavbar;
window.setActiveNavItem = setActiveNavItem;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createNavbar, initNavbar, updateCartCount, setActiveNavItem, toggleMenu };
}