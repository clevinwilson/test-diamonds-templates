// Diamond Selection Form Handler
document.addEventListener("DOMContentLoaded", function () {
  // Navbar: transparent over hero, solid on scroll (Jeton-style)
  const navbar = document.getElementById("navbar");
  const hero = document.querySelector(".hero");
  function updateNavbar() {
    if (!navbar) return;
    const heroBottom = hero ? hero.offsetHeight : 400;
    if (window.scrollY > heroBottom * 0.15) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  // Hero video: ensure play (required on some mobile)
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.setAttribute("playsinline", "");
    const playPromise = heroVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {});
    }
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        navMenu.classList.contains("active")
      ) {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Close menu on window resize if it becomes desktop size
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  const diamondForm = document.getElementById("diamondForm");
  const contactForm = document.getElementById("contactForm");

  // Handle Diamond Selection Form
  if (diamondForm) {
    diamondForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const diamondType = document.getElementById("diamondType").value;
      const shape = document.getElementById("shape").value;
      const caratRange = document.getElementById("caratRange").value;
      const colour = document.getElementById("colour").value;
      const clarity = document.getElementById("clarity").value;
      const cut = document.getElementById("cut").value;
      const mobileNumber = document.getElementById("mobileNumber").value;

      if (!mobileNumber) {
        alert("Please enter your mobile number");
        return;
      }

      // Create WhatsApp message
      let message = `Hello SHRESTHA DIAMONDS,\n\nI would like to register and inquire about:\n\n`;
      message += `Diamond Type: ${diamondType || "Not specified"}\n`;
      message += `Shape: ${shape || "Not specified"}\n`;
      message += `Carat Range: ${caratRange || "Not specified"}\n`;
      message += `Colour: ${colour || "Not specified"}\n`;
      message += `Clarity: ${clarity || "Not specified"}\n`;
      message += `Cut: ${cut || "Not specified"}\n`;
      message += `Mobile: ${mobileNumber}`;

      // Encode message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "918904611111"; // India number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");
    });
  }

  // Handle Contact Form
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const sector = document.getElementById("sector").value;
      const country = document.getElementById("country").value;
      const countryCode = document.getElementById("countryCode").value;
      const mobile = document.getElementById("mobile").value;

      if (!name || !sector || !country || !mobile) {
        alert("Please fill in all required fields");
        return;
      }

      // Determine WhatsApp number based on country
      let whatsappNumber = "918904611111"; // Default to India
      if (country === "nepal") {
        whatsappNumber = "977"; // Nepal number (placeholder)
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
      window.open(whatsappUrl, "_blank");
    });
  }

  // Add smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add input validation for mobile numbers
  const mobileInputs = document.querySelectorAll('input[type="tel"]');
  mobileInputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      // Remove non-numeric characters
      this.value = this.value.replace(/[^0-9]/g, "");
    });
  });

  // Scroll Animation Observer - Jeton-style reveal
  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -80px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sectionRevealOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, sectionRevealOptions);

  const animatedElements = document.querySelectorAll(
    ".scroll-fade-in, .scroll-slide-in-left, .scroll-slide-in-right, .scroll-slide-in-up, .scroll-fade-in-delay, .scroll-scale-in",
  );
  animatedElements.forEach((el) => observer.observe(el));

  document.querySelectorAll(".section-reveal").forEach((el) => sectionObserver.observe(el));

  // Optional: subtle parallax on hero video (desktop only)
  if (hero && heroVideo && window.innerWidth > 768) {
    window.addEventListener(
      "scroll",
      function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop < hero.offsetHeight) {
          heroVideo.style.transform = `translateY(${scrollTop * 0.25}px) scale(1.05)`;
        }
      },
      { passive: true },
    );
  }

  // Add smooth reveal animation to gallery items on hover
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
});
