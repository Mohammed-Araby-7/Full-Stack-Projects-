document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // Quantity Increment / Decrement
  // ================================
  const minusBtn = document.querySelector(".minus");
  const plusBtn = document.querySelector(".plus");
  const qtyInput = document.querySelector("#quantity");

  plusBtn.addEventListener("click", () => {
    let current = parseInt(qtyInput.value);
    if (current < parseInt(qtyInput.max)) qtyInput.value = current + 1;
  });

  minusBtn.addEventListener("click", () => {
    let current = parseInt(qtyInput.value);
    if (current > parseInt(qtyInput.min)) qtyInput.value = current - 1;
  });

  // ================================
  // Tabs Section
  // ================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  document.getElementById("description").classList.add("active");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab");
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  // ================================
  // Add to Cart + Toast (No Redirect)
  // ================================
  const addToCartBtn = document.querySelector(".btn.btn-danger");
  const toast = document.getElementById("toast");

  addToCartBtn.addEventListener("click", function () {
    // ✅ Create unique ID per product (can be from name + random number)
    const uniqueId =
      document.querySelector(".dish-title").innerText
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase() +
      "-" +
      Date.now(); // ensure unique ID even if same product name

    const product = {
      id: uniqueId,
      name: document.querySelector(".dish-title").innerText.trim(),
      price: parseFloat(
        document.querySelector(".price").innerText.replace("$", "")
      ),
      image: document.querySelector(".big-img").src,
      quantity: parseInt(document.getElementById("quantity").value),
    };

    // Retrieve or initialize cart
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // ✅ Add new product always as a separate entry
    cart.push(product);

    // Save updated cart
    localStorage.setItem("cartItems", JSON.stringify(cart));

    // ✅ Show toast only when clicked
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  });
});
