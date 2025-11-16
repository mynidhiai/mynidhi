// Modern website features and enhancements

// Loading Screen Handler
(function() {
    const loader = document.getElementById('loader');
    const body = document.body;
    
    if (!loader) return;
    
    // Add loading class to body
    body.classList.add('loading');
    
    // Simulate minimum loading time for better UX (800ms)
    const minLoadTime = 800;
    const startTime = performance.now();
    
    function hideLoader() {
        const elapsed = performance.now() - startTime;
        const remaining = Math.max(0, minLoadTime - elapsed);
        
        setTimeout(() => {
            loader.classList.add('hidden');
            body.classList.remove('loading');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loader.remove();
            }, 600);
        }, remaining);
    }
    
    // Check if page is already loaded
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader, { once: true });
    }
})();

// Handle mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        siteNav.classList.toggle('open');
    });

    navLinks.forEach((link) =>
        link.addEventListener('click', () => {
            siteNav.classList.remove('open');
        })
    );
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#top') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Back to top button functionality
const backToTop = document.querySelector('.back-to-top');
let scrollTimeout;

function handleScroll() {
    if (window.scrollY > 300) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
}

window.addEventListener('scroll', () => {
    handleScroll();
    // Throttle scroll events for performance
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 10);
}, { passive: true });

// Highlight navigation items when sections enter viewport
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id');
            const navItem = document.querySelector(`.site-nav a[href="#${id}"]`);
            if (!navItem) return;
            if (entry.isIntersecting) {
                document.querySelectorAll('.site-nav a').forEach((a) => a.classList.remove('active'));
                navItem.classList.add('active');
            }
        });
    },
    { threshold: 0.35, rootMargin: '-100px 0px' }
);

sections.forEach((section) => navObserver.observe(section));

// Scroll-triggered animations with Intersection Observer
const animateOnScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

// Observe all cards and articles for animation
document.querySelectorAll('.info-grid article, .architecture-grid article, .why-grid article, .feature-grid article').forEach((el) => {
    animateOnScroll.observe(el);
});

// Parallax effect for hero section (only after loader is gone)
let lastScrollY = 0;
const hero = document.querySelector('.hero');

function updateParallax() {
    // Don't run parallax if loader is still visible
    if (document.getElementById('loader') && !document.getElementById('loader').classList.contains('hidden')) {
        return;
    }
    
    const scrollY = window.scrollY;
    if (hero && scrollY < window.innerHeight) {
        const parallaxValue = scrollY * 0.5;
        hero.style.transform = `translateY(${parallaxValue}px)`;
        hero.style.opacity = 1 - scrollY / window.innerHeight * 0.5;
    }
    lastScrollY = scrollY;
}

window.addEventListener('scroll', () => {
    updateParallax();
}, { passive: true });

// Cursor trail effect (optional, can be disabled for performance)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
}, { passive: true });

// Set copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Improve focus outline for keyboard users on table wrapper
const tableRegion = document.querySelector('.table-wrapper');
if (tableRegion) {
    tableRegion.addEventListener('focus', () => {
        tableRegion.style.boxShadow = '0 0 0 2px var(--primary)';
    });
    tableRegion.addEventListener('blur', () => {
        tableRegion.style.boxShadow = 'none';
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.primary-btn, .ghost-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Lazy load images (if any are added later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Performance: Preload critical resources
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'style';
preloadLink.href = 'style.css';
document.head.appendChild(preloadLink);

// Add reduced motion support for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// Console easter egg
console.log('%c🚀 MyNidhi', 'font-size: 20px; font-weight: bold; color: #2DD4BF;');
console.log('%cThe future of trading is almost here. Join the waitlist!', 'color: #38BDF8;');
