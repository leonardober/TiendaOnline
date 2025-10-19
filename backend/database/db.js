import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

export const conectarDB = async () => {
  try {
    await db.authenticate();
    console.log("✅ Conexión exitosa a MySQL");
    await db.sync(); // crea las tablas si no existen
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error);
  }
};
