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
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"))
  );

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thanks! Your message has been received.");
      contactForm.reset();
    });
  }

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thanks for subscribing!");
      subscribeForm.reset();
    });
  }

  // Setup marquee: duplicate items for seamless scroll
  document.querySelectorAll(".marquee-track").forEach((track) => {
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));

    // Pause on hover
    track.addEventListener("mouseenter", () => track.classList.add("paused"));
    track.addEventListener("mouseleave", () =>
      track.classList.remove("paused")
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
    { threshold: 0.18 }
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
});
