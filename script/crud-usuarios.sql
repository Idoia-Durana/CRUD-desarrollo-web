-- Active: 1741264781488@@localhost@3306@crud_usuarios
DROP DATABASE IF EXISTS crud_usuarios;
CREATE DATABASE  crud_usuarios;
USE crud_usuarios;
-- definir la tabla usuarios para controlar acceso
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    rol ENUM('admin', 'encargado','invitado') DEFAULT 'invitado',
    activo TINYINT(1) DEFAULT 0,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (usuario, password, email) VALUES
('admin', '123456', 'admin@example.com'),
('empleado', '123456', 'empleado@example.com'),
('invitado', '123456', 'invitado@example.com'),
('mariano', '123456', 'mariano@example.com');

UPDATE usuarios SET rol = 'admin', activo = 1 WHERE email = 'admin@example.com';