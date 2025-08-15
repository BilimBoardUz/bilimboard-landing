document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        mobileMenu.querySelectorAll('a, button').forEach(element => {
            element.addEventListener('click', () => {
                if (element.type !== 'button' || element.classList.contains('btn')) {
                    closeMobileMenu();
                }
            });
        });

        document.addEventListener('click', (e) => {
            const isClickInside = mobileMenu.contains(e.target) || mobileMenuToggle.contains(e.target);
            if (!isClickInside && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        function openMobileMenu() {
            mobileMenu.classList.add('active');
            mobileMenuToggle.classList.add('mobile-menu-open');
            document.body.classList.add('no-scroll');
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('mobile-menu-open');
            document.body.classList.remove('no-scroll');
        }
    }

    // Phone screenshot navigation
    const phoneScreen = document.querySelector('.phone-screen');
    const prevBtn = document.getElementById('prev-screenshot-btn');
    const nextBtn = document.getElementById('next-screenshot-btn');

    if (phoneScreen && prevBtn && nextBtn) {
        let currentIndex = 0;
        const screenshots = phoneScreen.querySelectorAll('.review-screenshot');
        const totalScreenshots = screenshots.length;

        function showScreenshot(index) {
            phoneScreen.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }

        function nextScreenshot() {
            const nextIndex = (currentIndex + 1) % totalScreenshots;
            showScreenshot(nextIndex);
        }

        function prevScreenshot() {
            const prevIndex = (currentIndex - 1 + totalScreenshots) % totalScreenshots;
            showScreenshot(prevIndex);
        }

        nextBtn.addEventListener('click', nextScreenshot);
        prevBtn.addEventListener('click', prevScreenshot);

        let autoSlide = setInterval(nextScreenshot, 4000);

        [nextBtn, prevBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                clearInterval(autoSlide);
                autoSlide = setInterval(nextScreenshot, 4000);
            });
        });
    }

    // Feature items animation on scroll
    const featureItems = document.querySelectorAll('.feature-block-item');
    
    if (featureItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        featureItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Cookie consent functionality
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function hideCookieConsent() {
        if (cookieConsent) {
            cookieConsent.style.display = 'none';
        }
    }

    if (!getCookie('cookie_consent')) {
        if (cookieConsent) {
            cookieConsent.style.display = 'block';
        }
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            setCookie('cookie_consent', 'accepted', 365);
            hideCookieConsent();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            setCookie('cookie_consent', 'essential_only', 365);
            hideCookieConsent();
        });
    }

    // Handle escape key for mobile menu and cookie consent
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            if (cookieConsent && cookieConsent.style.display === 'block') {
                hideCookieConsent();
            }
        }
    });

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
        });
    }

    // Add touch event support for better mobile experience
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});