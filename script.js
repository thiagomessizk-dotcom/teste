// SuitCake - Interação e Animações

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initHamburgerMenu();
    initSmoothScroll();
    initScrollAnimations();
    highlightCurrentSection();
});

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 24);
        highlightCurrentSection();
    });
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('open');
        this.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(event) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initScrollAnimations() {
    const fadeItems = document.querySelectorAll('.fade-item, .theme-card, .module-card, .info-card, .step-card, .hero-card');
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeItems.forEach(item => observer.observe(item));
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 130;

    sections.forEach(section => {
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href*="${id}"]`);
        if (!link) return;

        if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function addButtonFeedback() {
    document.addEventListener('pointerdown', function(event) {
        const target = event.target.closest('.btn');
        if (!target) return;

        target.style.transform = 'scale(0.98)';
        setTimeout(() => {
            target.style.transform = '';
        }, 120);
    });
}

addButtonFeedback();

