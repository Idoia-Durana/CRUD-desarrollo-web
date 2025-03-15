import express from 'express';
import { routerUsuarios } from './routes/usuarios.js';

const app = express();
const port = 3000;

app.use(express.json());

// Servir archivos estáticos de node_modules
app.use('/node_modules', express.static('./node_modules'));

// Servir archivos estáticos de public
app.use(express.static('public'));

// Rutas usuarios
app.use('/usuarios', routerUsuarios);

// Lanzar servidor
app.listen(port, () => {
    console.log(`Servidor lanzado en http://localhost:${port}`);
});