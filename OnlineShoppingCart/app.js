// 🚀 app.js — versión comentada paso a paso del carrito de compras

// Esperamos a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  // Hacemos una petición GET al backend para obtener los productos disponibles
  fetch('http://localhost:5000/api/productos')
    .then(response => response.json()) // Convertimos la respuesta a formato JSON
    .then(productos => {
      // Seleccionamos el contenedor donde se mostrarán los productos
      const contenedor = document.querySelector('.contenedor-items');
      contenedor.innerHTML = ""; // Limpiamos cualquier contenido previo

      // Recorremos cada producto recibido del backend
      productos.forEach(producto => {
        // Creamos un elemento <div> para cada producto
        const item = document.createElement('div');
        item.classList.add('item');

        // Insertamos los datos del producto en el HTML dinámicamente
        item.innerHTML = `
          <span class="titulo-item" data-id="${producto.id}">${producto.nombre}</span>
          <img src="img/${producto.imagen || 'default.jpg'}" alt="" class="img-item">
          <span class="precio-item">$${producto.precio}</span>
          <button class="boton-item">Agregar al Carrito</button>
        `;
        // Agregamos el nuevo elemento al contenedor
        contenedor.appendChild(item);
      });

      // Inicializamos los eventos del carrito una vez que se cargaron los productos
      ready();
    })
    // Capturamos cualquier error de conexión o formato
    .catch(error => console.error('Error al cargar productos:', error));
});

// Variable global para controlar la visibilidad del carrito
let carritoVisible = false;

// 📦 Función que asocia todos los botones con sus eventos
function ready() {
  // Botones para eliminar ítems del carrito
  let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
  for (let button of botonesEliminarItem) {
    button.addEventListener('click', eliminarItemCarrito);
  }

  // Botones para aumentar la cantidad
  let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
  for (let button of botonesSumarCantidad) {
    button.addEventListener('click', sumarCantidad);
  }

  // Botones para reducir la cantidad
  let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
  for (let button of botonesRestarCantidad) {
    button.addEventListener('click', restarCantidad);
  }

  // Botones "Agregar al carrito" de los productos
  let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
  for (let button of botonesAgregarAlCarrito) {
    button.addEventListener('click', agregarAlCarritoClicked);
  }

  // Botón de pagar
  document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

// 💰 Cuando el usuario hace clic en "Pagar"
function pagarClicked() {
  // Obtenemos todos los elementos dentro del carrito
  let carritoItems = document.getElementsByClassName('carrito-item');
  let items = [];

  // Recorremos los elementos y construimos el arreglo de compra
  for (let item of carritoItems) {
    let tituloElemento = item.getElementsByClassName('carrito-item-titulo')[0];
    let id = tituloElemento.dataset.id; // ID del producto (del atributo data-id)
    let cantidad = parseInt(item.getElementsByClassName('carrito-item-cantidad')[0].value);
    items.push({ id: parseInt(id), cantidad });
  }

  // Validamos que el carrito no esté vacío
  if (items.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  // Enviamos la compra al backend para registrar y actualizar el stock
  fetch('http://localhost:5000/api/compras', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Compra registrada:", data);
      alert("✅ Gracias por tu compra. Stock actualizado correctamente.");

      // Limpiamos el carrito tras la compra
      const carritoItemsContainer = document.getElementsByClassName('carrito-items')[0];
      carritoItemsContainer.innerHTML = "";
      actualizarTotalCarrito();
      ocultarCarrito();
    })
    .catch(error => {
      console.error("Error al registrar la compra:", error);
      alert("❌ Error al registrar la compra. Revisa la consola para más detalles.");
    });
}

// ➕ Evento cuando el usuario hace clic en "Agregar al carrito"
function agregarAlCarritoClicked(event) {
  let button = event.target;
  let item = button.parentElement; // Tomamos el contenedor del producto

  // Extraemos los datos del producto desde el HTML
  let tituloElemento = item.getElementsByClassName('titulo-item')[0];
  let id = tituloElemento.dataset.id;
  let titulo = tituloElemento.innerText;
  let precio = item.getElementsByClassName('precio-item')[0].innerText;
  let imagenSrc = item.getElementsByClassName('img-item')[0].src;

  // Llamamos a la función que lo agrega al carrito
  agregarItemAlCarrito(id, titulo, precio, imagenSrc);
  hacerVisibleCarrito(); // Mostramos el carrito si estaba oculto
}

// 🧺 Hace visible el carrito en pantalla
function hacerVisibleCarrito() {
  carritoVisible = true;
  const carrito = document.getElementsByClassName('carrito')[0];
  carrito.style.marginRight = '0'; // Deslizamos el carrito al área visible
  carrito.style.opacity = '1';
  const items = document.getElementsByClassName('contenedor-items')[0];
  items.style.width = '60%'; // Reducimos el ancho del listado de productos
}

// 🧩 Crea un nuevo elemento en el carrito con el producto seleccionado
function agregarItemAlCarrito(id, titulo, precio, imagenSrc) {
  let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

  // Evitamos duplicar un producto que ya esté en el carrito
  let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
  for (let i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText === titulo) {
      alert("El item ya se encuentra en el carrito");
      return;
    }
  }

  // Creamos el elemento HTML del producto en el carrito
  const item = document.createElement('div');
  item.classList.add('carrito-item');
  item.innerHTML = `
    <img src="${imagenSrc}" width="80px" alt="">
    <div class="carrito-item-detalles">
        <span class="carrito-item-titulo" data-id="${id}">${titulo}</span>
        <div class="selector-cantidad">
            <i class="fa-solid fa-minus restar-cantidad"></i>
            <input type="text" value="1" class="carrito-item-cantidad" disabled>
            <i class="fa-solid fa-plus sumar-cantidad"></i>
        </div>
        <span class="carrito-item-precio">${precio}</span>
    </div>
    <button class="btn-eliminar"><i class="fa-solid fa-trash"></i></button>
  `;

  // Agregamos el nuevo ítem al carrito
  itemsCarrito.append(item);

  // Asignamos los eventos a los nuevos botones creados
  item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
  item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
  item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

  // Actualizamos el total del carrito
  actualizarTotalCarrito();
}

// ➕ Aumenta la cantidad de un producto
function sumarCantidad(event) {
  let selector = event.target.parentElement;
  let cantidadInput = selector.getElementsByClassName('carrito-item-cantidad')[0];
  cantidadInput.value = parseInt(cantidadInput.value) + 1;
  actualizarTotalCarrito();
}

// ➖ Reduce la cantidad (sin bajar de 1)
function restarCantidad(event) {
  let selector = event.target.parentElement;
  let cantidadInput = selector.getElementsByClassName('carrito-item-cantidad')[0];
  let cantidad = parseInt(cantidadInput.value);
  if (cantidad > 1) {
    cantidadInput.value = cantidad - 1;
    actualizarTotalCarrito();
  }
}

// 🗑️ Elimina un producto del carrito
function eliminarItemCarrito(event) {
  event.target.closest('.carrito-item').remove(); // Quitamos el elemento del DOM
  actualizarTotalCarrito(); // Recalculamos el total
  ocultarCarrito(); // Si ya no hay items, ocultamos el carrito
}

// 🙈 Oculta el carrito si está vacío
function ocultarCarrito() {
  const carritoItems = document.getElementsByClassName('carrito-items')[0];
  if (carritoItems.childElementCount === 0) {
    const carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '-100%';
    carrito.style.opacity = '0';
    carritoVisible = false;
    const items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '100%';
  }
}

// 💵 Calcula el total del carrito sumando precios × cantidades
function actualizarTotalCarrito() {
  const carritoItems = document.getElementsByClassName('carrito-item');
  let total = 0;

  // Recorremos los productos en el carrito
  for (let item of carritoItems) {
    // Extraemos precio y cantidad
    let precio = parseFloat(item.getElementsByClassName('carrito-item-precio')[0].innerText.replace('$', '').replace('.', ''));
    let cantidad = parseInt(item.getElementsByClassName('carrito-item-cantidad')[0].value);
    total += precio * cantidad;
  }

  // Redondeamos y mostramos el total formateado
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}
