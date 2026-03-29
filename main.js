/**
 * Garden Cafe - Main Interactions
 * Includes Scroll Reveal, Navbar logic, and Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial hero animation
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text');
        if (heroText) heroText.classList.add('visible');
    }, 300);

    // Navbar Scrolled State
    const navbar = document.querySelector('#main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Reveals
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax Effect for Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
        }
    });

    // Form Interactions
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reservationForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Reserving...';
            btn.disabled = true;

            // Mock success
            setTimeout(() => {
                btn.innerText = 'Reservation Confirmed';
                btn.style.backgroundColor = '#84A98C'; // Sage Success
                reservationForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Zalo Plugin Visibility
    const zaloPlugin = document.querySelector('.zalo-plugin');
    if (zaloPlugin) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                zaloPlugin.style.opacity = '1';
                zaloPlugin.style.pointerEvents = 'auto';
                zaloPlugin.style.transform = 'translateY(0)';
            } else {
                zaloPlugin.style.opacity = '0';
                zaloPlugin.style.pointerEvents = 'none';
                zaloPlugin.style.transform = 'translateY(20px)';
            }
        });
        // Set initial state
        zaloPlugin.style.transition = 'all 0.5s ease';
        zaloPlugin.style.opacity = '0';
        zaloPlugin.style.transform = 'translateY(20px)';
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
