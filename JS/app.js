// Variables 
const btnEnviar = document.querySelector('#boton');
const linkURL = document.querySelector('#link');
const formulario = document.querySelector('#formulario');
const svgBuscador = document.querySelector('#svgbuscador');
const copy = document.querySelector('#copy');

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

    // Copy 
    copy.addEventListener('click', copyLink)
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

    setTimeout(() => {
        const validacionIncorrecta = document.querySelector('.validacion-incorrecta');
        validacionIncorrecta.classList.remove('validacion-incorrecta');
        mensajeError.remove();
    }, 3500);

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

    const linkURL = document.querySelector('#link').value;

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com',
            'X-RapidAPI-Key': '4fac46de4cmsh33a3c13ec53720dp1c2ca6jsnea94adb3b57d'
        },
        body: new URLSearchParams({url: `${linkURL}`})
    };
    
    fetch('https://url-shortener-service.p.rapidapi.com/shorten', options)
        .then(response => response.json())
        .then(response => mostrarUrl(response))
     
} 


function mostrarUrl(response) {
    const { result_url } = response;
    const link = document.querySelector('#link').value;
    const linkURL = document.querySelector('#linkURL');
    const resultadoURL = document.querySelector('#resultadoURL');

    const escondido = document.querySelector('#escondido');
    escondido.style.visibility = 'visible';

    return (resultadoURL.innerHTML = result_url) + (linkURL.innerHTML = link);
}


function copyLink() {
    const resultadoURL = document.querySelector('#resultadoURL').value;
    console.log(resultadoURL);
}


