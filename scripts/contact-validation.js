/* Validate North Star Bakery contact form */

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);

  error.textContent = message;
  field.setAttribute("aria-invalid", "true");
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);

  error.textContent = "";
  field.removeAttribute("aria-invalid");
}


function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  let message = "";

  switch (fieldId) {
    case "name":
      if (value.length < 2) {
        message = "Please enter your name (at least 2 characters).";
      }
      break;

    case "email":
      if (!field.validity.valid || !value) {
        message = "Please enter a valid email address.";
      }
      break;

    case "item-details":
      if (value.length < 10) {
        message = "Please provide at least 10 characters describing your request.";
      }
      break;
    case "request-type":
      if (!value) {
        message = "Please select a request type.";
      }
      break;
  }

  if (message) {
    showError(fieldId, message);
    return false;
  }

  clearError(fieldId);
  return true;
}


const contactForm = document.getElementById("contact-form");
const fieldsToValidate = ["name", "email", "item-details", "request-type"];

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  fieldsToValidate.forEach(function (fieldId) {
    if (!validateField(fieldId)) {
      isValid = false;
    }
  });

  if (isValid) {
    alert("Your request is ready! This is a demo form, so nothing was sent.");
  }
});

fieldsToValidate.forEach(function (fieldId) {
  const field = document.getElementById(fieldId);

  field.addEventListener("blur", function () {
    validateField(fieldId);
  });

  field.addEventListener("input", function () {
    if (field.getAttribute("aria-invalid") === "true") {
      validateField(fieldId);
    }
  });
  field.addEventListener("change", function () {
    validateField(fieldId);
  });
});

