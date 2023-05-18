const productos = [
  { id: 1, producto: "Placa de video", precio: 100000, cantidad: 1, categoria: "compu" },
  { id: 2, producto: "RAM", precio: 20000, cantidad: 1,  categoria: "note" },
  { id: 3, producto: "Motherboard", precio: 40000, cantidad: 1, categoria: "note" },
  { id: 4, producto: "Procesador", precio: 80000, cantidad: 1, categoria: "compu" },
  { id: 3, producto: "Motherboard", precio: 40000, cantidad: 1,  categoria: "compu" },
  { id: 4, producto: "Procesador", precio: 80000, cantidad: 1, categoria: "compu" }
];


let carrito = [];

const cards = document.querySelector(".grupo-cards");
const openModal = document.querySelector(".hero__cta");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");
const borrarModal = document.querySelector(".modal__borrar");
const modalContainer = document.getElementById("modal__container")

const verProductos = () => {
productos.forEach((prod)=>{
  const contenedor = document.createElement("div");
  contenedor.className = "card";
   contenedor.innerHTML +=`
   <img
    class="card__img"
    src=""
    alt="Avatar"
    "
  />
  <div class="container">
    <h4><b>${prod.producto}</b></h4>  
    <p>${prod.precio}</p>
   
  </div>
   `

  cards.append(contenedor);

  let agregar = document.createElement("button");
  agregar.innerText = "comprar";
  agregar.className = "btn btn-outline-success";

  contenedor.append(agregar)

  agregar.addEventListener("click",()=>{

    carrito.push({
      id: prod.id,
      producto: prod.producto,
      cantidad: prod.cantidad,
      precio: prod.precio

    })
    console.log(carrito);
  })
})

}
 verProductos()