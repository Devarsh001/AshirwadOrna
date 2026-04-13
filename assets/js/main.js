// /assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            const icon = mobileMenuButton.querySelector('i');

            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                if (icon) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                    icon.style.transform = 'rotate(90deg)';
                    setTimeout(() => icon.style.transform = 'rotate(0deg)', 50);
                }
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.style.overflow = ''; // Restore scrolling
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                    icon.style.transform = 'rotate(-90deg)';
                    setTimeout(() => icon.style.transform = 'rotate(0deg)', 50);
                }
            }
        });
    }

    // Set active nav link based on current page
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('text-brand-accent');
            link.classList.remove('text-slate-600', 'text-slate-900', 'hover:text-brand-accent');
        }
    });

    // Minimal and sophisticated scroll reveal
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Only reveal once
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        // Add varying animation delays for sequential revealing (optional refinement)
        revealElements.forEach((el, index) => {
            revealObserver.observe(el);
        });
    }
});
