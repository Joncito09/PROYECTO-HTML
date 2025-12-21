// ===============================
// OBTENER PEDIDOS
// ===============================
function obtenerPedidos() {
    const pedidos = localStorage.getItem("pedidos");
    return pedidos ? JSON.parse(pedidos) : [];
}

// ===============================
// GUARDAR PEDIDOS
// ===============================
function guardarPedidos(pedidos) {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// ===============================
// VALIDAR PEDIDO
// ===============================
function validarPedido(cliente, fecha, total) {
    if (cliente.trim() === "") {
        return "El nombre del cliente es obligatorio.";
    }

    if (fecha === "") {
        return "Debe seleccionar una fecha.";
    }

    if (total === "" || total <= 0) {
        return "El total debe ser mayor a 0.";
    }

    return "";
}

// LISTAR PEDIDOS (READ)
function listarPedidos() {
    const tabla = document.getElementById("tablaPedidos");
    if (!tabla) return;

    tabla.innerHTML = "";
    const pedidos = obtenerPedidos();

    pedidos.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.cliente}</td>
                <td>${p.fecha}</td>
                <td>$${p.total}</td>
                <td>
                    <a href="pedidosEditar.html?id=${p.id}" class="btn editar">Editar</a>
                    <button onclick="eliminarPedido(${p.id})" class="btn eliminar">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// CREAR PEDIDO
function crearPedido(e) {
    e.preventDefault();

    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;
    const total = document.getElementById("total").value;
    const errorHTML = document.getElementById("error");

    const error = validarPedido(cliente, fecha, total);

    if (error !== "") {
        errorHTML.textContent = error;
        return;
    }

    const pedidos = obtenerPedidos();

    pedidos.push({
        id: Date.now(),
        cliente,
        fecha,
        total
    });

    guardarPedidos(pedidos);
    window.location.href = "pedidos.html";
}

// CARGAR DATOS EN EDITAR
function cargarPedidoEditar() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const pedidos = obtenerPedidos();
    const pedido = pedidos.find(p => p.id == id);

    if (pedido) {
        document.getElementById("pedidoId").value = pedido.id;
        document.getElementById("cliente").value = pedido.cliente;
        document.getElementById("fecha").value = pedido.fecha;
        document.getElementById("total").value = pedido.total;
    }
}

// ACTUALIZAR PEDIDO
function actualizarPedido(e) {
    e.preventDefault();

    const id = document.getElementById("pedidoId").value;
    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;
    const total = document.getElementById("total").value;
    const errorHTML = document.getElementById("error");

    const error = validarPedido(cliente, fecha, total);

    if (error !== "") {
        errorHTML.textContent = error;
        return;
    }

    const pedidos = obtenerPedidos();
    const index = pedidos.findIndex(p => p.id == id);

    pedidos[index] = { id, cliente, fecha, total };

    guardarPedidos(pedidos);
    window.location.href = "pedidos.html";
}


// ELIMINAR PEDIDO
function eliminarPedido(id) {
    if (!confirm("¿Desea eliminar este pedido?")) return;

    let pedidos = obtenerPedidos();
    pedidos = pedidos.filter(p => p.id != id);
    guardarPedidos(pedidos);
    listarPedidos();
}

// Auto cargar editar
document.addEventListener("DOMContentLoaded", cargarPedidoEditar);
