const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const selects = document.querySelectorAll('#formulario select');
const textarea = document.querySelectorAll('#formulario textarea')[0];


let producto = JSON.parse( localStorage.getItem('EditarProducto') );
inputs[0].value = producto['Codigo'];
inputs[1].value = producto['Nombre'];
inputs[2].value = producto['PrecioEntrada'];
inputs[3].value = producto['PrecioSalida'];
inputs[4].value = producto['Unidad'];
inputs[5].value = producto['CantidadInicial'];
inputs[6].value = producto['CantidadMinima'];
textarea.value = producto['Descripcion'];

for(let i=0; i < selects[0].options.length; i++){
    if(selects[0].options[i].text == producto['Categoria']){
        selects[0].options.selectedIndex = i;
    }
}
for(let i=0; i < selects[1].options.length; i++){
    if(selects[1].options[i].text == producto['Ubicacion']){
        selects[1].options.selectedIndex = i;
    }
}
for(let i=0; i < selects[2].options.length; i++){
    if(selects[2].options[i].text == producto['Presentacion']){
        selects[2].options.selectedIndex = i;
    }
}

const expresiones = {
	codigo: /^\d+$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	precioEntrada: /^\d+$/, // 4 a 12 digitos.
	precioSalida: /^\d+$/,
	unidad: /^\d+$/, // 7 a 14 numeros.
    cantidadInicial: /^\d+$/,
    cantidadMinima: /^\d+$/
}

const campos = {
	codigo: true,
	nombre: true,
	categoria: true,
	ubicacion: true,
    //descripcion: false,
    precioEntrada: true,
	precioSalida: true,
	unidad: true,
    presentacion: true,
    cantidadInicial: true,
    cantidadMinima: true
}

const mensajeError = {
	codigo: 'Solo puede contener numeros enteros',
	nombre: 'Solo puede contener letras',
	categoria: 'Seleccione una opción valida',
	ubicacion: 'Seleccione una opción valida',
    //descripcion: false,
    precioEntrada: 'Solo puede contener numeros enteros',
	precioSalida: 'Solo puede contener numeros enteros',
	unidad: 'Solo puede contener numeros enteros',
    presentacion: 'Seleccione una opción valida',
    cantidadInicial: 'Solo puede contener numeros enteros',
    cantidadMinima: 'Solo puede contener numeros enteros'
}

const validarInputs = (e) => {
	switch (e.target.id) {
		case "codigo":
			validarCampo(expresiones.codigo, e.target, 'codigo', mensajeError.codigo);
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre', mensajeError.nombre);
		break;
		case "precioEntrada":
			validarCampo(expresiones.precioEntrada, e.target, 'precioEntrada', mensajeError.precioEntrada);
		break;
		case "precioSalida":
			validarCampo(expresiones.precioSalida, e.target, 'precioSalida', mensajeError.precioSalida);
		break;
		case "unidad":
			validarCampo(expresiones.unidad, e.target, 'unidad', mensajeError.unidad);
		break;
		case "cantidadInicial":
			validarCampo(expresiones.cantidadInicial, e.target, 'cantidadInicial', mensajeError.cantidadInicial);
		break;
        case "cantidadMinima":
			validarCampo(expresiones.cantidadMinima, e.target, 'cantidadMinima', mensajeError.cantidadMinima);
		break;
	}
}

const validarCampo = (expresion, input, campo, mensajeError) => {
	if(expresion.test(input.value)){

        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).classList.add('form-icon-correct');
        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).innerHTML = 'check_circle';

        document.querySelector(`#grupo__${campo} .form-input-input`).classList.remove('form-input-error');
        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).classList.remove('form-icon-error');
        document.querySelector(`#grupo__${campo} .form-msg`).classList.remove('form-msg-error');
        document.querySelector(`#grupo__${campo} .form-msg`).innerHTML = '';

		campos[campo] = true;
	} else {

        document.querySelector(`#grupo__${campo} .form-input-input`).classList.add('form-input-error');
        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).classList.add('form-icon-error');
        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).innerHTML = 'cancel';
        document.querySelector(`#grupo__${campo} .form-msg`).classList.add('form-msg-error');
        document.querySelector(`#grupo__${campo} .form-msg`).innerHTML = mensajeError;

        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).classList.remove('form-icon-correct');

		campos[campo] = false;
	}
}

const validarSelects = (e) => {
	switch (e.target.id) {
		case "categoria":
			validarSelect(e.target, 'categoria', mensajeError.categoria);
		break;
		case "ubicacion":
			validarSelect(e.target, 'ubicacion', mensajeError.ubicacion);
		break;
		case "presentacion":
			validarSelect(e.target, 'presentacion', mensajeError.presentacion);
		break;
	}
}

const validarSelect = (select, campo, mensajeError) => {
	if(select.options.selectedIndex != 0){

		document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).classList.add('form-icon-correct');
        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).innerHTML = 'check_circle';

        document.querySelector(`#grupo__${campo} .form-input-input`).classList.remove('form-input-error');
        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).classList.remove('form-icon-error');
        document.querySelector(`#grupo__${campo} .form-msg`).classList.remove('form-msg-error');
        document.querySelector(`#grupo__${campo} .form-msg`).innerHTML = '';

		campos[campo] = true;

	}else{
	
		document.querySelector(`#grupo__${campo} .form-input-input`).classList.add('form-input-error');
        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).classList.add('form-icon-error');
        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).innerHTML = 'cancel';
        document.querySelector(`#grupo__${campo} .form-msg`).classList.add('form-msg-error');
        document.querySelector(`#grupo__${campo} .form-msg`).innerHTML = mensajeError;

        document.querySelector(`#grupo__${campo} .form-input-input .form-icon`).classList.remove('form-icon-correct');

		campos[campo] = false;

	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarInputs);
	input.addEventListener('blur', validarInputs);
});
selects.forEach((input) => {
	input.addEventListener('change', validarSelects);
	input.addEventListener('blur', validarSelects);
});

document.getElementById('btnGuardar').addEventListener('click', (e) => {
	e.preventDefault();
	if(campos.codigo && campos.nombre && campos.categoria && campos.precioEntrada && campos.precioSalida && campos.unidad && campos.presentacion && campos.cantidadInicial && campos.cantidadMinima){

        let Productos = JSON.parse( localStorage.getItem('Productos') );
        let newproducto = Productos.find(elemento => elemento['Id'] == producto['Id']);
        let index = Productos.indexOf(newproducto)
        Productos.splice( index , 1 );

		newproducto['Codigo'] = inputs[0].value;
        newproducto['Nombre'] = inputs[1].value; 
        newproducto['PrecioEntrada'] = inputs[2].value;
        newproducto['PrecioSalida']= inputs[3].value;
        newproducto['Unidad'] = inputs[4].value;
        newproducto['CantidadInicial'] = inputs[5].value;
        newproducto['CantidadMinima'] = inputs[6].value;
        newproducto['Categoria'] = selects[0].options[selects[0].selectedIndex].text;
        newproducto['Ubicacion'] = selects[1].options[selects[1].selectedIndex].text;
        newproducto['Presentacion'] = selects[2].options[selects[2].selectedIndex].text;
        newproducto['Descripcion'] = textarea.value;

        Productos.push(newproducto);
        localStorage.setItem( 'Productos', JSON.stringify( Productos ));
        localStorage.removeItem('EditarProducto');

        window.location.href = 'GestionProductos.html';

	} else {
		inputs.forEach((input) => {
			input.focus();
			input.blur();
		});
		selects.forEach((input) => {
			input.focus();
			input.blur();
		});
	}
});

document.getElementById('btnBorrar').addEventListener('click', (e) => {
	e.preventDefault();
    localStorage.removeItem('EditarProducto');
    window.location.href = 'GestionProductos.html';
})