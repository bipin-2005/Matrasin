// SCROLL ANIMATION
const animatedElements = document.querySelectorAll(
  '.hero-card, .stage-card, .plan-card, .section-head, .cta, .workshop-card, .audience-card, .benefit-card, .format-card, .trust-card, .timeline-step, .enquiry-form'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

animatedElements.forEach((el) => {
  observer.observe(el);
});


// MOBILE NAVBAR

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});


// PAGE FADE-IN

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


// PAGE FADE-OUT

document.querySelectorAll("a").forEach(link => {

  if (
    link.hostname === window.location.hostname &&
    !link.href.includes("#")
  ) {

    link.addEventListener("click", (e) => {

      e.preventDefault();

      document.body.classList.remove("loaded");

      setTimeout(() => {
        window.location.href = link.href;
      }, 350);

    });

  }

});

