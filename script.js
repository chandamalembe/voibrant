document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const subscribeForm = document.getElementById("subscribeForm");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  const mobileLinks = mobileMenu?.querySelectorAll("a") ?? [];
  mobileLinks.forEach((link) =>
    link.addEventListener("click", () => mobileMenu.classList.add("hidden")),
  );

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !message) {
        alert("Please fill in name and message.");
        return;
      }

      const whatsappMessage = `Hello VoiBrant! My name is ${encodeURIComponent(name)}. %0A${encodeURIComponent(message)}`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=260975266088&text=${whatsappMessage}`;

      window.open(whatsappUrl, "_blank");

      alert(
        "Opening WhatsApp with your message. Please send it to complete your inquiry.",
      );
      contactForm.reset();
    });
  }

  // Setup marquee: duplicate items for seamless scroll
  document.querySelectorAll(".marquee-track").forEach((track) => {
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));

    // Pause on hover
    track.addEventListener("mouseenter", () => track.classList.add("paused"));
    track.addEventListener("mouseleave", () =>
      track.classList.remove("paused"),
    );

    // set a duration based on total width for a nicer speed feel
    const totalWidth = track.scrollWidth;
    const seconds = Math.max(18, Math.round(totalWidth / 160));
    track.style.animationDuration = `${seconds}s`;
  });

  // Intersection observer to add 'in-view' class for vibrancy on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.18 },
  );

  document
    .querySelectorAll("#about, #services, #contact")
    .forEach((el) => io.observe(el));

  // Subtle interactive parallax on marquee images
  document.querySelectorAll(".marquee-item img").forEach((img) => {
    img.addEventListener("mousemove", (e) => {
      const r = img.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      img.style.transform = `translateY(-6px) scale(1.04) translateX(${
        (x - 0.5) * 8
      }px)`;
    });
    img.addEventListener("mouseleave", () => (img.style.transform = ""));
  });

  // Smooth scrolling for in-page links with ease-in-out acceleration
  const topNav = document.querySelector("nav");
  const navOffset = topNav ? topNav.offsetHeight : 0;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    return new Promise((resolve) => {
      function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = easeInOutCubic(t);
        window.scrollTo(0, Math.round(startY + distance * eased));
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;
    const hash = a.getAttribute("href");
    if (!hash || hash === "#") return;
    const targetEl = document.querySelector(hash);
    if (!targetEl) return;
    e.preventDefault();

    const rect = targetEl.getBoundingClientRect();
    const start = window.scrollY || window.pageYOffset;
    const targetY = Math.max(0, start + rect.top - navOffset - 12);
    const distance = Math.abs(targetY - start);
    const duration = Math.min(1400 + distance * 0.25, 2400);

    smoothScrollTo(targetY, duration).then(() => {
      try {
        history.pushState(null, "", hash);
      } catch (err) {
        location.hash = hash;
      }
      const mobileMenu = document.getElementById("mobileMenu");
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Back-to-top button: appear when scrolling up or at bottom
  const backBtn = document.getElementById("backToTopBtn");
  if (backBtn) {
    let lastY = window.scrollY || window.pageYOffset;
    let ticking = false;

    function updateBackBtn() {
      const currentY = window.scrollY || window.pageYOffset;
      const atBottom =
        window.innerHeight + currentY >=
        document.documentElement.scrollHeight - 6;
      const scrollingUp = currentY < lastY && currentY > 120;
      if (scrollingUp || atBottom) backBtn.classList.add("visible");
      else backBtn.classList.remove("visible");
      lastY = currentY;
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateBackBtn);
        ticking = true;
      }
    });

    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScrollTo(0, 900);
    });
  }

  // Hide/show nav on scroll
  let lastScrollTop = 0;
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down and past 100px
      nav.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      nav.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});
