const API_URL = "https://68fa7361ef8b2e621e800728.mockapi.io/Orders/orders"; // same as checkout API

const tableBody = document.querySelector("#ordersTable tbody");
const refreshBtn = document.getElementById("refreshBtn");

// Load Orders
async function loadOrders() {
  tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">Loading...</td></tr>`;

  try {
    const res = await axios.get(API_URL);
    const orders = res.data;

    if (orders.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No orders found.</td></tr>`;
      return;
    }

    // Clear previous data
    tableBody.innerHTML = "";

    // Fill table with data
    orders.forEach(order => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${order.id}</td>
        <td>${order.firstName} ${order.lastName}</td>
        <td>${order.phone}</td>
        <td>${order.email}</td>
        <td>${order.city}</td>
        <td>$${order.total}</td>
        <td><span class="status ${order.status.toLowerCase()}">${order.status}</span></td>
        <td>${new Date(order.date).toLocaleString()}</td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:red;">Failed to load orders.</td></tr>`;
  }
}

// Event: Refresh Button
refreshBtn.addEventListener("click", loadOrders);

// Initial Load
loadOrders();
