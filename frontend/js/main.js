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

// CONSULTATION FORM SUCCESS

const consultationForm =
  document.getElementById("consultationForm");

if (consultationForm) {

  consultationForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const submitButton = consultationForm.querySelector('button[type="submit"]');
    const statusMessage = document.getElementById("consultationStatus");
    const formData = new FormData(consultationForm);
    const payload = Object.fromEntries(formData.entries());
    const endpoint = window.location.protocol === "file:"
      ? "http://localhost:5000/consultation"
      : "/consultation";

    if (statusMessage) {
      statusMessage.textContent = "";
      statusMessage.classList.remove("error");
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit consultation request.");
      }

      document
        .getElementById("successPopup")
        .classList.add("show");

      consultationForm.reset();
    } catch (error) {
      if (statusMessage) {
        statusMessage.textContent = error.message;
        statusMessage.classList.add("error");
      } else {
        alert(error.message);
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Book Consultation";
      }
    }

  });

}

const closePopup =
  document.getElementById("closePopup");

if (closePopup) {

  closePopup.addEventListener("click", function() {

    document
      .getElementById("successPopup")
      .classList.remove("show");

  });

}

