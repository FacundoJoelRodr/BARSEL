const productos = [
  { id: 1, producto: "Placa de video", precio: 100000, cantidad: 1, img: "./img/PlacaDeVideo.jpg" },
  { id: 2, producto: "RAM", precio: 20000, cantidad: 1, img: "./img/RAM.webp"  },
  { id: 3, producto: "Motherboard", precio: 40000, cantidad: 1,img: "./img/motherboard.png"  },
  { id: 4, producto: "Procesador", precio: 80000, cantidad: 1, img: "./img/amd-ryzen-7-5700x.jpg "  },

];

let carrito = [];


const cards = document.querySelector(".grupo-cards");
const openModal = document.querySelector(".hero__cta");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");
const borrarModal = document.querySelector(".modal__borrar");
const comprarModal = document.querySelector(".modal__comprar");
const modalContainer = document.getElementById("modal__container");
let agregarCarrito = document.querySelectorAll(".agregar-carrito");
const items = document.querySelector("#items");
const searchInput = document.querySelector('#search-input');
const vacio = document.querySelector('#vacio');


////SE MUESTRA LOS PRODUCTOS
function verProductos(productos) {
  cards.innerHTML = ""; 

  productos.forEach(producto => {
    const contenedor = document.createElement("div");
    contenedor.className = "card";
    contenedor.innerHTML = `
      <img class="card__img" src="${producto.img}" alt="Avatar" />
      <div class="container">
        <h4><b> ${producto.producto}</b></h4>  
        <p> PRECIO: $ ${producto.precio}</p>
        <button class="agregar-carrito btn btn-outline-success" id="${producto.id}">Agregar Carrito</button>
      </div>
    `;

    cards.append(contenedor);
  });

  agregar();
}

////SE AGREGA AL CARRITO

function agregar() {
  agregarCarrito = document.querySelectorAll(".agregar-carrito");

  agregarCarrito.forEach(e => {
    e.addEventListener("click", Acarrito);
  });
}

function Acarrito(e) {
  const idB = e.currentTarget.id;
  let elementoCarrito = productos.find(a => a.id === Number(idB));

  const index = carrito.findIndex(elem => elem.id === Number(idB));

  if (index !== -1) {
    carrito[index].cantidad++;
  } else {
    carrito.push(elementoCarrito);
    vacio.classList.add("disabled");
    elementoCarrito.cantidad = 1;
  }

  const datosCarrito = JSON.stringify(carrito);
  localStorage.setItem("carrito", datosCarrito);
}
////// MODAL BOTONES
openModal.addEventListener("click", () => {
  items.innerHTML = "";
  modal.classList.add("modal--show");
  a();
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("modal--show");
});

borrarModal.addEventListener("click", () => {
  items.innerHTML = "";
  carrito = [];
  localStorage.clear();
  vacio.classList.remove("disabled");
});

comprarModal.addEventListener("click", () => {

  modal.classList.remove("modal--show");
});



//// MODAL

function a() {
  const carritoModalls = localStorage.getItem("carrito");
  const values = JSON.parse(carritoModalls);

  items.innerHTML = ''; 

  values.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("items-carrito");
    div.innerHTML = `
      <div class="container">
        <h4><b>${producto.producto}</b></h4>  
        <p>Precio: $ ${producto.precio * producto.cantidad}</p>
        <p>Cantidad:${producto.cantidad}</p>
        <button class="eliminar-carrito btn btn-outline-danger " data-id="${producto.id}">Eliminar Producto</button>
      </div>
    `;
    items.append(div);
  });

  eliminar();
}

function eliminar() {
  const eliminarCarrito = document.querySelectorAll(".eliminar-carrito");

  eliminarCarrito.forEach(e => {
    e.addEventListener("click", Ecarrito);
  });
}

function Ecarrito(e) {
  const idE = e.currentTarget.dataset.id;

  if (carrito.some(f => f.id === Number(idE))) {
    const index = carrito.findIndex(elem => elem.id === Number(idE));

    if (carrito[index].cantidad > 0) {
      carrito[index].cantidad--;
    }

    if (carrito[index].cantidad === 0) {
      carrito.splice(index, 1);
      const elementoEliminar = document.querySelector(`[data-id="${idE}"]`);
      elementoEliminar.parentNode.parentNode.remove();
    }

    if (carrito.length === 0) {
      vacio.classList.remove("disabled");
    }
  }

  const datosCarrito = JSON.stringify(carrito);
  localStorage.setItem("carrito", datosCarrito);

  a();
}

////SEARCH
function filtrarProductos() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const productosFiltrados = productos.filter(producto =>
    producto.producto.toLowerCase().includes(searchTerm)
  );

  verProductos(productosFiltrados);
}

searchInput.addEventListener('input', filtrarProductos);

verProductos(productos);