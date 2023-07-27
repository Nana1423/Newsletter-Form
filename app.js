const inputEmail = document.querySelector("#input_email")
const button = document.querySelector("#btn_subscribe")
const subContainer = document.getElementById('sub_container');

// Funcion que create los elementos de la ventana success
const agregarElementos = async (email) => {
    const imgIconSuccess = document.createElement("img")
    imgIconSuccess.id = "icon_success"
    imgIconSuccess.src = "images/icon-success.svg"
    imgIconSuccess.alt = "Icon Success"

    const h1Success = document.createElement("h1")
    h1Success.textContent = "Thanks for Subscribing!"
    h1Success.className = "h1_success"

    const pTextSucess = document.createElement("p")
    pTextSucess.className = "text_success"
    pTextSucess.textContent = `A confirmation email has been sent to ${email}. Please open it and click the button inside to confirm your subscription.`

    const buttonSuccess = document.createElement("button")
    buttonSuccess.className = "btn_subscribe btn btn-primary btn-block"
    buttonSuccess.textContent = "Dismiss mesage"

    // Crear una Promise para esperar a que la imagen esté completamente cargada
    const loadImage = new Promise((resolve, reject) => {
        imgIconSuccess.onload = () => resolve();
        imgIconSuccess.onerror = reject;
    });

    // Esperar a que la imagen esté completamente cargada antes de mostrar el contenido
    await loadImage.catch((error) => {
        // Manejar cualquier error en caso de que la imagen no se cargue correctamente
        console.error("Error al cargar la imagen:", error);
    });

    subContainer.appendChild(imgIconSuccess)
    subContainer.appendChild(h1Success)
    subContainer.appendChild(pTextSucess)
    subContainer.appendChild(buttonSuccess)
}

// Evalua que el email sea valido
function evaluaEmail(email) {

    const EmailNoValido = (string) => {
        inputEmail.classList.add("input_empty")
        inputEmail.value = ""
        inputEmail.placeholder = string
    }

    // Evalua que si se introdujo un email
    if (inputEmail.value === "") {
        EmailNoValido("Porfavor introduce un email")
        return false
    }

    // Codigo regex que evalua email
    const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (patronEmail.test(email) === false) {
        EmailNoValido("El formato del email no es valido")
        return false
    }

    return true

}

// Función para enviar el correo electrónico
function enviarEmail(email) {

    const serviceID = 'default_service'; 
    const templateID = 'template_9qqgquj';

    const params = {
        to_email: email,
    };

    emailjs.send(serviceID, templateID, params)
        .then(function (response) {
            console.log("Correo enviado correctamente", response);
        }, function (error) {
            console.error("Error al enviar el correo", error);
        });
}

// Evento que abre la abre la ventana Success
button.addEventListener('click', function (event) {
    event.preventDefault()

    // Verifica el email
    let email = inputEmail.value
    if (evaluaEmail(email) === false) {
        return
    }

    // Recupera el sub_container y lo limpia
    while (subContainer.firstChild) {
        subContainer.removeChild(subContainer.firstChild);
    }

    //Quitar la clase sub_container_subscribe y agregar clase container_success
    subContainer.classList.remove("sub_container_subscribe")
    subContainer.classList.add('container_success');

    // Agrega los elementos de container success
    agregarElementos(email)

    // Se envia el correo
    enviarEmail(email)
})


