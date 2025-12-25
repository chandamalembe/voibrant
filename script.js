document.addEventListener('DOMContentLoaded', function () {
	const contactForm = document.getElementById('contactForm');
	const subscribeForm = document.getElementById('subscribeForm');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile menu on link click
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
    });
  });
			e.preventDefault();
			alert('Thanks! Your message has been received.');
			contactForm.reset();
		});
	}

	if (subscribeForm) {
		subscribeForm.addEventListener('submit', function (e) {
			e.preventDefault();
			alert('Thanks for subscribing!');
			subscribeForm.reset();
		});
	}
});

