fetch('./Data/Data.json')
.then(response => response.json())
.then(data => {
    localStorage.setItem( 'Clientes', JSON.stringify( data['Clientes'] ));
    localStorage.setItem( 'Trabajadores', JSON.stringify( data['Trabajadores'] ));
    localStorage.setItem( 'Proveedores', JSON.stringify( data['Proveedores'] ));
    localStorage.setItem( 'Productos', JSON.stringify( data['Productos'] ));
    localStorage.setItem( 'Compras', JSON.stringify( data['Compras'] ));
    localStorage.setItem( 'Cotizaciones', JSON.stringify( data['Cotizaciones'] ));
    localStorage.setItem( 'OrdenesDeTrabajo', JSON.stringify( data['OrdenesDeTrabajo'] ));
});