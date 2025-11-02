document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (username === "admin" && password === "123") {
    // Save login info
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Invalid username or password.";
  }
});
