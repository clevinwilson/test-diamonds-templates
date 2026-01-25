// Diamond Selection Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on window resize if it becomes desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    const diamondForm = document.getElementById('diamondForm');
    const contactForm = document.getElementById('contactForm');

    // Handle Diamond Selection Form
    if (diamondForm) {
        diamondForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const diamondType = document.getElementById('diamondType').value;
            const shape = document.getElementById('shape').value;
            const caratRange = document.getElementById('caratRange').value;
            const colour = document.getElementById('colour').value;
            const clarity = document.getElementById('clarity').value;
            const cut = document.getElementById('cut').value;
            const mobileNumber = document.getElementById('mobileNumber').value;

            if (!mobileNumber) {
                alert('Please enter your mobile number');
                return;
            }

            // Create WhatsApp message
            let message = `Hello SHRESTHA DIAMONDS,\n\nI would like to register and inquire about:\n\n`;
            message += `Diamond Type: ${diamondType || 'Not specified'}\n`;
            message += `Shape: ${shape || 'Not specified'}\n`;
            message += `Carat Range: ${caratRange || 'Not specified'}\n`;
            message += `Colour: ${colour || 'Not specified'}\n`;
            message += `Clarity: ${clarity || 'Not specified'}\n`;
            message += `Cut: ${cut || 'Not specified'}\n`;
            message += `Mobile: ${mobileNumber}`;

            // Encode message for WhatsApp URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = '918904611111'; // India number
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }

    // Handle Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const sector = document.getElementById('sector').value;
            const country = document.getElementById('country').value;
            const countryCode = document.getElementById('countryCode').value;
            const mobile = document.getElementById('mobile').value;

            if (!name || !sector || !country || !mobile) {
                alert('Please fill in all required fields');
                return;
            }

            // Determine WhatsApp number based on country
            let whatsappNumber = '918904611111'; // Default to India
            if (country === 'nepal') {
                whatsappNumber = '977'; // Nepal number (placeholder)
            }

            // Create WhatsApp message
            let message = `Hello SHRESTHA DIAMONDS,\n\nContact Inquiry:\n\n`;
            message += `Name: ${name}\n`;
            message += `Sector: ${sector}\n`;
            message += `Country: ${country}\n`;
            message += `Mobile: ${countryCode} ${mobile}`;

            // Encode message for WhatsApp URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }

    // Add smooth scroll behavior for anchor links
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

    // Add input validation for mobile numbers
    const mobileInputs = document.querySelectorAll('input[type="tel"]');
    mobileInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove non-numeric characters
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optional: Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-slide-in-left, .scroll-slide-in-right, .scroll-slide-in-up, .scroll-fade-in-delay, .scroll-scale-in'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax effect for hero section (disabled on mobile for performance)
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop < hero.offsetHeight) {
                const parallaxSpeed = 0.5;
                heroImage.style.transform = `translateY(${scrollTop * parallaxSpeed}px) scale(1.1)`;
            }
        }, { passive: true });
    }

    // Add smooth reveal animation to gallery items on hover
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});
