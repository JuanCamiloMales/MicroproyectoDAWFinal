const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const selects = document.querySelectorAll('#formulario select');
const textArea = document.querySelectorAll('#formulario textarea')[0];

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
	codigo: false,
	nombre: false,
	categoria: false,
	ubicacion: false,
    //descripcion: false,
    precioEntrada: false,
	precioSalida: false,
	unidad: false,
    presentacion: false,
    cantidadInicial: false,
    cantidadMinima: false
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
		let NuevoId = String(Math.max(...Productos.map(producto => parseInt(producto.Id)))+1);
		const nuevoProducto = {
			Id: NuevoId,
			codigo: inputs[0].value,
			nombre: inputs[1].value,
			categoria: selects[0].options[selects[0].selectedIndex].text,
			ubicacion: selects[1].options[selects[1].selectedIndex].text,
			descripcion: textArea.value,
			precioEntrada: inputs[2].value,
			precioSalida: inputs[3].value,
			unidad: inputs[4].value,
			presentacion: selects[2].options[selects[2].selectedIndex].text,
			cantidadInicial: inputs[5].value,
			cantidadMinima: inputs[6].value
		}

		Productos.push(nuevoProducto);
        localStorage.setItem( 'Productos', JSON.stringify( Productos ));

		formulario.reset();
		
		campos.codigo = false;
		campos.nombre = false;
		campos.categoria = false;
		campos.ubicacion = false;
		campos.precioEntrada = false;
		campos.precioSalida = false;
		campos.unidad = false;
		campos.presentacion = false;
		campos.cantidadInicial = false;
		campos.cantidadMinima = false;

		document.querySelectorAll('.form-input-input .form-icon').forEach((icon) => {
			icon.classList.remove('form-icon-correct');
		})
		


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