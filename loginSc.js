document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");
  
      if (username === storedUsername && password === storedPassword) {
        alert("Login successful!");
        window.location.href = "homepage.html"; // Ganti dengan halaman yang sesuai setelah login berhasil
      } else {
        const signUp = confirm("Login failed. Click OK if you want to create a new account.");
  
        if (signUp == true) {
          window.location.href = "index.html";
        }
      }
    });
  });
  
