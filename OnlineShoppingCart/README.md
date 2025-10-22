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


