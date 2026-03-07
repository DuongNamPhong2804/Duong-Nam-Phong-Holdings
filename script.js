// Language Switcher
let currentLang = 'vi';

const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang !== currentLang) {
            switchLanguage(lang);
        }
    });
});

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update page title from meta title
    const metaTitle = document.getElementById('metaTitle');
    if (metaTitle) {
        const titleText = metaTitle.getAttribute(`data-${lang}`);
        if (titleText) {
            document.title = titleText;
        }
    }
    
    // Update all elements with language attributes
    const elements = document.querySelectorAll('[data-vi], [data-en]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Check if element is an input or textarea
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else if (el.tagName === 'META') {
                // Update meta tags content
                el.setAttribute('content', text);
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Update form placeholders
    const formInputs = document.querySelectorAll('[data-vi-placeholder], [data-en-placeholder]');
    formInputs.forEach(input => {
        const placeholder = input.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update Open Graph locale
    const ogLocale = document.getElementById('ogLocale');
    if (ogLocale) {
        ogLocale.setAttribute('content', lang === 'vi' ? 'vi_VN' : 'en_US');
    }
    
    // Update structured data
    updateStructuredData(lang);
    
    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Update structured data based on language
function updateStructuredData(lang) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Duong Nam Phong Holdings",
        "alternateName": "Duong Nam Phong® International Company",
        "url": "https://duongnamphong.com",
        "logo": "https://duongnamphong.com/images/Duong Nam Phong® Official Logo Since 2023.png",
        "description": lang === 'vi' 
            ? "Công ty công nghệ tiên phong cung cấp giải pháp số và dịch vụ công nghệ chất lượng cao"
            : "A pioneering technology company providing premium digital solutions and technology services",
        "foundingDate": "2022-10",
        "sameAs": [
            "https://licensezone.store",
            "https://zyxtron.com",
            "https://fb.com/DuongNamPhongHoldings",
            "https://x.com/DuongNamPhong28",
            "https://t.me/duongnamphong"
        ],
        "address": [
            {
                "@type": "PostalAddress",
                "streetAddress": "175 Lạc Long Quân, Phường Tây Hồ",
                "addressLocality": lang === 'vi' ? "Hà Nội" : "Hanoi",
                "addressCountry": "VN"
            },
            {
                "@type": "PostalAddress",
                "streetAddress": "121 Seaton Pl NW",
                "addressLocality": "Washington",
                "addressRegion": "DC",
                "postalCode": "20001",
                "addressCountry": "US"
            }
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84-345-280-410",
            "email": "support@duongnamphong.com",
            "contactType": lang === 'vi' ? "Dịch vụ Khách hàng" : "Customer Service",
            "availableLanguage": ["Vietnamese", "English"]
        }
    };
    
    // Update or create script tag
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (scriptTag) {
        scriptTag.textContent = JSON.stringify(structuredData, null, 2);
    }
}

// Load saved language preference
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        switchLanguage(savedLang);
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Change icon
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-card, .service-item, .brand-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading class removal after page load
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });
}

// Dynamic year for copyright
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
}

// Add hover effect sound (optional - commented out)
/*
const buttons = document.querySelectorAll('.btn, .brand-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        // Add sound effect here if needed
    });
});
*/

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--primary-color)';
            } else {
                navLink.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handlers
const debouncedHighlight = debounce(highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// Console welcome message
console.log('%c🚀 Duong Nam Phong Holdings', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cWebsite developed with ❤️', 'color: #7c3aed; font-size: 14px;');
console.log('%cVisit our brands:', 'color: #334155; font-size: 12px;');
console.log('%c- License Zone Store: https://licensezone.store', 'color: #10b981; font-size: 12px;');
console.log('%c- Zyxtron Proxy: https://zyxtron.com', 'color: #10b981; font-size: 12px;');