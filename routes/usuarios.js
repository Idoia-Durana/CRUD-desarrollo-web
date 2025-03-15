import express from "express";
import pool from "../conexion_db.js";

export const routerUsuarios = express.Router();

// mostrar todos los usuarios
routerUsuarios.get("/", (req, res) => {
    const consulta = "SELECT id, usuario, email, rol, activo, create_at FROM usuarios";
    // ejecutamos la consulta
    pool.query(consulta, (error, result) => {
        if (error) {
            res.status(500).json({error: "Error al consultar usuarios"});
        } else {
            res.status(200).json(result);
        }
    });
});

// mostrar un usuario
routerUsuarios.get('/:id', (req, res) => {
    const { id } = req.params;
    const consulta = "SELECT * FROM usuarios WHERE id = ?";
    // ejecutamos la consulta
    pool.query(consulta, [id], (err, resultados) => {
        if (err) {
            console.error('Error en la consulta', err.message);
            return res.status(500).json({ error: "Error al consultar usuarios" });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(resultados[0])
    })
});

// agregar un usuario
routerUsuarios.post("/", (req, res) => {
    const { usuario, password, email } = req.body;

    // validamos los datos
    if (!usuario || !password || !email) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const consulta = "INSERT INTO usuarios (usuario, password, email) VALUES (?, ?, ?)";
    // ejecutamos la consulta
    pool.query(consulta,[usuario, password, email],(err, results) => {
            if (err) {
                console.error(" Error en la inserción:", err.message);
                return res.status(500).json({ error: "Error al agregar el usuario" });
            }
            res.status(201).json(
                {
                    message: "Usuario registrado",
                    id: results.insertId,
                }
            );
    });
});

// modificar un usuario
routerUsuarios.put("/:id", (req, res) => {
    const { id } = req.params;
    const { usuario, password, email } = req.body;
    const consulta = "UPDATE usuarios SET usuario = ?, password = ?, email = ? WHERE id = ?";

    pool.query(consulta, [usuario, password, email, id], (err, results) => {
        if (err) {
            console.error("❌ Error en la actualización:", err.message);
            return res.status(500).json({ error: "Error al actualizar el usuario" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario actualizado" });
    });
});

// eliminar un usuario
routerUsuarios.delete("/:id", (req, res) => {
    const { id } = req.params;
    const consulta = "DELETE FROM usuarios WHERE id = ?";

    pool.query(consulta, [id], (err, results) => {
        if (err) {
            console.error("❌ Error en la eliminación:", err.message);
            return res.status(500).json({ error: "Error al eliminar el usuario" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado" });
    });
});