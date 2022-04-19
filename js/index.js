// <----------------- administra almacenamiento de datos ------------------>

if (!getStore("favoritos")) {
    setStore("favoritos", favDefault);
}

// <----------------- generar visualizacion de favoritos ------------------>

function printFav(fav) {
    document.getElementById("listaFav").innerHTML = "";
    if (fav) {
        for (const i in fav) {
            let { name, url, search, color, fontColor, img } = fav[i];
            let emoji = img.match(/(\p{EPres}|\p{ExtPict})/gu);

            if (emoji != null) {
                img = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%22.0em%22 y=%221.0em%22 font-size=%2280%22>${img}</text></svg>`;
            }
            let button = `<div><button id="${i}" class="btn-fav" onmouseover="clickFav(${i})" style="background-color: ${color}; color: ${fontColor}" >${name}<img src="${img}" class="icon" id="${i}" onmouseover="clickFav(${i})" alt="${name}"></button><div class="edit-btn" onclick="clickEditFav(${i})">⚙</div></div>`;
            getId("listaFav").innerHTML += button;
        }
        getId("listaFav").innerHTML += impTemp("temp-btnAddFavForm", "btnAddForm").outerHTML;
    }
}

// <-------------- Funciones crear, editar, borrar ------------------>

function addFav(form) {
    let fav = getFormData(form);
    console.log(fav);
    if (validatedFav(fav)) {
        let favoritos = getStore("favoritos");

        if (!favoritos) {
            setStore("favoritos", [fav]);
        } else {
            favoritos.push(fav);
            setStore("favoritos", favoritos);
        }
        console.log(favoritos);
        hiddenModal();
        printFav(favoritos);
    }
}

function saveFav(id) {
    let favoritos = getStore("favoritos");
    let fav = getFormData(formFav);
    let position = getId("position").value;
    if (validatedFav(fav)) {
        if (!favoritos) {
            setStore("favoritos", [fav]);
        } else {
            if (position == id) {
                favoritos[id] = fav;
                setStore("favoritos", favoritos);
            }
            else {
                favoritos.splice(id, 1);
                favoritos.splice(position, 0, fav);
                setStore("favoritos", favoritos);
            }
        }
        console.log(favoritos);
        hiddenModal();
        printFav(favoritos);
    }
    else {
        alert("No se pudo guardar el favorito");
    }
}

function delFav(id) {
    let favoritos = getStore("favoritos");
    favoritos.splice(id, 1);
    setStore("favoritos", favoritos);
    hiddenModal();
    printFav(favoritos);
}

function validatedFav(fav) {
    let { name, url, search, color, fontColor, img } = fav;

    if (name.length < 1) {
        alert("Ingrese un nombre");
        return false;
    }
    if (url.length < 1) {
        alert("Ingrese una url");
        return false;
    }
    if (search.length < 1) {
        alert("Ingrese una busqueda");
        return false;
    }
    if (color.length < 7) {
        alert("Ingrese un color");
        return false;
    }
    if (fontColor.length < 1) {
        alert("Ingrese un color de fuente");
        return false;
    }
    if (img < 1) {
        alert("Ingrese un emoji");
        return false;
    }
    return true;
}

// <------------------ Funciones modal ----------------------->

function closeFav() {
    document
        .getElementById("modalFav")
        .addEventListener("click", hiddenModalClick, false);
}

function hiddenModalClick(e) {
    if (e.target.id == "modalFav") {
        hiddenModal();
    }
}

function hiddenModal() {
    getId("modalFav").classList.add("d-none");
}

// <----------------- accecede al favorito ------------------>
function search(url, search) {
    let s = getId("q").value;
    if (s.length > 0) {
        window.location.assign(search + s);
    }
    else {
        window.location.assign(url);
    }
}

//<------------------ Eventos ----------------------->

document.addEventListener("DOMContentLoaded", function (event) {
    printFav(getStore("favoritos"));
});

function clickFav(id) {
    document
        .getElementById(id)
        .addEventListener("click", clickOnFav, false);
}

function clickOnFav(e) {
    if (e.target.classList == "icon" || e.target.classList == "btn-fav") {
        let fav = getStore("favoritos")[e.target.id];
        // const f = fav[Number(e.target.id)];
        search(fav.url, fav.search);
    }
}

function clickAddFav(form) {
    getId("modalFav").classList.remove("d-none");
    getId("btnsEdit").classList.add("d-none");
    getId("btnAdd").classList.remove("d-none");
    clearFormData(form);
}

function clickEditFav(id) {
    let favoritos = getStore("favoritos");
    let f = favoritos[id];
    console.log(f);
    getId("modalFav").classList.remove("d-none");
    getId("btnsEdit").classList.remove("d-none");
    getId("btnAdd").classList.add("d-none");

    setFormData(formFav, f);

    let p = getId("position");
    p.value = id;
    p.setAttribute("max", favoritos.length - 1);

    getId("btnSave").setAttribute("onclick", `saveFav(${id})`);
    getId("btnDel").setAttribute("onclick", `delFav(${id})`);

}
