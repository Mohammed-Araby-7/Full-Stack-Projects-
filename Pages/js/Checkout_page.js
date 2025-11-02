
const API_URL = "https://68fa7361ef8b2e621e800728.mockapi.io/Orders/orders";

document.addEventListener("DOMContentLoaded", () => {
  const orderItems = document.getElementById("orderItems");
  const subtotalElem = document.getElementById("subtotal");
  const totalElem = document.getElementById("totalAmount");
  const placeOrderBtn = document.getElementById("placeOrder");
  const toastContainer = document.getElementById("toastContainer"); // 👈 make sure this exists in HTML

  // Load cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  let subtotal = 0;
  cart.forEach(item => {
    const totalPrice = item.price * item.quantity;
    subtotal += totalPrice;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name} × ${item.quantity}</td>
      <td>$${totalPrice.toFixed(2)}</td>
    `;
    orderItems.appendChild(row);
  });

  const flatRate = 5;
  const total = subtotal + flatRate;

  subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
  totalElem.textContent = `$${total.toFixed(2)}`;

  // ✅ Toast Function
  function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast-message");
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  placeOrderBtn.addEventListener("click", async () => {
  const form = document.getElementById("checkoutForm");

  // ✅ Validate form using browser validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const orderData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    country: document.getElementById("country").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    notes: document.getElementById("notes").value,
    paymentMethod: document.querySelector('input[name="payment"]:checked').value,
    products: cart,
    subtotal,
    total,
    status: "Pending",
    date: new Date().toISOString()
  };

  try {
    const response = await axios.post(API_URL, orderData);
    showToast("✅ Your order has been placed successfully and will be delivered in 20 minutes!");

    localStorage.removeItem("cartItems");
    setTimeout(() => window.location.href = "orderStatus.html", 2500);

  } catch (err) {
    console.error(err);
    showToast("❌ Failed to place order. Please try again.");
  }
});

});
