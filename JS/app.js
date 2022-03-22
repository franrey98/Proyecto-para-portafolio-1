// Variables 
const btnEnviar = document.querySelector('#boton');
const linkURL = document.querySelector('#link');
const formulario = document.querySelector('#formulario');

// Expresion Regular para validar
const er = /^(ftp|http|https):\/\/[^ "]+$/;

// EventListeners 

eventListeners();
function eventListeners() {
    // Cuando arranca la app
    document.addEventListener('DOMContentLoaded', iniciarApp);
    
    // Validacion de URL
    linkURL.addEventListener('blur', validarFormulario);

    // Enviar URL 
    btnEnviar.addEventListener('click', obtenerDatos);
}

// Funciones 

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('boton-disabled');
}

function validarFormulario(e) {

    if(e.target.type === 'text') { 
        if(er.test(e.target.value) ) {
            const error = document.querySelector('.mensaje-error')
            e.target.classList.remove('validacion-incorrecta')
            e.target.classList.add('validacion-correcta')
            if(error) {
                error.remove();
            }
            mostrarMensajeCorrecto();
        } else {
            const correcto = document.querySelector('.mensaje-correcto')
            e.target.classList.remove('validacion-correcta')
            e.target.classList.add('validacion-incorrecta')
            if(correcto) {
                correcto.remove();
            }
            mostrarError();
        }
    }
    
    if(er.test(linkURL.value)) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('boton-disabled');
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('boton-disabled');
    }

}

function mostrarError() {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = 'Please add a link';
    mensajeError.classList.add('mensaje-error');

    const errores = document.querySelectorAll('.mensaje-error');
    if(errores.length === 0) {
    formulario.appendChild(mensajeError)
    }

}

function mostrarMensajeCorrecto() {
    const mensajeCorrecto = document.createElement('p');
    mensajeCorrecto.textContent = 'Link Correct';
    mensajeCorrecto.classList.add('mensaje-correcto');

    const textoCorrecto = document.querySelectorAll('.mensaje-correcto');
    if(textoCorrecto.length === 0) {
    formulario.appendChild(mensajeCorrecto)
    }

}


function obtenerDatos() {
    const API_URL = "https://api.shrtco.de/v2/shorten?url=";

    callAPI();
     function callAPI(linkURL){
         const request = fetch(`{${API_URL}+${linkURL}`);
         request.then((response) => response.json()).then((data) => this.renderOutput(linkURL, data.result.full_short_link));
     } 

}