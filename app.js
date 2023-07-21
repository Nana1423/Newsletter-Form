// Abriendo Ventana Success Desktop
const button = document.querySelector("#btn_subscribe")

button.addEventListener('click', function() {

    // Recupera el sub_container y lo limpia
    const subContainer = document.getElementById('sub_container');
    while (subContainer.firstChild) {
    subContainer.removeChild(subContainer.firstChild);
    }

    //Agregar clase flex-column a sub_container
    subContainer.classList.add('flex-column');
})