const button_submit_Login = document.getElementById('button_submit_Login');
const message_Login_Error = document.getElementById('message_Login_Error');
const message_Login_Correct = document.getElementById('message_Login_Correct');
const message_Login_Error_Text = document.getElementById('message_Login_Error_Text');
const message_Login_Correct_Text = document.getElementById('message_Login_Correct_Text');

let Trabajadores = JSON.parse( localStorage.getItem('Trabajadores') ); //Almacena los trabajadores
const inputUsuario = document.getElementById('input_usuario_Login');
const inputContraseña = document.getElementById('input_password_Login');

button_submit_Login.addEventListener('click', (e) => {
    e.preventDefault();

	let InformacionCorrecta = false;
	Trabajadores.forEach(trabajador => {
		if(trabajador.Usuario == inputUsuario.value && trabajador.Contraseña == inputContraseña.value){
			InformacionCorrecta = true;
			sessionStorage.setItem("Nombre", trabajador['Nombre']);
			sessionStorage.setItem("Tipo", trabajador['Tipo']);
			sessionStorage.setItem("Id", trabajador['Id']);
			sessionStorage.setItem("Usuario", trabajador['Usuario']);
		}
	});

	if(InformacionCorrecta == true){
		//Guarda el nombre de usuario y contraseña
		window.location.href = "HomePage.html";
	}else{
		message_Login_Error_Text.innerHTML = 'Datos incorrectos';
		message_Login_Correct.classList.remove('signInUp__CorrectMessage-Active');
		message_Login_Error.classList.add('signInUp__ErrorMessage-Active');
	}

});