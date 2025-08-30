/* Highlight section in the header user in on */
// Get all sections that have an id defined
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

// Function to handle highlighting active nav link on scroll
function highlightNavLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // Adjust for header height
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Function to handle the mobile menu toggle
function toggleMobileMenu() {
  navbar.classList.toggle("active");
  menuIcon.classList.toggle("bx-x"); // Changes hamburger icon to 'X'
}

// Event listener for mobile menu click
menuIcon.addEventListener("click", toggleMobileMenu);

// Event listener for nav link clicks (closes menu on mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbar.classList.contains("active")) {
      toggleMobileMenu();
    }
  });
});

window.addEventListener("scroll", highlightNavLink);
highlightNavLink(); // Initial call to highlight the current section on page load

/* Contact form error message */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const toastContainer = document.getElementById("toast-container");

  // Function to create and display a toast notification
  function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast-message");
    toast.innerHTML = `<i class='bx bxs-error-circle'></i><span>${message}</span>`; // Boxicon warning symbol
    toastContainer.appendChild(toast);

    // Trigger reflow to apply transition
    void toast.offsetWidth; // Force repaint
    toast.classList.add("show");

    // Automatically hide toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 5000);
  }

  // Validate a single field
  function validateField(inputElement, customMessage) {
    if (inputElement.value.trim() === "") {
      showToast(customMessage);
      return false;
    }
    if (inputElement.id === "email" && !inputElement.value.includes("@")) {
      showToast("Please enter a valid email address.");
      return false;
    }
    return true;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default browser submission

    let isValidForm = true;

    // Validate all fields on submission
    // Note: Validation order matters for toast messages
    if (!validateField(nameInput, "Name is required.")) isValidForm = false;
    if (!validateField(emailInput, "Email is required.")) isValidForm = false;
    if (!validateField(subjectInput, "Subject is required."))
      isValidForm = false;
    if (!validateField(messageInput, "Message is required."))
      isValidForm = false;

    if (isValidForm) {
      // If all fields are valid, submit the form programmatically
      contactForm.submit();
    }
  });
});
