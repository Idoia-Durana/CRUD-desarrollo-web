const url = '/usuarios';
const mensaje = document.getElementById("mensajes");

// Función para cargar los usuarios
function cargarUsuarios() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.querySelector("#usuarios tbody");

            // Limpiar contenido actual
            tbody.innerHTML = "";

            data.forEach((usuario) => {

                // Convertir la fecha y hora a un formato legible
                let fechaHoraCreacion = new Date(usuario.create_at).toLocaleString("es-ES", {
                    weekday: 'short', // Opcional: día de la semana en formato corto (lun, mar, etc.)
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit',
                });

                let fila = `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.usuario}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.rol}</td>
                        <td>${usuario.activo}</td>
                        <td>${fechaHoraCreacion}</td>
                        <td>
                            <!-- Botón para mostrar/ocultar el formulario de edición -->
                            <button class="btn btn-warning btn-sm" data-bs-toggle="collapse" data-bs-target="#editarUsuario-${usuario.id}" aria-expanded="false" aria-controls="editarUsuario-${usuario.id}">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <!-- Botón para eliminar usuario -->
                            <button onclick="eliminarUsuario(${usuario.id})" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    <tr class="collapse" id="editarUsuario-${usuario.id}">
                        <td colspan="4">
                            <input type="text" id="user-${usuario.id}" placeholder="Escribe el nombre" value="${usuario.usuario}" required>
                            <input type="password" id="password-${usuario.id}" placeholder="Escribe la contraseña" required>
                            <input type="email" id="email-${usuario.id}" placeholder="Escribe el email" value="${usuario.email}" required>
                            <button class="btn btn-primary btn-sm" onclick="actualizarUsuario(${usuario.id})">Actualizar Usuario</button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += fila;
            });
        })
        .catch((error) => console.error("Error de solicitud:", error));
}

// Función para añadir un usuario
function añadirUsuario() {
    let usuario = document.getElementById("user").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!usuario || !email || !password) {
        mensaje.innerHTML = `<div class="alert alert-danger">Todos los campos son obligatorios.</div>`;
        return;
    }

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, email, password }),
    })
        .then(response => response.json())
        .then((data) => {
            mensaje.innerHTML = '';
            cargarUsuarios();
        })
        .catch(error => console.error("Error al añadir usuario:", error));
}

// Función para actualizar un usuario
function actualizarUsuario(id) {
    let usuario = document.getElementById(`user-${id}`).value;
    let email = document.getElementById(`email-${id}`).value;
    let password = document.getElementById(`password-${id}`).value;

    if (!usuario || !email || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let urlActualizar = `${url}/${id}`;
    fetch(urlActualizar, {
        method: "PUT", // Usamos PUT para actualizar los datos
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, email, password }),
    })
        .then(response => response.json())
        .then((data) => {
            console.log('Actualizado:', data);
            cargarUsuarios();
        })
        .catch(error => console.error('Error al actualizar:', error));
}

// Función para eliminar un usuario
function eliminarUsuario(id) {
    let urlDelete = `${url}/${id}`;
    
    if (!confirm("¿Estás seguro de eliminar este usuario?")) {
        return;
    } 

    fetch(urlDelete, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                console.log('No se pudo eliminar el elemento');
            } else {
                console.log('Elemento eliminado correctamente');
                cargarUsuarios();
            }
        })
        .catch((error) => console.error("Error:", error));
}

cargarUsuarios();
