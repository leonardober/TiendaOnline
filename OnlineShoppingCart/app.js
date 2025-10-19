// Cargar productos desde la API y luego inicializar el carrito
document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:5000/api/productos')
    .then(response => response.json())
    .then(productos => {
      const contenedor = document.querySelector('.contenedor-items');
      contenedor.innerHTML = "";

      productos.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
          <span class="titulo-item" data-id="${producto.id}">${producto.nombre}</span>
          <img src="img/${producto.imagen || 'default.jpg'}" alt="" class="img-item">
          <span class="precio-item">$${producto.precio}</span>
          <button class="boton-item">Agregar al Carrito</button>
        `;
        contenedor.appendChild(item);
      });

      ready(); // Inicializa eventos del carrito
    })
    .catch(error => console.error('Error al cargar productos:', error));
});

let carritoVisible = false;

function ready() {
  let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
  for (let button of botonesEliminarItem) {
    button.addEventListener('click', eliminarItemCarrito);
  }

  let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
  for (let button of botonesSumarCantidad) {
    button.addEventListener('click', sumarCantidad);
  }

  let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
  for (let button of botonesRestarCantidad) {
    button.addEventListener('click', restarCantidad);
  }

  let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
  for (let button of botonesAgregarAlCarrito) {
    button.addEventListener('click', agregarAlCarritoClicked);
  }

  document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

function pagarClicked() {
  let carritoItems = document.getElementsByClassName('carrito-item');
  let items = [];

  for (let item of carritoItems) {
    let tituloElemento = item.getElementsByClassName('carrito-item-titulo')[0];
    let id = tituloElemento.dataset.id; // ⚡ Recuperar el ID desde data-id
    let cantidad = parseInt(item.getElementsByClassName('carrito-item-cantidad')[0].value);
    items.push({ id: parseInt(id), cantidad });
  }

  if (items.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  fetch('http://localhost:5000/api/compras', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Compra registrada:", data);
      alert("✅ Gracias por tu compra. Stock actualizado correctamente.");

      // Limpiar el carrito
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

function agregarAlCarritoClicked(event) {
  let button = event.target;
  let item = button.parentElement;

  let tituloElemento = item.getElementsByClassName('titulo-item')[0];
  let id = tituloElemento.dataset.id; // ⚡ Guardamos también el ID del producto
  let titulo = tituloElemento.innerText;
  let precio = item.getElementsByClassName('precio-item')[0].innerText;
  let imagenSrc = item.getElementsByClassName('img-item')[0].src;

  agregarItemAlCarrito(id, titulo, precio, imagenSrc);
  hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
  carritoVisible = true;
  const carrito = document.getElementsByClassName('carrito')[0];
  carrito.style.marginRight = '0';
  carrito.style.opacity = '1';
  const items = document.getElementsByClassName('contenedor-items')[0];
  items.style.width = '60%';
}

function agregarItemAlCarrito(id, titulo, precio, imagenSrc) {
  let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

  // Evitar duplicados
  let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
  for (let i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText === titulo) {
      alert("El item ya se encuentra en el carrito");
      return;
    }
  }

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

  itemsCarrito.append(item);

  // Agregar eventos a los nuevos elementos
  item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
  item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
  item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

  actualizarTotalCarrito();
}

function sumarCantidad(event) {
  let selector = event.target.parentElement;
  let cantidadInput = selector.getElementsByClassName('carrito-item-cantidad')[0];
  cantidadInput.value = parseInt(cantidadInput.value) + 1;
  actualizarTotalCarrito();
}

function restarCantidad(event) {
  let selector = event.target.parentElement;
  let cantidadInput = selector.getElementsByClassName('carrito-item-cantidad')[0];
  let cantidad = parseInt(cantidadInput.value);
  if (cantidad > 1) {
    cantidadInput.value = cantidad - 1;
    actualizarTotalCarrito();
  }
}

function eliminarItemCarrito(event) {
  event.target.closest('.carrito-item').remove();
  actualizarTotalCarrito();
  ocultarCarrito();
}

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

function actualizarTotalCarrito() {
  const carritoItems = document.getElementsByClassName('carrito-item');
  let total = 0;

  for (let item of carritoItems) {
    let precio = parseFloat(item.getElementsByClassName('carrito-item-precio')[0].innerText.replace('$', '').replace('.', ''));
    let cantidad = parseInt(item.getElementsByClassName('carrito-item-cantidad')[0].value);
    total += precio * cantidad;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}
