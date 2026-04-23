// ============================================
//  script.js — Gabriel Nunes Portfolio
// ============================================


// 1. NAVBAR: sombra ao rolar a página

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. NAVBAR: destaca o link da seção atual
//    conforme o usuário rola a página

const sections = document.querySelectorAll('header[id], section[id], footer[id]');
const navAnchors = document.querySelectorAll('.nav-links a, .mobile-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// 3. HAMBURGER MENU (menu mobile)
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

// 4. SCROLL REVEAL: anima elementos ao entrar na tela
//    Funciona em TODAS as seções

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.setProperty('--i', index);
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// 5. SKILL BADGES: animação em cascata
//    na seção "Sobre mim"

document.querySelectorAll('.skill-badge').forEach((badge, index) => {
    badge.style.transitionDelay = `${index * 60}ms`;
    badge.classList.add('reveal');
    observer.observe(badge);
});


// 6. SMOOTH SCROLL com offset da navbar

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 64;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});