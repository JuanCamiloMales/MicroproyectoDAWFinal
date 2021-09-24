if(sessionStorage.getItem("Usuario")){
    console.log("Sesion iniciada")

    document.getElementById('cont-header-user').innerHTML = `
        <div class="UserMenu_Profile">
            <img class="UserMenu_ProfileImg" onclick="userMenuToggle();" src="Imagenes/user.png">
        </div>
        <div id="UserMenu_Menu" class="UserMenu_Menu">
            <h3 class="UserMenu_MenuNTypeUser">Usuario</h3>
            <h3 class="UserMenu_MenuName">${sessionStorage.getItem("Nombre")}</h3>
            <ul class="UserMenu_MenuContainerItems">
                <li class="UserMenu_MenuItem">
                    <span class="UserMenu_MenuItemIcon material-icons">logout</span>
                    <a class="UserMenu_MenuItemText" href="#" onclick="cerrarSesion();" >Cerrar sesión</a>
                </li>
            </ul>
        </div>
    `;

}else{
    document.getElementById('cont-header-user').innerHTML = `
    <a class="material-icons header__userIcon" href="InicioSesion.html">account_circle</a>
    `;
}

function userMenuToggle(){
    const toggleUserMenu = document.getElementById('UserMenu_Menu');
    toggleUserMenu.classList.toggle('UserMenu_MenuActive');
}

function cerrarSesion(){
    sessionStorage.removeItem("Usuario");
    sessionStorage.removeItem("Id");
    sessionStorage.removeItem("Nombre");
    sessionStorage.removeItem("Tipo");
    window.location.href = "./InicioSesion.html";
}

const buttonOpenNav = document.getElementById('ButtonOpenNav');
buttonOpenNav.addEventListener('click', function(){
    document.querySelector('nav').classList.toggle('nav-active');
    document.querySelector('aside').classList.toggle('aside_navOpen');
})