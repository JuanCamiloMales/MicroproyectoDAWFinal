const tablaProductos = document.getElementById('TablaProductos');
let Productos = JSON.parse( localStorage.getItem('Productos') );

const mostrarProductos = (productos) => {
    let aux = ``
    productos.forEach(producto => {
        aux +=  `
                <tr class="table-type-2-body-tr">
                    <!-- img-name-catalogo de producto -->
                    <td class="table-type-2-body-td">
                        <div class="table-type-2-cont-producto">
                            <img class="table-type-2-producto-img" src="Imagenes/${producto.Imagen}" alt="...">
                            <div class="table-type-2-productos-cont-text">
                                <p class="table-type-2-producto-name">${producto.Nombre}</p>
                                <p class="table-type-2-producto-catalogo">${producto.Categoria}</p>
                            </div>
                        </div>
                    </td>

                    <!-- cantidad -->
                    <td class="table-type-2-body-td">
                        <div class="table-type-2-cantidad">
                            ${producto.Unidad}
                        </div>
                    </td>

                    <!-- precio -->
                    <td class="table-type-2-body-td">
                        <div class="table-type-2-precio-cont-text">
                            <p class="table-type-2-precio-total">${producto.PrecioSalida}</p>
                        </div>
                    </td>

                    <!-- Opciones -->
                    <td class="table-type-2-body-td ">
                        <div class="table-type-2-cont-opcion">
                            <div class="table-type-2-cont-opcion-edit">
                                <div class="table-type-2-opcions-edit" onclick="editarProducto(${producto.Id})"><span class="material-icons">edit</span></div>
                            </div>
                            <div class="table-type-2-cont-opcion-delete">
                                <div class="table-type-2-opcions-delete" onclick="borrarProducto(${producto.Id})"><span class="material-icons">delete</span></div>
                            </div>
                        </div>
                    </td>
                </tr>
                `
    })
    tablaProductos.innerHTML = aux;
}

const editarProducto = (id) => {
    let producto = Productos.find(producto => producto['Id'] == id);
    localStorage.setItem( 'EditarProducto', JSON.stringify( producto ));
    window.location.href = 'EditarProducto.html';
}

const borrarProducto = (id) => {
    let producto = Productos.find(producto => producto['Id'] == id);
    let index = Productos.indexOf(producto)
    Productos.splice( index , 1 );
    guardarProductosLocalStorage(Productos)
    mostrarProductos(Productos)
}

const guardarProductosLocalStorage = (productos) => {
    localStorage.setItem( 'Productos', JSON.stringify( productos ));
}

mostrarProductos(Productos);