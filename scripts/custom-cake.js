/* Custom Cake Calculator for North Star Bakery v0.1 */

/* Initialize Constants */
const cakePrices = {
  6: 30,
  8: 45,
  10: 65
};

const extraPrices = {
  flavors: {
    vanilla: 0,
    chocolate: 0,
    "red-velvet": 5
  },
  frostings: {
    vanilla: 0,
    chocolate: 0,
    "cream-cheese": 5
  }
};

/* Calculate Price based on form inputs */
function calculatePrice() {
  const size = document.getElementById("cake-size").value;
  const flavor = document.getElementById("cake-flavor").value;
  const frosting = document.getElementById("cake-frosting").value;
  const quantity = Number(document.getElementById("cake-quantity").value);

  const basePrice = cakePrices[size];
  const flavorPrice = extraPrices.flavors[flavor];
  const frostingPrice = extraPrices.frostings[frosting];

  return (basePrice + flavorPrice + frostingPrice) * quantity;
}

/* Update Estimate */
function updateEstimate() {
  const total = calculatePrice();
  const output = document.getElementById("cake-total");
  const quantityInput = document.getElementById("cake-quantity");
  const quantityError = document.getElementById("error-cake-quantity");

  if (!quantityInput.checkValidity()) {
    quantityError.textContent = "Enter a quantity between 1 and 5";
    return;
  } else {
    quantityError.textContent = "";
  }

  output.textContent = `$${total.toFixed(2)}`;
}

/* Save Cake Configuration */
function saveConfiguration() {
  const configuration = {
    name: document.getElementById("cake-name").value.trim(),
    size: document.getElementById("cake-size").value,
    flavor: document.getElementById("cake-flavor").value,
    frosting: document.getElementById("cake-frosting").value,
    quantity: Number(document.getElementById("cake-quantity").value)
  };

  /* Validate cake quantity */
  const quantityInput = document.getElementById("cake-quantity");

  if (!quantityInput.checkValidity()) {
    quantityInput.reportValidity();
    return;
  }

  localStorage.setItem("savedCake", JSON.stringify(configuration));

  document.getElementById("cake-intro-message").textContent = "";

  const message = configuration.name
    ? `"${configuration.name}" has been saved!`
    : "Your cake configuration has been saved!";

  document.getElementById("cake-save-message").textContent = message;
}

/* Load Previous Cake Configuration */

function loadConfiguration() {
  const savedCake = localStorage.getItem("savedCake");

  if (!savedCake) {
    return;
  }

  const configuration = JSON.parse(savedCake);

  document.getElementById("cake-name").value = configuration.name || "";
  document.getElementById("cake-size").value = configuration.size;
  document.getElementById("cake-flavor").value = configuration.flavor;
  document.getElementById("cake-frosting").value = configuration.frosting;
  document.getElementById("cake-quantity").value = configuration.quantity;

  updateEstimate();

  document.getElementById("cake-intro-message").textContent =
    configuration.name
      ? `Loaded your saved cake: "${configuration.name}"`
      : "Your saved cake configuration has been loaded.";
}

/* Clear Cake Configuration */
function clearConfiguration() {
  localStorage.removeItem("savedCake");

  document.getElementById("cake-form").reset();

  updateEstimate();

  document.getElementById("cake-intro-message").textContent = "";
  document.getElementById("cake-save-message").textContent =
    "Your saved cake has been cleared.";
}


/* Connect to calculator page */
const cakeForm = document.getElementById("cake-form");

cakeForm.addEventListener("input", updateEstimate);
document.getElementById("save-cake").addEventListener("click", saveConfiguration);
document.getElementById("cake-quantity").addEventListener("blur", updateEstimate);
document.getElementById("clear-cake").addEventListener("click", clearConfiguration);

loadConfiguration();
updateEstimate();