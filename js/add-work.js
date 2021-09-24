
const listClientes = document.getElementById('listClientes');
const inputClientes = document.getElementById('inputClientes');
inputClientes.addEventListener('change',agregarClientes);

let Clientes = JSON.parse( localStorage.getItem('Clientes') ); //Almacena los clientes
function mostrarClientes(clientes){
    let aux = ``;
    for(let i=0; i<6 && i<clientes.length; i++){
        aux += `<option value="${clientes[i].Nombre +" "+ clientes[i].Apellido}">`;
    }
    listClientes.innerHTML = aux;
}
mostrarClientes(Clientes);

let clienteValido = null;
function agregarClientes(){
    clienteValido = null;
    Clientes.forEach( cliente => {
        if(cliente.Nombre +" "+ cliente.Apellido === inputClientes.value){
            clienteValido = cliente;
        }
    })
}


// Ventana Modal
let buttonOpenModal = document.getElementById('button-modal-open');
let buttonCloseModal = document.getElementById('button-modal-close');
let modalContainer = document.getElementById('modal-container');
let modal = document.getElementById('modal');

buttonOpenModal.addEventListener("click",function(e){
    e.preventDefault();
    modalContainer.classList.add('modal-container-open');
})

buttonCloseModal.addEventListener("click",function(e){
    e.preventDefault();
    modalContainer.classList.remove('modal-container-open');
})

function closeModal(){
    modalContainer.classList.remove('modal-container-open');
}



// Solicitar productos
let Productos = JSON.parse( localStorage.getItem('Productos') ); //Almacena los productos
let ProductosCarrito = []; //Almacena los productos del carrito
const tableAgregarProducts = document.getElementById("table-agragar-productos");

Productos.forEach( producto => producto['Cantidad'] = '1');
mostrarAgregarProductos(Productos);
// fetch('../Backend/consultProducts.php')
// .then(response => response.json())
// .then(productos => {
//     Productos = productos;
//     //Agrega la propiedad cantidad a los productos
//     Productos.forEach( producto => producto['Cantidad'] = '1')
//     mostrarAgregarProductos(productos);
// });



// Muestra los productos en la ventana modal agregar productos
function mostrarAgregarProductos(productos){
    //Quita los elementos que ya estan añadidos en el carrito
    let productosValidos = [];
    if(ProductosCarrito.length){
        productosValidos = productos.filter( producto => {
            let aux = true;
            ProductosCarrito.forEach( productoCarrito => {
                if(producto.Codigo === productoCarrito.Codigo){
                    aux = false;
                }
            })
            return aux;
        });
    }else productosValidos = productos;

    // Muestra los productos
    let aux = ``;

    if(productosValidos.length){
        productosValidos.forEach(producto => {
            aux += `<tr class="table-type-2-body-tr">

                        <td class="table-type-2-body-td">
                            <div class="table-type-2-cont-producto">
                                <img class="table-type-2-producto-img" src="Imagenes/${producto.Imagen}" alt="...">
                                <div class="table-type-2-producto-cont-text">
                                    <p class="table-type-2-producto-name">${producto.Nombre}</p>
                                    <p class="table-type-2-producto-catalogo">${producto.Codigo}</p>
                                </div>
                            </div>
                        </td>

                        <td class="table-type-2-body-td">
                            <div class="table-type-2-cantidad table-type-2-cantidad-center">
                                <a href="#" onclick="reducirCantidadProductos(this,${producto.Codigo})" class="material-icons select-buttons">remove_circle</a>
                                <div class="form-input-input table-type-2-cantidad-input">
                                    <input class="form-input select-cantida" type="number" min="1" value="${producto.Cantidad}" onchange="cambiarCantidadProductos(this,${producto.Codigo})" required>
                                </div>
                                <a href="#" onclick="aumentarCantidadProductos(this,${producto.Codigo})" class="material-icons select-buttons">add_circle</a>
                            </div>
                        </td>

                        <td class="table-type-2-body-td">
                            <div class="table-type-2-precio-cont-text">
                                <p class="table-type-2-precio-total">${producto.PrecioSalida}</p>
                            </div>
                        </td>

                        <td class="table-type-2-body-td ">
                            <div class="table-type-2-cont-opcion table-type-2-cont-opcion-agregar-center">
                                <div class="table-type-2-cont-opcion-agregar">
                                    <div class="table-type-2-opcions-agregar">
                                        <span onclick="agregarProductoCarrito('${producto.Codigo}')" class="material-icons icon-agregar">add_circle</span>
                                    <div>
                                </div>
                            </div>
                        </td>
                    </tr>`
        });
    }else{
        //Agrega mensaje de no se han agregado productos
        aux += `<tr>
                    <td></td>
                    <td class="table-type-2-body-td">
                        <div class="table-type-2-cantidad table-type-2-cantidad-center">
                            <p class="table-type-2-producto-name">Ya se agregaron todos los productos al carrito</p>
                        </div>
                    </td>
                    <td></td>
                </tr>`
    }
    tableAgregarProducts.innerHTML = aux;
}

// Botones laterales de select
function reducirCantidadProductos(input,codigoProducto){
    let select = input.parentNode.getElementsByTagName("input")[0];
    if(select.value > 1){
        select.value = parseInt(select.value) - 1;
    }
    cambiarCantidadProductos(select,codigoProducto);
}

function aumentarCantidadProductos(input,codigoProducto){
    let select = input.parentNode.getElementsByTagName("input")[0];
    select.value = parseInt(select.value) + 1;
    cambiarCantidadProductos(select,codigoProducto);
}


//Cambia los precios totales con base en la cantidad
function cambiarCantidadProductos(input,codigoProducto){
    Productos.forEach(producto => {
        if(producto.Codigo == codigoProducto){
            producto.Cantidad = input.value;
        }
    })
}



// Filtro agregar productos
const selectFiltroProductos = document.getElementById('select-filtro-productos');
selectFiltroProductos.addEventListener('change', filtrarAgregarProductos);

const inputFiltroProductos = document.getElementById('input-filtro-productos');
inputFiltroProductos.addEventListener('keyup', filtrarAgregarProductos);

function filtrarAgregarProductos(){
    let productosFiltrados = null;
    if(inputFiltroProductos.value !== ''){
        if( selectFiltroProductos.options[selectFiltroProductos.selectedIndex].text === 'Codigo'){
            productosFiltrados = Productos.filter( producto => producto.Codigo.startsWith(inputFiltroProductos.value));
        }else{
            productosFiltrados = Productos.filter( producto => producto.Nombre.toUpperCase().startsWith(inputFiltroProductos.value.toUpperCase())); 
        }
    }else {
        productosFiltrados = Productos;
    }
    mostrarAgregarProductos(productosFiltrados);
}



//Agregar Productos carrito
function agregarProductoCarrito(codigoProducto){
    producto = Productos.filter( producto => codigoProducto === producto.Codigo);
    ProductosCarrito.push(producto[0]);
    mostrarCarritoProductos(ProductosCarrito);
    modalContainer.classList.remove('modal-container-open');
    mostrarAgregarProductos(Productos);
    cambiarPrecioTotal();
}



// Muestra los productos en la ventana carrito
const tableCarritoProductos = document.getElementById("table-carrito-productos");
function mostrarCarritoProductos(productos){
    let aux = ``;

    if(productos.length){
        productos.forEach(producto => {
            aux += `<tr class="table-type-2-body-tr">
    
                        <td class="table-type-2-body-td">
                            <div class="table-type-2-cont-producto">
                                <img class="table-type-2-producto-img" src="Imagenes/${producto.Imagen}" alt="...">
                                <div class="table-type-2-producto-cont-text">
                                    <p class="table-type-2-producto-name">${producto.Nombre}</p>
                                    <p class="table-type-2-producto-catalogo">${producto.Codigo}</p>
                                </div>
                            </div>
                        </td>
    
                        <td class="table-type-2-body-td">
                            <div class="table-type-2-cantidad table-type-2-cantidad-center">
                                <a href="#" onclick="reducirCantidad(this,${producto.Codigo})" class="material-icons select-buttons">remove_circle</a>
                                <div class="form-input-input table-type-2-cantidad-input">
                                    <input class="form-input select-cantida" type="number" min="1" value="${producto.Cantidad}" onchange="cambiarCantidadProductos(this,${producto.Codigo})" required>
                                </div>
                                <a href="#" onclick="aumentarCantidad(this,${producto.Codigo})" class="material-icons select-buttons">add_circle</a>
                            </div>
                        </td>
    
                        <td class="table-type-2-body-td">
                            <div class="table-type-2-precio-cont-text">
                                <p class="table-type-2-precio-total">${producto.PrecioSalida*producto.Cantidad}</p>
                                <p class="table-type-2-precio-unitario">${producto.PrecioSalida}</p>
                            </div>
                        </td>
    
                        <td class="table-type-2-body-td ">
                            <div class="table-type-2-cont-opcion">
                                <div class="table-type-2-cont-opcion-delete">
                                    <div class="table-type-2-opcions-delete"><span onclick="eliminarProductosCarrito('${producto.Codigo}')" class="material-icons ">delete</span></div>
                                </div>
                            </div>
                        </td>
                    </tr>`
        });
    }else{
        //Agrega mensaje de no se han agregado productos
        aux += `<tr>
                <td></td>
                <td class="table-type-2-body-td">
                    <div class="table-type-2-cantidad table-type-2-cantidad-center">
                        <p class="table-type-2-producto-name">No se han agregado productos</p>
                    </div>
                </td>
                <td></td>
            </tr>`
    }

    tableCarritoProductos.innerHTML = aux;
}

// Eliminar productos del carrito
function eliminarProductosCarrito(codigoProducto){
    ProductosCarrito = ProductosCarrito.filter( producto => {
        if(producto.Codigo !== codigoProducto){
            return true;
        }else{
            producto.Cantidad = 1;
            return false;
        }
    })
    mostrarCarritoProductos(ProductosCarrito);
    mostrarAgregarProductos(Productos);
    cambiarPrecioTotal();
}

// Botones laterales de select
function reducirCantidad(input,codigoProducto){
    let select = input.parentNode.getElementsByTagName("input")[0];
    if(select.value > 1){
        select.value = parseInt(select.value) - 1;
    }
    cambiarCantidadCarrito(select,codigoProducto);
}

function aumentarCantidad(input,codigoProducto){
    let select = input.parentNode.getElementsByTagName("input")[0];
    select.value = parseInt(select.value) + 1;
    cambiarCantidadCarrito(select,codigoProducto);
}

//Cambia los precios totales con base en la cantidad
const precioTotal = document.getElementById('Precio-total');
function cambiarCantidadCarrito(input,codigoProducto){
    let precioTotal = 0;
    ProductosCarrito.forEach(producto => {
        if(producto.Codigo == codigoProducto){
            producto.Cantidad = input.value;
            precioTotal = producto.PrecioSalida*input.value;
        }
    })
    input.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("td")[2].getElementsByTagName("p")[0].innerHTML = precioTotal;
    cambiarPrecioTotal();
}

// Agregar total
function cambiarPrecioTotal(){
    let aux = 0;
    ProductosCarrito.forEach(producto => {
        aux += producto.Cantidad*producto.PrecioSalida;
    })
    precioTotal.innerHTML = aux;
}

//Registrar cotizacion
const buttonRegister = document.getElementById('button-register-orderDeTrabajo');
buttonRegister.addEventListener('click', function(e){
    e.preventDefault();

    if(ProductosCarrito != null && clienteValido != null){
        let OrdenesDeTrabajo = JSON.parse(localStorage.getItem('OrdenesDeTrabajo'))
        let NuevoId = String(Math.max(...OrdenesDeTrabajo.map(producto => parseInt(producto.Id)))+1);
        let newOrdenesDeTrabajo = {
            Id: NuevoId,
            Id_Cliente: clienteValido['Id'],
            Id_Trabajador: sessionStorage.getItem('Id'),
            Fecha: new Date().toLocaleDateString(),
            Productos: ProductosCarrito
        }
        OrdenesDeTrabajo.push(newOrdenesDeTrabajo);
        localStorage.setItem( 'OrdenesDeTrabajo', JSON.stringify( OrdenesDeTrabajo ));

        ProductosCarrito = [];
        mostrarCarritoProductos(ProductosCarrito);
        mostrarAgregarProductos(Productos);

    }else if (clienteValido == null){
        //No ha seleecionado cliente
    }else {
        //Mensaje el carrito no tiene productos
    }

});