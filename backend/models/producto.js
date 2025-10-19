import { DataTypes } from "sequelize"; // Importar DataTypes de Sequelize
import { db } from "../database/db.js"; // Importar la instancia de la base de datos

// Definir el modelo Producto

export const Producto = db.define("Producto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
  },
  nombre: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false, // Campo obligatorio
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Valor por defecto
  },
});

