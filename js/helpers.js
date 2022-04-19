// <------------------ Funciones auxiliares ------------------>
function getFormData(form) {
    let datoStr = "";
    for (let i = 0; i < 7; i++) {
        // console.log(form[i]);
        let { id, value } = form[i];
        datoStr += `"${id}":"${value}",`;
    }
    let datos = JSON.parse("{" + datoStr.slice(0, -1) + "}");
    return datos;
}

function setFormData(form, datos) {
    for (const i in datos) {
        form[i].value = datos[i];
    }
}

function clearFormData(form) {
    for (let i = 0; i < 8; i++) {
        form[i].value = form[i].value = null;
    }
}

function impTemp(idTemp, idElement) {
    let temp = document.importNode(
        document.querySelector(`#${idTemp}`).content,
        true
    );
    let element = temp.getElementById(idElement);
    // .outerHTML;
    return element;
}

function getId(id) {
    return document.getElementById(id);
}

function getStore(storage) {
    return JSON.parse(localStorage.getItem(storage));
}

function setStore(storage, element) {
    localStorage.setItem(storage, JSON.stringify(element));
}