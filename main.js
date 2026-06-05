document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // Add reveal class to sections and cards
    const revealElements = document.querySelectorAll('.section-header, .project-card, .timeline-item, .skill-category, .stat-card');
    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Form submission handling (Prevent default for demo)
    const contactForm = document.getElementById('portfolio-contact');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message, Divyesh will get back to you soon!');
            contactForm.reset();
        });
    }

    // Dynamic Navigation Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

// Add these styles dynamically for reveal effect
const style = document.createElement('style');
style.textContent = `
    .reveal-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal-visible {
        opacity: 1;
        transform: translateY(0);
    }
    .cursor-dot {
        width: 8px;
        height: 8px;
        background-color: var(--accent-primary);
        position: fixed;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
    }
    .cursor-outline {
        width: 30px;
        height: 30px;
        border: 2px solid var(--accent-primary);
        position: fixed;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        z-index: 9998;
        pointer-events: none;
        transition: width 0.3s, height 0.3s;
    }
    .nav-links a.active {
        color: var(--accent-primary);
        font-weight: 600;
    }
`;
document.head.appendChild(style);
