import mysql from "mysql2";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_usuarios",
    waitForConnections: true,
    connectionLimit: 10, // Máximo de conexiones en el pool
    queueLimit: 0,
});

export default pool;
