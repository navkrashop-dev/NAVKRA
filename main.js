/* ============================================
   NAVKRA - Premium Activewear Website
   JavaScript Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load

    // ============================================
    // MOBILE MENU
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    // Create overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    function openMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuFn() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFn);
    menuOverlay.addEventListener('click', closeMenuFn);

    // Close menu on link click
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenuFn);
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL INDICATOR
    // ============================================
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const collectionsSection = document.getElementById('collections');
            if (collectionsSection) {
                collectionsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ============================================
    // PRODUCTS DATA & RENDERING
    // ============================================
    const products = [
        {
            id: 1,
            name: 'NAVKRA Pro Hoodie',
            category: 'Men',
            price: 89.99,
            originalPrice: 179.99,
            discount: '50%',
            badge: 'Sale',
            image: 'assets/images/navkra-promo.png'
        },
        {
            id: 2,
            name: 'NAVKRA Performance Tee',
            category: 'Men',
            price: 49.99,
            originalPrice: 99.99,
            discount: '50%',
            badge: 'Sale',
            image: 'assets/images/navkra-promo.png'
        },
        {
            id: 3,
            name: 'NAVKRA Essential Leggings',
            category: 'Women',
            price: 59.99,
            originalPrice: 119.99,
            discount: '50%',
            badge: 'Hot',
            image: 'assets/images/navkra-promo.png'
        },
        {
            id: 4,
            name: 'NAVKRA Training Shorts',
            category: 'Men',
            price: 39.99,
            originalPrice: 79.99,
            discount: '50%',
            badge: 'Sale',
            image: 'assets/images/navkra-promo.png'
        },
        {
            id: 5,
            name: 'NAVKRA Sports Bra',
            category: 'Women',
            price: 44.99,
            originalPrice: 89.99,
            discount: '50%',
            badge: 'New',
            image: 'assets/images/navkra-promo.png'
        },
        {
            id: 6,
            name: 'NAVKRA Track Jacket',
            category: 'Unisex',
            price: 99.99,
            originalPrice: 199.99,
            discount: '50%',
            badge: 'Sale',
            image: 'assets/images/navkra-promo.png'
        },
        {
            id: 7,
            name: 'NAVKRA Joggers',
            category: 'Men',
            price: 69.99,
            originalPrice: 139.99,
            discount: '50%',
            badge: 'Sale',
            image: 'assets/images/navkra-promo.png'
        },
        {
            id: 8,
            name: 'NAVKRA Crop Top',
            category: 'Women',
            price: 34.99,
            originalPrice: 69.99,
            discount: '50%',
            badge: 'New',
            image: 'assets/images/navkra-promo.png'
        }
    ];

    function renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <button class="product-wishlist" aria-label="Add to wishlist">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${product.category}</p>
                    <div class="product-price">
                        <span class="price-current">$${product.price.toFixed(2)}</span>
                        <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
                        <span class="price-discount">-${product.discount}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click handlers for product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.product-wishlist')) {
                    e.stopPropagation();
                    toggleWishlist(e.target.closest('.product-wishlist'));
                    return;
                }
                const productId = this.dataset.productId;
                addToCart(productId);
            });
        });
    }

    renderProducts();

    // ============================================
    // WISHLIST TOGGLE
    // ============================================
    function toggleWishlist(btn) {
        const svg = btn.querySelector('svg');
        const isFilled = btn.classList.contains('active');

        if (!isFilled) {
            btn.classList.add('active');
            svg.setAttribute('fill', 'currentColor');
            showToast('Added to wishlist!');
        } else {
            btn.classList.remove('active');
            svg.setAttribute('fill', 'none');
            showToast('Removed from wishlist');
        }
    }

    // ============================================
    // CART FUNCTIONALITY
    // ============================================
    let cartCount = 2; // Starting with 2 items

    function addToCart(productId) {
        cartCount++;
        updateCartBadge();

        const product = products.find(p => p.id == productId);
        const productName = product ? product.name : 'Item';
        showToast(`${productName} added to cart!`);
    }

    function updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = cartCount;
            badge.style.animation = 'none';
            badge.offsetHeight; // Trigger reflow
            badge.style.animation = 'pulse 0.3s ease';
        }
    }

    // ============================================
    // TOAST NOTIFICATION
    // ============================================
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout;

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showToast('Thanks for subscribing!');
                this.reset();
            }
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.section-header, .collection-card, .product-card, .feature-box');

    function revealOnScroll() {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                el.classList.add('reveal', 'active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const hero = document.querySelector('.hero');

    function parallaxHero() {
        if (!hero) return;
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.4;
        hero.style.backgroundPositionY = `calc(50% + ${rate}px)`;
    }

    // Only apply parallax on non-touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('scroll', parallaxHero);
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenuFn();
        }
    });

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // PERFORMANCE: Preload critical resources
    // ============================================
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = 'assets/images/navkra-promo.png';
    document.head.appendChild(preloadLink);

    console.log('%c NAVKRA ', 'background: #ff4444; color: white; font-size: 20px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
    console.log('%c Premium Activewear Website Loaded Successfully ', 'color: #ff4444; font-size: 14px;');
});
