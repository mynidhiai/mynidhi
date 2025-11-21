// Modern website features and enhancements

// Handle mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        siteNav.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach((link) =>
        link.addEventListener('click', () => {
            siteNav.classList.remove('open');
            navToggle.classList.remove('active');
        })
    );

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
            siteNav.classList.remove('open');
            navToggle.classList.remove('active');
        }
    });
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

// Add ripple effect to buttons (only for primary buttons)
document.querySelectorAll('.primary-btn').forEach(button => {
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

// Google Forms Submission Handler
(function() {
    // Your Google Form ID (extracted from your form URL)
    const GOOGLE_FORM_ID = '1FAIpQLSchkG7CEUnSDcj5vezjasCh5zmJhl3ZKFzQ-pJ8l2qYxM9aTQ';
    
    // Form action URL
    const FORM_ACTION = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    
    // IMPORTANT: You need to find your entry field names
    // To find them: Open your Google Form → Right-click → Inspect → Look for name="entry.XXXXXXX"
    // Replace these with your actual field names
    const FIELD_NAMES = {
        name: 'entry.841741905',  // Replace with your Name field entry number
        email: 'entry.2047795414'  // Replace with your Email field entry number
    };

    const waitlistForm = document.getElementById('waitlistForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const btnContent = submitBtn.querySelector('.btn-content');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    if (!waitlistForm) return;

    // Create hidden iframe for form submission
    const createHiddenIframe = () => {
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe';
        iframe.id = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        return iframe;
    };

    const hiddenIframe = createHiddenIframe();

    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Validation
        if (!name || !email) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Check if field names are configured
        if (FIELD_NAMES.name.includes('XXXXXXX') || FIELD_NAMES.email.includes('XXXXXXX')) {
            showMessage('⚠️ Form fields need to be configured. Please check the setup instructions.', 'error');
            console.error('Google Forms field names not configured. Please update FIELD_NAMES in script.js');
            return;
        }

        // Show loading state
        setLoadingState(true);
        hideMessage();

        try {
            // Create a temporary form to submit to Google Forms
            const tempForm = document.createElement('form');
            tempForm.method = 'POST';
            tempForm.action = FORM_ACTION;
            tempForm.target = 'hidden_iframe';
            tempForm.style.display = 'none';

            // Add form fields
            const nameField = document.createElement('input');
            nameField.type = 'hidden';
            nameField.name = FIELD_NAMES.name;
            nameField.value = name;
            tempForm.appendChild(nameField);

            const emailField = document.createElement('input');
            emailField.type = 'hidden';
            emailField.name = FIELD_NAMES.email;
            emailField.value = email;
            tempForm.appendChild(emailField);

            document.body.appendChild(tempForm);
            tempForm.submit();

            // Wait a bit then check if submission was successful
            setTimeout(() => {
                // Assume success (Google Forms doesn't provide easy success callbacks)
                showMessage('🎉 Success! You\'ve been added to our waitlist. We\'ll notify you soon!', 'success');
                waitlistForm.reset();
                document.body.removeChild(tempForm);
            }, 1000);

        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('❌ Something went wrong. Please try again later.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnContent.style.display = 'none';
            btnLoader.style.display = 'flex';
        } else {
            submitBtn.disabled = false;
            btnContent.style.display = 'flex';
            btnLoader.style.display = 'none';
        }
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message form-message-${type}`;
        formMessage.style.display = 'block';
        
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        if (type === 'success') {
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }
    }

    function hideMessage() {
        formMessage.style.display = 'none';
        formMessage.textContent = '';
    }
})();

// About Section Tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Show corresponding pane
                const tabId = btn.getAttribute('data-tab');
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
});
