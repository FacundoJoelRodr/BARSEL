const carritoCompra = ()=> {
    modal.classList.add("modal--show");
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML=`
    <h1 class="modal-header-title">Carrito <h1>
    `
    modalContainer.append(modalHeader); 

    const result = carrito.reduce((acumulador, valorActual) => {
        const elementoYaExiste = acumulador.find(
          (elemento) => elemento.id === valorActual.id
        );
        if (elementoYaExiste) {
          return acumulador.map((elemento) => {
            if (elemento.id === valorActual.id) {
              return {
                ...elemento,
                cantidad: elemento.cantidad + valorActual.cantidad,
              };
            }
      
            return elemento;
          });
        }
      
        return [...acumulador, valorActual];
      }, []);
      
  
      result.forEach((product)=>{
  
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content"
        carritoContent.innerHTML=`
        <img
        class="card__img"
        src=""
        alt="Avatar"
        "
      />
      <div class="container">
        <h4><b>${product.producto}</b></h4>  
        <p>${product.precio}</p>
        <p>${product.cantidad}</p>
       
      </div>
       `
        modalContainer.append(carritoContent);
  
        let eliminar = document.createElement("button")
        eliminar.innerText = "X";
        eliminar.className = "delete";
        carritoContent.append(eliminar)
        eliminar.addEventListener("click", eliminarProducto)
      })
  
      const total = result.reduce((acc, el)=> acc + el.precio, 0);
  
      const totalcompra = document.createElement("div")
      totalcompra.className = "total-content";
      totalcompra.innerHTML = `total a pagar: ${total}`
      modalContainer.append(totalcompra)
  
    }
  
  closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal--show");
  });
  
  
  openModal.addEventListener("click", carritoCompra)
  
  const eliminarProducto = () =>{
    const foundId = carrito.find((element)=> element.id);
  
    carrito = carrito.filter((id) =>{
        if(id === foundId){
            id.cantidad--
        }else{
            return
        }
    });

    carritoCompra()
  }