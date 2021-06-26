//Funzione per importare le repositories con la creazione degli elementi (createElement) e l'aggiunta al rispettivo div #contents (appendChild)
function importRepos(contents) {
    checkAllElements(contents);
        //For per tutti gli elementi presenti nei contenuti
    for (let content of contents) {
        //Se la repository presenta contenuti verrà mostrata
        if (content.size !== 0) {
                //Dichiarazione delle variabili
    let id, card, name, textName, description, textDescriptionValue
            //Inizializzo l'id 'calcolandomelo'
            id = 'card' + contents.indexOf(content);

            //Creazione del div che conterrà tutti i valori dell'elemento
            card = document.createElement('div');
            card.setAttribute('class', 'card centered');
            card.setAttribute('id', id);

            //Creazione del pulsante che mi permetterà di selezionare la repository
            button = document.createElement("a")
            button.setAttribute('class', 'selectable');
            button.setAttribute('href', route("project", content.name))
                //button.addEventListener("click", selectProject);


            //Creazione del div contenente l'immagine principale
            imageDiv = document.createElement('div');
            imageDiv.setAttribute('class', 'mainImage centered');
            image = document.createElement('img');
            image.src = APP_URL+'/img/projects/' + content.name + '.png';
            imageDiv.appendChild(image)

            //Creazione del tag h2 contenente il nome 
            name = document.createElement('h2');
            textName = document.createTextNode(content.name);
            name.appendChild(textName);


            //Se è presente la descrizione la inserisce e regola la distanza dal titolo meiante una classe
            if (content.description) {
                console.log(content)
                description = document.createElement('p');
                textDescriptionValue = document.createTextNode(content.description);
                description.appendChild(textDescriptionValue);
                name.setAttribute("class", "description")
            }

            //Aggiunta degli elementi creati al pulsante al div card
            button.appendChild(imageDiv);
            button.appendChild(name);
            if (content.description) button.appendChild(description);
            card.appendChild(button)

            //Aggiunta del div card alla sezione
            contentsDiv.appendChild(card);
        }
    }
}



//Funzione per il controllo della visibilità di tutti gl elementi
function checkAllElements(contents) {
    if (contents.length > 0) {
        notifyDiv.classList.add(nameClassHide);
        contentsDiv.classList.remove(nameClassHide);
    } else showNotify(contentsDiv, notifyDiv, "noSearch");
}

function onJsonSearch(json) {
    importRepos(json);
}


//Funzione che mostra la notifica 
function onError(e) {
    console.log(e)
    showNotify(contentsDiv, notifyDiv, "error")
}

function search(event) {
    event.preventDefault();
    if (searchInput.value !== "") {
        window.history.pushState("", "", "?q=" + searchInput.value);
        contentsDiv.innerHTML = ""
        fetch(route("api.search.projects", encodeURIComponent(searchInput.value))).then(onResponse, onError).then(onJsonSearch).catch(onError)
    }
}
//Dichiarazione e inizializzazione delle constanti delle sezioni
const notifyDiv = document.querySelector('.notify');
const contentsDiv = document.querySelector('#contents');

const searchButton = document.querySelector("#searchProjectsBar button");
const searchInput = document.querySelector("#searchProjectsBar input");

searchButton.addEventListener("click", search)
searchButton.addEventListener("keyup", search)

//Nome della classe per la gestione della visibilità
const nameClassHide = "hidden";

//Richiesta dei dati utente di chi ha fatto l'accesso
searchInput.value = route().params["q"]
fetch(route("api.search.projects", encodeURIComponent(route().params["q"]))).then(onResponse, onError).then(onJsonSearch).catch(onError)