// controllers/comprasController.js
import { Producto } from "../models/producto.js";

export const registrarCompra = async (req, res) => {
  try {
    const { items } = req.body; // [{ id, cantidad }] o [{ nombre, cantidad }]
    console.log("🛒 Items recibidos:", items);

    if (!items || items.length === 0) {
      return res.status(400).json({ mensaje: "No se enviaron productos en la compra" });
    }

    // Recorremos cada producto del carrito
    for (const item of items) {
      let producto = null;

      // Preferir búsqueda por ID si existe, si no, usar nombre
      if (item.id) {
        producto = await Producto.findByPk(item.id);
      } else if (item.nombre) {
        producto = await Producto.findOne({ where: { nombre: item.nombre } });
      }

      // Validar existencia y stock
      if (!producto) {
        console.log("❌ Producto no encontrado:", item);
        continue; // pasa al siguiente item
      }

      if (producto.stock < item.cantidad) {
        console.log(`⚠️ Stock insuficiente para ${producto.nombre}: disponible ${producto.stock}, solicitado ${item.cantidad}`);
        continue;
      }

      // Descontar el stock
      const nuevoStock = producto.stock - item.cantidad;
      await producto.update({ stock: nuevoStock });

      console.log(`✅ Stock actualizado para ${producto.nombre}: ${producto.stock} → ${nuevoStock}`);
    }

    res.json({ mensaje: "Compra registrada y stock actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar compra:", error);
    res.status(500).json({ mensaje: "Error al registrar compra", error });
  }
};
