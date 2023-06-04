let productos = [];

fetch("./productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    verProductos(productos);
  });

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
const searchInput = document.querySelector("#search-input");
const vacio = document.querySelector("#vacio");
const carritoNum = document.querySelector("#carrito-num");

////SE MUESTRA LOS PRODUCTOS
function verProductos(productos) {
  cards.innerHTML = "";
  carritoNum.innerHTML = localStorage.getItem("carritoCantidad") || 0;

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
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: "success",
    title: "Se agregó correctamente",
    iconColor: "#f26250"
  });

  const idB = e.currentTarget.id;
  const elementoCarrito = productos.find(a => a.id === Number(idB));
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
  agregarContador();
}

function agregarContador() {
  const contador = carrito.reduce((acc, pro) => acc + pro.cantidad, 0);
  carritoNum.innerHTML = contador;
  localStorage.setItem("carritoCantidad", contador);
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
  Swal.fire({
    title: "¿Estás seguro de borrar el carrito?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    confirmButtonColor: "#f26250",
    cancelButtonText: "Cancelar",
    iconColor: "#f26250"
  }).then(result => {
    if (result.isConfirmed) {
      items.innerHTML = "";
      carritoNum.innerHTML = 0;
      carrito = [];
      localStorage.clear();
      vacio.classList.remove("disabled");
    }
  });
});

comprarModal.addEventListener("click", () => {
  const total = carrito.reduce((acc, producto) => {
    const subtotal = producto.precio * producto.cantidad;
    return acc + subtotal;
  }, 0);

  Swal.fire({
    title: "Muchas Gracias por su compra",
    icon: "success",
    text: `El total de su compra fue $ ${total}`,
    confirmButtonColor: "#f26250",
    showClass: {
      popup: "animate__animated animate__fadeInDown"
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp"
    }
  });

  modal.classList.remove("modal--show");
  items.innerHTML = "";
  carritoNum.innerHTML = 0;
  carrito = [];
  localStorage.clear();
  vacio.classList.remove("disabled");
});

//// MODAL
function a() {
  const carritoModalls = localStorage.getItem("carrito");

  if (carritoModalls) {
    carrito = JSON.parse(carritoModalls);
    agregarContador();
  }

  items.innerHTML = "";

  carrito.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("items-carrito");
    div.innerHTML = `
      <div class="container">
        <h4><b>${producto.producto}</b> </h4>  
        <p>Precio: $ ${producto.precio * producto.cantidad} Cantidad: ${
      producto.cantidad
    } <a class="eliminar-carrito" data-id="${producto.id}"><img src="./img/trash-2.svg"></img></a></p>
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
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: "success",
    title: "Se eliminó el producto",
    iconColor: "#FE2E2E"
  });

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

  agregarContador();
}

////SEARCH
function filtrarProductos() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const productosFiltrados = productos.filter(producto =>
    producto.producto.toLowerCase().includes(searchTerm)
  );

  verProductos(productosFiltrados);
}

searchInput.addEventListener("input", filtrarProductos);