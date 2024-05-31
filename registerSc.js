document.addEventListener("DOMContentLoaded", function() {
    // Pemanggilan input 
    const registerForm = document.getElementById("registerForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // Menambahkan fungsi submit di tombol button
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Memanggil 
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();


        if (!username || !password) {
            alert("Masukkan input dengan benar!");
            return;
        }

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("You have successfully registered!");
        window.location.href = "login.html";
    });
});
