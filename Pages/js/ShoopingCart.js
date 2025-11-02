document.addEventListener("DOMContentLoaded", () => {
  const cartTable = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const toastContainer = document.querySelector(".toast-container");

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Show Bootstrap Toast
  function showToast(message, type = "success") {
    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center text-bg-${type} border-0 show mb-2`;
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    toastContainer.appendChild(toastEl);
    setTimeout(() => toastEl.remove(), 2000);
  }

  // Render Cart
  function renderCart() {
    cartTable.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
      cartTable.innerHTML = `<tr><td colspan="6" class="text-center py-5 text-muted">Your cart is empty</td></tr>`;
      subtotalEl.textContent = totalEl.textContent = "0.00";
      return;
    }

    cart.forEach((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>
          <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
        </td>
        <td>${itemSubtotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger remove-btn" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      cartTable.appendChild(row);
    });

    subtotalEl.textContent = subtotal.toFixed(2);
    totalEl.textContent = subtotal.toFixed(2);
  }

  // Update Local Storage
  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  // Quantity Update
  cartTable.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const index = btn.dataset.index;
    const action = btn.dataset.action;

    if (action === "increase") {
      cart[index].quantity++;
      showToast(`${cart[index].name} quantity increased`, "primary");
    } else if (action === "decrease") {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        showToast(`${cart[index].name} quantity decreased`, "info");
      } else {
        showToast(`Minimum quantity reached`, "warning");
      }
    }

    saveCart();
    renderCart();
  });

  // Delete Item
  cartTable.addEventListener("click", (e) => {
    if (e.target.closest(".remove-btn")) {
      const index = e.target.closest(".remove-btn").dataset.index;
      const itemName = cart[index].name;
      cart.splice(index, 1);
      saveCart();
      renderCart();
      showToast(`${itemName} removed from cart`, "danger");
    }
  });

  // Proceed to Checkout
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Cart is empty. Add products first!", "warning");
      return;
    }
    localStorage.setItem("checkoutData", JSON.stringify(cart));
    showToast("Proceeding to checkout...", "success");
    setTimeout(() => {
      window.location.href = "CheckOut_page.html";
    }, 1500);
  });

  renderCart();
});
