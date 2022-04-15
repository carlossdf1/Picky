let fav = JSON.parse(localStorage.getItem("favoritos"));

// function clickFav() {
//     document
//         .getElementById("btny")
//         .addEventListener("click", searchFav, false);
// }

// function searchFav(e) {
//     if (e.target.id == "btny") {
//         search('https://www.youtube.com', 'https://www.youtube.com/results?search_query=');
//     }
// }

// function editFav(){
//     document
//     .getElementById("btny")
//     .addEventListener("click", modalEdit, false);
//     // alert("Editar favorito");
// }

// function modalEdit(e) {
//     if (e.target.id == "btny") {
//     alert("Editar favorito");
//     }
// }

function search(url,search) {
    let s = getId("q").value;
    console.log(url);
    console.log(search);
    console.log(s);
    console.log(s.length);
    if (s.length > 0) {
        window.location.assign(search + s);
    }
    else {
        window.location.assign(url);
    }
}

// <-------------- Funciones formulario y favoritos ------------------>

function addFav(form) {
    let fav = getFormData(form);

    let favoritos = JSON.parse(localStorage.getItem("favoritos"));

    if (!favoritos) {
        localStorage.setItem("favoritos", JSON.stringify([fav]));
    } else {
        favoritos.push(fav);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    console.log(favoritos);
    hiddenModal();
    printFav();
}

function printFav(fav) {

    // document.getElementById("listaFav").innerHTML = "";
    if (fav) {
        for (const i in fav) {
            let { name, url, search, color, fontColor, img } = fav[i];
            let emoji = img.match(/(\p{EPres}|\p{ExtPict})/gu);

            if (emoji!=null) {
                img = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%22.0em%22 y=%221.0em%22 font-size=%2280%22>${img}</text></svg>`;
            }
            let button = `<button onclick="search('${url}','${search}')" style="background-color: ${color}; color: ${fontColor}" >${name}<img src="${img}" alt="${name}"></button>`;
            getId("listaFav").innerHTML += button;
        }
    }
}

// <------------------ Funciones auxiliares ------------------>
function getFormData(form) {
    // console.log(form);
    let datoStr = "";

    for (let i in form.id) {
    // for (let i = 0; i < form.length; i++) {
        // console.log(form[i]);
        let { name, value } = form[i];
        datoStr += `"${name}":"${value}",`;
    }

    let datos = JSON.parse("{" + datoStr.slice(0, -1) + "}");
    // console.log(datos);
    return datos;
}

function clearFormData(form) {
    for (let i = 0; i < form.length; i++) {
        form[i].value = form[i].value = "";
    }
}

function getId(id) {
    return document.getElementById(id);
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

function addFavoritoForm(form) {
    getId("modalFav").classList.remove("d-none");
    clearFormData(form);
}

//<------------------ Eventos ----------------------->

document.addEventListener("DOMContentLoaded", function(event) {
    printFav(fav);
    printFav(favDefault);
});

// <------------------ Datos default ------------------>

let favDefault = [
    {
        "name": "Youtube",
        "url": "https://www.youtube.com",
        "search": "https://www.youtube.com/results?search_query=",
        "color": "#c4302b",
        "fontColor": "#ffffff",
        "img": "img/youtube.svg",
        "category": "Streming"
    },
    {
        "name": "Google News",
        "url": "https://news.google.com",
        "search": "https://news.google.com/search?q=",
        "color": "#5DA6F8",
        "fontColor": "black",
        "img": "📰",
        "category": "Noticias"
    },
    {
        "name": "Youtube Music",
        "url": "https://music.youtube.com",
        "search": "https://music.youtube.com/search?q=",
        "color": "#b2071d",
        "fontColor": "#ffffff",
        "img": "img/headphones.svg",
        "category": "Streaming"
    },
    {
        "name": "Twitter",
        "url": "https://twitter.com",
        "search": "https://twitter.com/search?q=",
        "color": "#00acee",
        "fontColor": "black",
        "img": "img/twitter.svg",
        "category": "Redes Sociales"
    },
    {
        "name": "Twitch",
        "url": "https://www.twitch.tv",
        "search": "https://www.twitch.tv/search?term=",
        "color": "#6441a5",
        "fontColor": "#ffffff",
        "img": "img/twitch.svg",
        "category": "Streaming"
    },
    {
        "name": "SoloTodo",
        "url": "https://www.solotodo.cl",
        "search": "https://www.solotodo.cl/search?search=",
        "color": "#D27336",
        "fontColor": "#ffffff",
        "img": "💻",
        "category": "Tiendas"
    },
    {
        "name": "AliExpress",
        "url": "https://es.aliexpress.com",
        "search": "https://es.aliexpress.com/wholesale?&SearchText=",
        "color": "#ff4747",
        "fontColor": "#ffffff",
        "img": "img/basket2-fill.svg",
        "category": "Tiendas"
    },
    {
        "name": "Animeflv",
        "url": "https://www3.animeflv.net",
        "search": "https://www3.animeflv.net/browse?q=",
        "color": "#2c2b2a",
        "fontColor": "#ffffff",
        "img": "🗾",
        "category": "Streaming"
    },
    {
        "name": "TuManga Online",
        "url": "https://lectortmo.com",
        "search": "https://lectortmo.com/library?_pg=1&title=",
        "color": "#22489B",
        "fontColor": "#ffffff",
        "img": "💭",
        "category": "Lectura"
    },
    {
        "name": "Ninemanga",
        "url": "https://es.ninemanga.com/",
        "search": "https://es.ninemanga.com/search/?wd=",
        "color": "#fff700",
        "fontColor": "black",
        "img": "📚",
        "category": "Lectura"
    },
    {
        "name": "Knasta",
        "url": "https://knasta.cl/",
        "search": "https://knasta.cl/results?q=",
        "color": "#00ffaa",
        "fontColor": "black",
        "img": "🛍",
        "category": "Tiendas"
    }
];

let favObject =[
    {
        "name": "",
        "url": "",
        "search": "",
        "color": "",
        "fontColor": "",
        "img": "",
        "category": ""
    },    {
        "name": "",
        "url": "",
        "search": "",
        "color": "",
        "fontColor": "",
        "img": "",
        "category": ""
    }
];