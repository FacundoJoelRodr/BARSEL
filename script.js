
let total = 0;

function bienvenida(){
    let nombre = prompt("Ingrese su nombre o razon social")
    if(nombre != "" && nombre != null){
        alert(`Bienvenido ${nombre} a BARSEL, siga las instrucciones para comprar`);
        return catalogo();
    }else{
        alert("el nombre no es valido por favor vuelva a intentar");
       return bienvenida();
    }
}

function catalogo(){
    let compra=parseInt(prompt("Desea comprar  \n 1 - Placa de video - ($100000) \n 2 - Memoria RAM ($20000) \n 3 - Motherboard (40000) \n 4 - Procesador (80000) \n 5 - Terminar compra"));
    return sumarCompra(compra)
}

function sumarCompra(compra){
    switch(compra){
        case 1:
            precio1= 100000;
            total+=precio1
            console.log(compra);
            alert(`Gracias por su compra de Placa de video, el total de su compra es $${total}`);
            catalogo();
        break;
        case 2:
           precio2= 20000;
           total +=precio2
           console.log(compra);
           alert(`Gracias por su compra de Memoria RAM, el total de su compra es $${total}`);
           catalogo();
        break;  
        case 3:
            precio3= 40000;
            total+=precio3
            console.log(compra);
            alert(`Gracias por su compra de Motherboard, el total de su compra es $${total}`);
            catalogo();
        break; 
        case 4:
            precio4 = 80000;
            total += precio4
            console.log(compra);
            alert(`Gracias por su compra de Procesador, el total de su compra es $${total}`);
            catalogo();
        break; 
        case 5:
            alert(`Gracias por su compra, el total de su compra es $${total}`);
            pagar();
        break; 
        default:
          alert("Dato ingresado no es valido, porfavor intente nuevamente");
          catalogo();
    }
}


function pagar(){
    let medioPago = prompt("Si usted paga por debito o transferencia tiene un descuento del 10% \n 1 - SI \n 2 - NO");
        if(medioPago = 1){
           let descuento = total * 10 / 100;
           alert(`el total del descuento es ${total - descuento}`);
           total-=total
        }else{
           alert(`el total de la compra es $${total}`);
           total-=total
        }
}
bienvenida();