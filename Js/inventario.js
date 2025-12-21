// ===============================
// OBTENER INVENTARIO
// ===============================
function obtenerInventario() {
    return JSON.parse(localStorage.getItem("inventario")) || [];
}

// ===============================
// GUARDAR INVENTARIO
// ===============================
function guardarInventario(productos) {
    localStorage.setItem("inventario", JSON.stringify(productos));
}

// ===============================
// CREAR PRODUCTO
// ===============================
function crearProducto(e) {
    e.preventDefault();

    const producto = document.getElementById("producto").value.trim();
    const cantidad = document.getElementById("cantidad").value.trim();
    const precio = document.getElementById("precio").value.trim();
    const error = document.getElementById("error");

    error.textContent = "";

    if (producto === "" || cantidad === "" || precio === "") {
        error.textContent = "Todos los campos son obligatorios";
        return;
    }

    if (cantidad <= 0 || precio <= 0) {
        error.textContent = "Cantidad y precio deben ser mayores a 0";
        return;
    }

    let inventario = obtenerInventario();

    inventario.push({
        id: Date.now(),
        producto,
        cantidad,
        precio
    });

    guardarInventario(inventario);

    alert("Producto guardado correctamente");
    window.location.href = "inventario.html";
}

// ===============================
// LISTAR INVENTARIO
// ===============================
function listarInventario() {
    const tbody = document.getElementById("tablaInventario");
    if (!tbody) return;

    const inventario = obtenerInventario();
    tbody.innerHTML = "";

    inventario.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.producto}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio}</td>
                <td class="acciones">
                <a href="inventarioEditar.html?id=${item.id}" class="btn editar">Editar</a>
                    <button class="btn eliminar" onclick="eliminarProducto(${item.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

// ===============================
// ELIMINAR (como PEDIDO)
// ===============================
function eliminarProducto(id) {
    if (!confirm("¿Desea eliminar este producto?")) return;

    let inventario = obtenerInventario();
    inventario = inventario.filter(p => p.id !== id);
    guardarInventario(inventario);
    listarInventario();
}

// ===============================
// CARGAR PARA EDITAR
// ===============================
function cargarProductoEditar() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const inventario = obtenerInventario();
    const producto = inventario.find(p => p.id == id);
    if (!producto) return;

    document.getElementById("id").value = producto.id;
    document.getElementById("producto").value = producto.producto;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("precio").value = producto.precio;
}

// ===============================
// ACTUALIZAR
// ===============================
function actualizarProducto(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const producto = document.getElementById("producto").value.trim();
    const cantidad = document.getElementById("cantidad").value.trim();
    const precio = document.getElementById("precio").value.trim();
    const error = document.getElementById("error");

    error.textContent = "";

    if (producto === "" || cantidad === "" || precio === "") {
        error.textContent = "Todos los campos son obligatorios";
        return;
    }

    let inventario = obtenerInventario();
    inventario = inventario.map(p =>
        p.id == id ? { id: Number(id), producto, cantidad, precio } : p
    );

    guardarInventario(inventario);
    window.location.href = "inventario.html";
}

// ===============================
document.addEventListener("DOMContentLoaded", () => {
    listarInventario();
    cargarProductoEditar();
});
