// LOGIN VALIDACIONES
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailGuardado = localStorage.getItem("usuarioEmail");
    const passwordGuardado = localStorage.getItem("usuarioPassword");

    if (email === "" || password === "") {
        alert("Completa todos los campos");
        return;
    }

    if (email === emailGuardado && password === passwordGuardado) {
        alert("Inicio de sesión exitoso");
        window.location.href = "dashboard.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
});
