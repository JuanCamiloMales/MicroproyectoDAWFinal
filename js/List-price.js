const tablaProductos = document.getElementById('TablaProductos');
let Cotizaciones = JSON.parse( localStorage.getItem('Cotizaciones') );
let Clientes = JSON.parse( localStorage.getItem('Clientes') );

const mostrarProductos = (cotizaciones) => {
    let aux = ``
    cotizaciones.forEach(cotizacion => {
        let cliente = Clientes.find(cliente => cliente['Id'] == cotizacion['Id_Cliente']);
        aux +=  `
                <tr class="table-type-2-body-tr">
                    <td class="table-type-2-body-td">
                            <div class="table-type-2-productos-cont-text">
                                <p class="table-type-2-producto-name">${cliente['Nombre'] + ' ' + cliente['Apellido']} </p>
                                <p class="table-type-2-producto-catalogo">Id usuario: ${cliente['Id']}</p>
                            </div>
                        
                    </td>

                    <!-- Codigo -->
                    <td class="table-type-2-body-td">
                        <div class="table-type-2-cantidad-minima center-cod">
                        ${cotizacion['Id']}
                        </div>
                    </td>

                    <!-- Cantidad minima -->
                    <td class="table-type-2-body-td">
                        <div class="table-type-2-cantidad-minima">
                            ${cotizacion['Fecha']}
                        </div>
                    </td>

                    <!-- Opciones -->
                    <td class="table-type-2-body-td ">
                        <div class="table-type-2-cont-opcion">
                            <div class="table-type-2-cont-opcion-reed">
                                <div class="table-type-2-opcions-reed"><span class="material-icons">account_box</span></div>
                            </div>
                            <div class="table-type-2-cont-opcion-edit">
                                <div class="table-type-2-opcions-edit"><span class="material-icons">edit</span></div>
                            </div>
                            <div class="table-type-2-cont-opcion-delete">
                                <div class="table-type-2-opcions-delete"><span class="material-icons">delete</span></div>
                            </div>
                        </div>
                    </td>
                </tr>
                `
    })
    tablaProductos.innerHTML = aux;
}

// const editarProducto = (id) => {
//     let producto = Productos.find(producto => producto['Id'] == id);
//     localStorage.setItem( 'EditarProducto', JSON.stringify( producto ));
//     window.location.href = 'EditarProducto.html';
// }

// const borrarProducto = (id) => {
//     let producto = Productos.find(producto => producto['Id'] == id);
//     let index = Productos.indexOf(producto)
//     Productos.splice( index , 1 );
//     guardarProductosLocalStorage(Productos)
//     mostrarProductos(Productos)
// }

// const guardarProductosLocalStorage = (productos) => {
//     localStorage.setItem( 'Productos', JSON.stringify( productos ));
// }

mostrarProductos(Cotizaciones);