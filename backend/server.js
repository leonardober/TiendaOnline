import express from "express";  // Importar express para crear el servidor
import cors from "cors";   // Importar cors para manejar solicitudes cross-origin que vienen del frontend
import dotenv from "dotenv"; // Importar dotenv para manejar variables de entorno
import productosRoutes from "./routes/productosRoutes.js"; // Importar rutas de productos
import { conectarDB } from "./database/db.js"; // Importar función para conectar a la base de datos
import comprasRoutes from "./routes/comprasRoutes.js"; // Importar rutas de compras

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Habilitar el parseo de JSON en las solicitudes

// Rutas
app.use("/api/productos", productosRoutes); // Rutas para productos
app.use("/api/compras", comprasRoutes); // Rutas para compras

// Conectar a MySQL
conectarDB(); // Llamar a la función para conectar a la base de datos

// Iniciar servidor
app.listen(PORT, () => {  // Escuchar en el puerto definido
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`); // Mensaje en consola cuando el servidor esté corriendo
});