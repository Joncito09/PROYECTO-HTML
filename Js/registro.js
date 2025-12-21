document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password2 = document.getElementById("password2").value.trim();

    if (nombre === "" || email === "" || password === "" || password2 === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    if (password !== password2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Guardar datos (simulación de BD)
    localStorage.setItem("usuarioEmail", email);
    localStorage.setItem("usuarioPassword", password);

    alert("Registro exitoso. Ahora puedes iniciar sesión");
    window.location.href = "login.html";
});
