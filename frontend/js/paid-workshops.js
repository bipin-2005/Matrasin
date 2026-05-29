/* ====================================
   PAID & COMMUNITY WORKSHOPS
==================================== */

/*
Future Admin Compatibility

This structure can later connect to:

- Database
- Admin Dashboard
- CRM
- Google Sheets
- Email Automation
*/

const workshopConfig = {

  workshopCategories: [
    "Corporate Wellness",
    "School Wellness",
    "College Lifestyle",
    "Women's Health",
    "Metabolic Health",
    "Performance & Fitness",
    "Community Wellness"
  ],

  organisationTypes: [
    "Corporate",
    "School",
    "College",
    "NGO",
    "Healthcare Organisation",
    "Community Group"
  ],

  deliveryModes: [
    "On-Site",
    "Virtual",
    "Hybrid"
  ]

};

/* ====================================
   WORKSHOP PAGE ANIMATIONS
==================================== */

const workshopAnimatedElements = document.querySelectorAll(
  '.workshop-card, .audience-card, .benefit-card, .format-card, .trust-card, .timeline-step, .enquiry-form'
);

if (workshopAnimatedElements.length > 0) {

  const workshopObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  }, {
    threshold: 0.15
  });

  workshopAnimatedElements.forEach((element) => {
    workshopObserver.observe(element);
  });

}

/* ====================================
   FORM HANDLING
==================================== */

const workshopForm = document.getElementById("workshopForm");

if (workshopForm) {

  const submitButton =
    workshopForm.querySelector('button[type="submit"]');

  const feedbackMessage =
    document.createElement("div");

  feedbackMessage.className = "form-message";

  workshopForm.appendChild(feedbackMessage);

  workshopForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName =
      workshopForm.querySelector('input[type="text"]');

    const email =
      workshopForm.querySelector('input[type="email"]');

    if (!fullName || !fullName.value.trim()) {

      showError(
        "Please enter your full name."
      );

      return;
    }

    if (!email || !email.value.trim()) {

      showError(
        "Please enter your email address."
      );

      return;
    }

    if (!validateEmail(email.value)) {

      showError(
        "Please enter a valid email address."
      );

      return;
    }

    startLoading();

    try {

      const formData =
        collectWorkshopData();

      console.log(
        "Workshop Enquiry:",
        formData
      );

      await fakeRequest();

      const isCommunityPage =
        window.location.pathname.includes(
          "free-community-workshops"
        );

      showSuccess(
        isCommunityPage
          ? "Thank you. Your community workshop request has been submitted successfully."
          : "Thank you. Your workshop enquiry has been submitted successfully."
      );

      workshopForm.reset();

    }

    catch (error) {

      console.error(error);

      showError(
        "Something went wrong. Please try again."
      );

    }

    finally {

      stopLoading();

    }

  });

  function collectWorkshopData() {

    const fields =
      workshopForm.querySelectorAll(
        "input, select, textarea"
      );

    const data = {};

    fields.forEach((field) => {

      const key =
        field.placeholder ||
        field.name ||
        field.id ||
        "field";

      data[key] = field.value;

    });

    /*
    Future Admin Fields

    data.leadStatus = "New";
    data.followUpStatus = "Pending";
    data.assignedTo = null;
    data.notes = "";
    data.createdAt = new Date();

    */

    return data;
  }

  function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  }

  function startLoading() {

    submitButton.disabled = true;

    submitButton.dataset.originalText =
      submitButton.textContent;

    submitButton.textContent =
      "Submitting...";

  }

  function stopLoading() {

    submitButton.disabled = false;

    submitButton.textContent =
      submitButton.dataset.originalText ||
      "Submit Enquiry";

  }

  function showSuccess(message) {

    feedbackMessage.className =
      "form-message success";

    feedbackMessage.textContent =
      message;

  }

  function showError(message) {

    feedbackMessage.className =
      "form-message error";

    feedbackMessage.textContent =
      message;

  }

}

/* ====================================
   DEMO REQUEST
==================================== */

function fakeRequest() {

  return new Promise((resolve) => {

    setTimeout(() => {

      resolve();

    }, 1500);

  });

}

/* ====================================
   BUTTON SCROLL BEHAVIOUR
==================================== */

const proposalButtons =
  document.querySelectorAll(".btn-outline");

proposalButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const targetSection =
      document.getElementById("book-workshop") ||
      document.getElementById("community-form");

    if (targetSection) {

      targetSection.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});

/* ====================================
   FUTURE ADMIN PLACEHOLDERS
==================================== */

/*

Future Modules

addWorkshop()
editWorkshop()
archiveWorkshop()

addTestimonial()
removeTestimonial()

manageEnquiries()

exportLeadsCSV()
exportLeadsExcel()

CRMIntegration()

GoogleSheetsSync()

EmailAutomation()

*/