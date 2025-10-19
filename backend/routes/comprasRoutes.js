import express from "express"; // Importar express para crear rutas
import { registrarCompra } from "../controllers/comprasController.js"; // Importar el controlador para registrar compras
const router = express.Router(); // Crear un router de express

// Ruta para registrar una compra
router.post("/", registrarCompra);

export default router; // Exportar el router para usar en el servidor