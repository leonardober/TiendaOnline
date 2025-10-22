# 🛒 Carrito de Compras con Node.js, Express y JavaScript

Este proyecto implementa un **carrito de compras dinámico** que se conecta a un backend con **Node.js y Express**, mostrando productos desde una API y permitiendo realizar compras que actualizan el stock en el servidor.

---

## 🚀 Funcionalidades principales

✅ Cargar productos desde una API REST (`/api/productos`).  
✅ Mostrar productos en tarjetas con nombre, precio e imagen.  
✅ Agregar productos al carrito con un solo clic.  
✅ Incrementar o reducir la cantidad de cada producto.  
✅ Eliminar productos del carrito.  
✅ Calcular automáticamente el total de la compra.  
✅ Enviar la compra al backend (`/api/compras`) para registrar el pedido.  
✅ Limpiar el carrito una vez confirmada la compra.

---

## 🧠 Flujo general de la app

1. Al cargar la página (`index.html`), se ejecuta `app.js`.
2. Se hace una petición `fetch` a `http://localhost:5000/api/productos` para obtener los productos.
3. Cada producto se renderiza con su botón “Agregar al carrito”.
4. Al hacer clic, se agrega el producto a la lista del carrito en el DOM.
5. El usuario puede modificar cantidades o eliminar productos.
6. El total se actualiza automáticamente.
7. Al hacer clic en “Pagar”, se envía una petición POST con los productos seleccionados al backend (`/api/compras`).

---

## ⚙️ Tecnologías usadas

### 🖥️ Frontend
- HTML5
- CSS3
- JavaScript (vanilla)
- Font Awesome (íconos)

### 💾 Backend
- Node.js
- Express.js
-SQL MYPYADMIN (para gestionar productos y compras)
- CORS y Body-Parser

---

## 📂 Estructura del proyecto

---

## 🧩 Ejemplo de interacción

1. **Inicio:**
   - Se cargan los productos desde la base de datos.
2. **Carrito:**
   - El usuario agrega varios productos.
   - Puede modificar cantidades y ver el total en tiempo real.
3. **Compra:**
   - Al pagar, se envían los datos:
     ```json
     {
       "items": [
         { "id": 1, "cantidad": 2 },
         { "id": 3, "cantidad": 1 }
       ]
     }
     ```
   - El backend responde con la confirmación de compra.

---

## 🧰 Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/carrocompras.git
   cd carrocompras
2.   Instala dependencias:

npm install


3. Inicia el servidor backend:
PS F:\CarritoComprasOnline\carritocompras\backend> npm start

node server.js
npm start

Perfecto ⚡ te explico paso a paso y con claridad qué hace cada parte de este archivo app.js de tu carrito de compras.
La idea general es que el archivo:
✅ carga productos desde una API,
✅ los muestra en pantalla,
✅ permite agregarlos, modificarlos o quitarlos del carrito,
✅ y finalmente envía la compra al backend (/api/compras) para actualizar stock o registrar la venta.

🧩 ESTRUCTURA GENERAL DEL SCRIPT

El flujo es el siguiente:

Carga inicial de productos desde el backend (API REST).

Inicializa los eventos del carrito (ready()).

Permite al usuario agregar, quitar y modificar productos en el carrito.

Calcula automáticamente el total.

Permite finalizar la compra, enviando los datos al backend.
1. Cargar productos desde la API
Qué hace:

Espera a que el HTML esté completamente cargado.

Hace una petición GET al backend (/api/productos).

Recorre los productos recibidos y crea dinámicamente una tarjeta (div .item) con:

el nombre (producto.nombre)

la imagen

el precio

un botón "Agregar al carrito"

Inserta todos los productos en el contenedor principal.

Luego llama a ready() para activar los eventos del carrito.
2. Función ready() — Inicializa todos los eventos
🧠 Qué hace:

Asigna los eventos (click) a todos los botones:

Agregar al carrito

Sumar cantidad

Restar cantidad

Eliminar producto

Pagar

De esta forma el carrito "cobra vida" cuando cargan los productos.
3. Función agregarAlCarritoClicked()

Cuando se hace clic en “Agregar al carrito”:
Qué hace:

Obtiene el ID, título, precio e imagen del producto clickeado.

Llama a agregarItemAlCarrito() para insertarlo en el carrito.

Hace visible el carrito (con animación CSS).
4. Función agregarItemAlCarrito()
🧠 Qué hace:

Evita agregar el mismo producto dos veces.

Crea dinámicamente un bloque HTML dentro del carrito.

Asigna eventos a los botones (+, −, eliminar).

Actualiza el total del carrito.
🔹 5. Modificar cantidades
🧠 Qué hace:

Suma o resta la cantidad de un producto sin permitir valores menores a 1.

Recalcula el total cada vez que cambia la cantidad.
🔹 6. Eliminar producto del carrito
🧠 Qué hace:

Elimina el producto del DOM.

Recalcula el total.

Si el carrito queda vacío → lo oculta.
🔹 7. Ocultar carrito si está vacío
🧠 Qué hace:

Si no hay productos en el carrito, lo oculta y expande nuevamente la vista de los productos.
🔹 8. Calcular el total
🧠 Qué hace:

Recorre todos los productos del carrito.

Multiplica cantidad × precio.

Formatea el total con separadores y dos decimales.
🔹 9. Finalizar la compra
🧠 Qué hace:

Recorre los ítems del carrito.

Construye un array con id y cantidad de cada producto.

Envía esos datos al backend (/api/compras) con fetch y método POST.

Si la compra es exitosa:

Limpia el carrito.

Actualiza el total.

Muestra mensaje de éxito.
🧾 EN RESUMEN
Función	Propósito
DOMContentLoaded	Carga los productos desde la API
ready()	Inicializa todos los eventos
agregarAlCarritoClicked()	Detecta clic en “Agregar al carrito”
agregarItemAlCarrito()	Inserta el producto al carrito
sumarCantidad() / restarCantidad()	Cambian cantidades
eliminarItemCarrito()	Borra un producto
actualizarTotalCarrito()	Calcula el total
pagarClicked()	Envía los datos al backend
ocultarCarrito()	Oculta el carrito si está vacío

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-10-2025 a las 17:02:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tiendaonline`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--
-- Creación: 10-10-2025 a las 16:27:38
-- Última actualización: 21-10-2025 a las 14:30:00
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` float NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `imagen`, `stock`, `createdAt`, `updatedAt`) VALUES
(1, 'Fondo Tecnología', 'Imagen de fondo', 1900, '63895553-tecnología-fondos.webp', 14, '2025-10-08 09:09:32', '2025-10-16 09:09:58'),
(2, 'Fondo Futurista', 'Imagen de fondo', 2100, '88316421-resumen-de-la-tecnología-futurista-de-la-cabecera-de-la-autopista-de-la-tecnología-fondo-del-vector.webp', 25, '2025-10-21 09:11:08', '2025-10-24 09:11:16'),
(3, 'Box Engasse', 'Producto ejemplo', 15000, 'boxengasse.png', 8, '2025-10-06 09:11:24', '2025-10-16 15:04:28'),
(4, 'Producto Cdfa', 'Producto ejemplo', 12000, 'cdfa094837b4155f157c0eaa3fbc7d1d.jpg', 5, '2025-10-07 09:11:33', '2025-10-21 14:30:00'),
(5, 'English Rose', 'Producto ejemplo', 13000, 'englishrose.png', 4, '2025-10-14 09:11:39', '2025-10-17 13:35:25'),
(6, 'Header', 'Imagen de cabecera', 1700, 'header.jpg', 22, '2025-10-05 09:11:49', '2025-10-21 14:20:42'),
(7, 'iPhone', 'Smartphone', 18000, 'iphone.jpg', 7, '2025-10-21 09:12:02', '2025-10-23 09:12:08'),
(8, 'Diademas JBL', 'Auriculares', 15000, 'jbl.jpg', 12, '2025-10-02 09:12:15', '2025-10-16 09:12:21'),
(9, 'Knocknap', 'Producto ejemplo', 11000, 'knocknap.png', 6, '2025-10-14 09:12:28', '2025-10-31 09:12:34'),
(10, 'La Night', 'Producto ejemplo', 14000, 'lanight.png', 4, '2025-10-02 09:12:43', '2025-10-17 09:12:48'),
(11, 'Portatil HP', 'Laptop HP', 25000, 'laptop_hp.jpg', 5, '2025-10-20 09:12:58', '2025-10-31 09:13:08'),
(12, 'Portatil Toshiba', 'Laptop Toshiba', 35000, 'laptop_toshiba.jpg', 3, '2025-10-02 09:13:16', '2025-10-04 09:13:21'),
(13, 'Middle Steel', 'Producto ejemplo', 9000, 'middlesteel.png', 9, '2025-10-07 09:13:30', '2025-10-09 09:13:36'),
(14, 'Midi Mix', 'Producto ejemplo', 9500, 'midimix.png', 7, '2025-10-14 09:13:41', '2025-10-15 09:13:46'),
(15, 'Monitor Asus', 'Monitor', 32000, 'monitor_asus.jpg', 2, '2025-10-06 09:13:54', '2025-10-09 09:13:58'),
(16, 'CPU HP', 'Computador HP', 32000, 'pc_hp.jpg', 4, '2025-10-05 09:14:04', '2025-10-15 09:14:10'),
(17, 'CPU Lenovo', 'Computador Lenovo', 18000, 'pc_lenovo.jpg', 6, '2025-10-01 09:14:15', '2025-10-16 09:14:21'),
(18, 'SmartWatch', 'Reloj inteligente', 42800, 'photo-1579586337278-3befd40fd17a.jpeg', 10, '2025-10-07 09:14:26', '2025-10-22 09:14:30'),
(19, 'Samsung Galaxy', 'Smartphone', 54000, 'samsung_galaxy.jpg', 8, '2025-10-06 09:14:35', '2025-10-16 09:14:40'),
(20, 'Silver All', 'Producto ejemplo', 10000, 'silverall.png', 5, '2025-10-05 09:14:45', '2025-10-08 09:14:50'),
(21, 'Sir Blue', 'Producto ejemplo', 9000, 'sirblue.png', 7, '2025-10-15 09:14:55', '2025-10-18 09:14:59'),
(22, 'Skinglam', 'Producto ejemplo', 12000, 'skinglam.png', 6, '2025-10-03 09:15:05', '2025-10-11 09:15:13');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

