/* ===============================
   CREAR USUARIO (CRUD)
================================ */
function crearUsuario() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const rol = document.getElementById("rol").value;
    const password = document.getElementById("password").value;

    if (!nombre || !email || !password) {
        alert("Complete todos los campos");
        return false;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push({
        id: Date.now(),
        nombre,
        email,
        password,
        rol
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario creado correctamente");

    window.location.href = "usuario.html";
    return false;
}

/* ===============================
   LISTAR USUARIOS
================================ */
function listarUsuarios() {
    const tabla = document.getElementById("tablaUsuarios");
    if (!tabla) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    tabla.innerHTML = "";

    usuarios.forEach(u => {
        tabla.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>${u.rol}</td>
                <td>
                    <a href="usuarioEditar.html?id=${u.id}" class="btn editar">Editar</a>
                    <a href="usuarioEliminar.html?id=${u.id}" class="btn eliminar">Eliminar</a>
                </td>
            </tr>
        `;
    });
}

/* ===============================
   EDITAR USUARIO
================================ */
function cargarUsuarioEditar() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.id == id);

    if (!usuario) return;

    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("email").value = usuario.email;
    document.getElementById("rol").value = usuario.rol;
}

function actualizarUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios = usuarios.map(u => {
        if (u.id == id) {
            u.nombre = document.getElementById("nombre").value;
            u.email = document.getElementById("email").value;
            u.rol = document.getElementById("rol").value;
        }
        return u;
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario actualizado");

    window.location.href = "usuario.html";
    return false;
}

/* ===============================
   ELIMINAR USUARIO
================================ */
function cargarUsuarioEliminar() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.id == id);

    if (!usuario) return;

    document.getElementById("nombreUsuario").textContent = usuario.nombre;
    document.getElementById("emailUsuario").textContent = usuario.email;
    document.getElementById("rolUsuario").textContent = usuario.rol;
}

function eliminarUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios = usuarios.filter(u => u.id != id);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario eliminado");

    window.location.href = "usuario.html";
}