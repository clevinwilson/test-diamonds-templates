/**
 * SHRESTHA DIAMONDS - Main Application Script
 * ------------------------------------------
 * Modules: Navbar, Hero, MobileMenu, Forms, SmoothScroll, ScrollReveal
 */

(function () {
    "use strict";

    const BREAKPOINT_MOBILE = 768;

    /**
     * Navbar: add/remove 'scrolled' based on scroll position (transparent over hero).
     */
    function initNavbar() {
        const navbar = document.getElementById("navbar");
        const hero = document.querySelector(".hero");
        if (!navbar) return;

        function updateNavbar() {
            const heroHeight = hero ? hero.offsetHeight : 400;
            const threshold =
                heroHeight * (CONFIG?.scroll?.navbarThreshold ?? 0.15);
            navbar.classList.toggle("scrolled", window.scrollY > threshold);
        }

        window.addEventListener("scroll", updateNavbar, { passive: true });
        updateNavbar();
    }

    /**
     * Hero: ensure video plays on mobile (muted, playsinline).
     * Optional parallax on desktop.
     */
    function initHero() {
        const hero = document.querySelector(".hero");
        const heroVideo = document.querySelector(".hero-video");
        if (!heroVideo) return;

        heroVideo.muted = true;
        heroVideo.setAttribute("playsinline", "");
        heroVideo.play().catch(() => {});

        if (hero && window.innerWidth > BREAKPOINT_MOBILE) {
            window.addEventListener(
                "scroll",
                () => {
                    const scrollTop =
                        window.pageYOffset ||
                        document.documentElement.scrollTop;
                    if (scrollTop < hero.offsetHeight) {
                        heroVideo.style.transform = `translateY(${scrollTop * 0.25}px) scale(1.05)`;
                    }
                },
                { passive: true },
            );
        }
    }

    /**
     * Mobile menu: toggle drawer, close on link click / outside click / resize.
     */
    function initMobileMenu() {
        const toggle = document.querySelector(".mobile-menu-toggle");
        const menu = document.querySelector(".nav-menu");
        const links = document.querySelectorAll(".nav-menu a");
        if (!toggle || !menu) return;

        function closeMenu() {
            toggle.classList.remove("active");
            menu.classList.remove("active");
            document.body.style.overflow = "";
        }

        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
            menu.classList.toggle("active");
            document.body.style.overflow = menu.classList.contains("active")
                ? "hidden"
                : "";
        });

        links.forEach((link) => link.addEventListener("click", closeMenu));

        document.addEventListener("click", (e) => {
            if (
                !menu.contains(e.target) &&
                !toggle.contains(e.target) &&
                menu.classList.contains("active")
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (
                window.innerWidth > BREAKPOINT_MOBILE &&
                menu.classList.contains("active")
            )
                closeMenu();
        });
    }

    /**
     * Build WhatsApp URL and open in new tab.
     */
    function openWhatsApp(number, text) {
        const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    }

    /**
     * Diamond selection form: collect fields and send via WhatsApp.
     */
    function initDiamondForm() {
        const form = document.getElementById("diamondForm");
        if (!form) return;

        const whatsappNumber =
            typeof CONFIG !== "undefined" && CONFIG.whatsapp
                ? CONFIG.whatsapp.india
                : "918904611111";

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const mobileNumber = document
                .getElementById("mobileNumber")
                ?.value?.trim();
            if (!mobileNumber) {
                alert("Please enter your mobile number");
                return;
            }

            const get = (id) =>
                document.getElementById(id)?.value || "Not specified";
            const message = [
                "Hello SHRESTHA DIAMONDS,",
                "",
                "I would like to register and inquire about:",
                "",
                `Diamond Type: ${get("diamondType")}`,
                `Shape: ${get("shape")}`,
                `Carat Range: ${get("caratRange")}`,
                `Colour: ${get("colour")}`,
                `Clarity: ${get("clarity")}`,
                `Cut: ${get("cut")}`,
                `Mobile: ${mobileNumber}`,
            ].join("\n");

            openWhatsApp(whatsappNumber, message);
        });
    }

    /**
     * Contact form: validate and send via WhatsApp.
     */
    function initContactForm() {
        const form = document.getElementById("contactForm");
        if (!form) return;

        const whatsappIndia =
            typeof CONFIG !== "undefined" && CONFIG.whatsapp
                ? CONFIG.whatsapp.india
                : "918904611111";
        const whatsappNepal =
            typeof CONFIG !== "undefined" && CONFIG.whatsapp
                ? CONFIG.whatsapp.nepal
                : "977";

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name")?.value?.trim();
            const sector = document.getElementById("sector")?.value?.trim();
            const country = document.getElementById("country")?.value?.trim();
            const countryCode =
                document.getElementById("countryCode")?.value?.trim() || "";
            const mobile = document.getElementById("mobile")?.value?.trim();

            if (!name || !sector || !country || !mobile) {
                alert("Please fill in all required fields");
                return;
            }

            const number = country === "nepal" ? whatsappNepal : whatsappIndia;
            const message = [
                "Hello SHRESTHA DIAMONDS,",
                "",
                "Contact Inquiry:",
                "",
                `Name: ${name}`,
                `Sector: ${sector}`,
                `Country: ${country}`,
                `Mobile: ${countryCode} ${mobile}`,
            ].join("\n");

            openWhatsApp(number, message);
        });
    }

    /**
     * Smooth scroll for in-page anchor links.
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                const href = this.getAttribute("href");
                if (href === "#") return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        });
    }

    /**
     * Tel inputs: allow only digits.
     */
    function initTelValidation() {
        document.querySelectorAll('input[type="tel"]').forEach((input) => {
            input.addEventListener("input", function () {
                this.value = this.value.replace(/\D/g, "");
            });
        });
    }

    /**
     * Scroll reveal: add .animate / .revealed when elements enter viewport.
     */
    function initScrollReveal() {
        const opts =
            typeof CONFIG !== "undefined" && CONFIG.scroll ? CONFIG.scroll : {};
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: opts.observerThreshold ?? 0.08,
                rootMargin: opts.observerRootMargin ?? "0px 0px -80px 0px",
            },
        );

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        sectionObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: opts.sectionThreshold ?? 0.12,
                rootMargin: opts.sectionRootMargin ?? "0px 0px -60px 0px",
            },
        );

        const animatedSelectors =
            ".scroll-fade-in, .scroll-slide-in-left, .scroll-slide-in-right, .scroll-slide-in-up, .scroll-fade-in-delay, .scroll-scale-in";
        document
            .querySelectorAll(animatedSelectors)
            .forEach((el) => observer.observe(el));
        document
            .querySelectorAll(".section-reveal")
            .forEach((el) => sectionObserver.observe(el));
    }

    /**
     * Gallery: staggered transition delay for hover effect.
     */
    function initGalleryDelays() {
        document.querySelectorAll(".gallery-item").forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    /**
     * Bootstrap all modules when DOM is ready.
     */
    function init() {
        initNavbar();
        initHero();
        initMobileMenu();
        initDiamondForm();
        initContactForm();
        initSmoothScroll();
        initTelValidation();
        initScrollReveal();
        initGalleryDelays();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
