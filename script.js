const productos = [
    { producto: 'Placa de video', precio: 100000 },
    { producto: 'RAM', precio: 20000 },
    { producto: 'Motherboard', precio: 40000 },
    { producto: 'Procesador', precio: 80000 },
  ];
  
  let carrito = [];
  
  let total = 0;
  
  function bienvenida() {
    let nombre = prompt('Ingrese su nombre o razon social');
    if (nombre != '' && nombre != null && isNaN(nombre)) {
      alert(`Bienvenido ${nombre} a BARSEL, siga las instrucciones para comprar`);
      return catalogo();
    } else {
      alert('El nombre no es valido por favor vuelva a intentar');
      return bienvenida();
    }
  }
  
  function catalogo() {
    let compra = parseInt(
      prompt(
        'Desea comprar  \n 1 - Placa de video - ($100000) \n 2 - Memoria RAM ($20000) \n 3 - Motherboard (40000) \n 4 - Procesador (80000) \n 5 - Terminar compra \n 6 - Mostrar carrito \n 7 - Borrar el ultimo elemento del carrito \n 8 - Borrar todo el carrito'
      )
    );
    return sumarCompra(compra);
  }
  
  function sumarCompra(compra) {
    switch (compra) {
      case 1:
        carrito.push(productos[0]);
        alert(`Gracias por su compra`);
        catalogo();
        break;
      case 2:
        alert(`Gracias por su compra`);
        carrito.push(productos[1]);
        catalogo();
        break;
      case 3:
        alert(`Gracias por su compra`);
        carrito.push(productos[2]);
  
        catalogo();
        break;
      case 4:
        alert(`Gracias por su compra`);
        carrito.push(productos[3]);
        catalogo();
        break;
      case 5:
        alert(`Gracias por su visita, siga los pasos para finalizar`);
        sumar();
        if (total != 0) {
          pagar();
        } else {
          alert('vuelva pronto a BARSEL');
        }
        break;
      case 6:
        mostrarCarrito();
        catalogo();
        break;
      case 7:
        carrito.pop();
        alert('Se ha eliminado correctamente');
        mostrarCarrito();
        catalogo();
        break;
      case 8:
        borrar();
        mostrarCarrito();
        catalogo();
        break;
      default:
        alert('Dato ingresado no es valido, porfavor intente nuevamente');
        catalogo();
    }
  }
  
  function pagar() {
    alert(`El total a pagar es ${total}`);
    let medioPago = prompt(
      'Si usted paga por debito o transferencia tiene un descuento del 10% \n 1 - SI \n 2 - NO'
    );
    if (medioPago === '1') {
      let descuento = (total * 10) / 100;
      alert(`el total con el descuento es ${total - descuento}`);
      total -= total;
    } else {
      alert(`el total de la compra es $${total}`);
      total -= total;
    }
  }
  
  function sumar() {
    total += carrito.reduce(
      (acumulador, actual) => acumulador + actual.precio,
      0
    );
  }
  
  function mostrarCarrito() {
    if (carrito.length === 0) {
      alert('No hay nada en el carrito');
    } else {
      alert('Para una mejor visualiacion del carrito usar consola');
      alert(JSON.stringify(carrito));
      console.table(carrito);
    }
  }
  
  function borrar() {
    while (carrito.length > 0) {
      carrito.pop();
    }
    alert('se ha borrado correctamente todo el carrito');
  }
  
  bienvenida();
  