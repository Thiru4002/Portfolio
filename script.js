// Modern, Professional, Clean JavaScript — Optimized for Recruiters
// Minimal animations, no flashy effects, smooth & polished

// =============================================
// 🔹 Helper Functions
// =============================================
function smoothScrollTo(targetY) {
    window.scrollTo({ top: targetY, behavior: 'smooth' });
}

function debounce(func, delay = 20) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// =============================================
// 🔹 DOM Ready
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollButtons = document.querySelectorAll('[data-scroll]');

    // ---------------------------------------------
    // 🔹 Mobile Menu Toggle
    // ---------------------------------------------
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = navToggle.querySelectorAll('span');

            const active = navMenu.classList.contains('active');
            spans[0].style.transform = active ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = active ? '0' : '1';
            spans[2].style.transform = active ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

    // Close menu if clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) navMenu.classList.remove('active');
    });

    // ---------------------------------------------
    // 🔹 Smooth Navigation Link Scroll
    // ---------------------------------------------
    navLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) smoothScrollTo(target.offsetTop - 80);
    }));

    scrollButtons.forEach(btn => btn.addEventListener('click', () => {
        const target = document.getElementById(btn.getAttribute('data-scroll'));
        if (target) smoothScrollTo(target.offsetTop - 80);
    }));

    // ---------------------------------------------
    // 🔹 Update Active Nav Link on Scroll
    // ---------------------------------------------
    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 120;
        document.querySelectorAll('section[id]').forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', debounce(updateActiveNav, 20));
    updateActiveNav();

    // ---------------------------------------------
    // 🔹 Soft Scroll Animations (fade + slight slide)
    // ---------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.about-card, .skill-card, .project-card, .contact-card')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });

    // ---------------------------------------------
    // 🔹 Navbar Solid Background on Scroll
    // ---------------------------------------------
    const updateNavbarBg = () => {
        const navbar = document.querySelector('.navbar');
        navbar.style.background = window.scrollY > 50
            ? 'rgba(10,12,18,0.98)'
            : 'rgba(10,12,18,0.7)';
    };

    window.addEventListener('scroll', debounce(updateNavbarBg, 20));
    updateNavbarBg();

    // ---------------------------------------------
    // 🔹 Scroll-to-Top Button
    // ---------------------------------------------
    const topBtn = document.createElement('button');
    topBtn.textContent = '↑';
    topBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        background: var(--primary);
        color: black;
        font-size: 1.4rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        z-index: 900;
        transition: 0.3s ease;
        box-shadow: 0 0 20px rgba(0,0,0,0.35);
    `;

    document.body.appendChild(topBtn);
    topBtn.addEventListener('click', () => smoothScrollTo(0));

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            topBtn.style.opacity = '1';
            topBtn.style.visibility = 'visible';
        } else {
            topBtn.style.opacity = '0';
            topBtn.style.visibility = 'hidden';
        }
    });

    // ---------------------------------------------
    // 🔹 Subtle Professional Card Hover (NOT flashy)
    // ---------------------------------------------
    document.querySelectorAll('.skill-card, .project-card, .contact-link-content')
        .forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const tiltX = (y - 0.5) * -6;
                const tiltY = (x - 0.5) * 6;
                card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
            });
        });
});
