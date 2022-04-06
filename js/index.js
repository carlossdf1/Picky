function search(url){
    let s = document.getElementById('q').value;
    window.location.assign(url+s);
}

function addFavoritoForm(){
    document.getElementById("modalFav").classList.remove("d-none");
    let fav = JSON.parse(localStorage.getItem('favoritos'));
    // fav.push(url);
    // localStorage.setItem('favoritos', JSON.stringify(fav));
}

function closeFav(){
    document.getElementById("modalFav").addEventListener('click',hiddenModal,false);
}

function hiddenModal(e){
    if(e.target.id == "modalFav"){
        document.getElementById("modalFav").classList.add("d-none");
    }
}

function addFav(){

    const fav = {
        "name": document.getElementById("NombreFav").value,
        "url": document.getElementById("UrlFav").value,
        "color": document.getElementById("ColorFav").value,
        "image": document.getElementById("ImgFav").value,
        "category": document.getElementById("CategoriaFav").value
    };

    let favoritos =  JSON.parse( localStorage.getItem('favoritos') );
    
    if (!favoritos) { 
        localStorage.setItem('favoritos', JSON.stringify([fav]));
    } else {
        favoritos.push(fav);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    console.log(localStorage.getItem('favoritos')); 
    document.getElementById("modalFav").classList.add("d-none");
}

function listaFavoritos(){

    const favoritos = JSON.parse(localStorage.getItem('favoritos'));

    for (let i in favoritos) {

        let temp = document.importNode(
            document.getElementById("botonNormal").content,
            true
        );

        let { name, url, color, image } = favoritos[i];

        temp.innerHTML = `${[name]}`;
        temp.style.backgroundColor = `${color}`;
        temp.style.backgroundImage = `url(${image})`;
        temp.href = `${url}`;

        // temp.onclick = `search(${[url]})`;

        console.log(temp);

        document.getElementById("listaFav").appendChild(temp);

    }

}

let fav=[
    {
    "name": "Google",
    "url": "https://www.google.com",
    "color": "#4285f4",
    "image": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    "category": "search"
    },
    {
    "name": "",
    "url": "",
    "color": "",
    "image": "",
    "category": ""
    }
];