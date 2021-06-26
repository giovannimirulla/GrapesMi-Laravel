//Funzione per importare le repositories con la creazione degli elementi (createElement) e l'aggiunta al rispettivo div #deploy .cards (appendChild)
function importRandomProjects(contents) {
    //Dichiarazione delle variabili
    let id, div, card, name, textName, description, textDescriptionValue
        //For per tutti gli elementi presenti nei contenuti
    if (contents.length > 0) mainDiv.classList.remove("hidden")
    projectsDiv.innerHTML = "";
    for (let content of contents) {
        //Se la repository presenta contenuti verrà mostrata
        if (content.size !== 0) {
            //Inizializzo l'id 'calcolandomelo'
            id = 'card' + contents.indexOf(content);

            div = document.createElement('div');
            div.setAttribute('id', id);

            //Creazione del div che conterrà tutti i valori dell'elemento
            card = document.createElement('a');
            card.setAttribute('class', 'card centered');
            card.setAttribute('href', route("project", content.name))

            //Creazione del div che conterrà tutti i valori dell'elemento
            image = document.createElement('img');

            image.src = 'img/projects/' + content.name + '.png';

            //Creazione del tag h2 contenente il nome 
            name = document.createElement('h2');
            textName = document.createTextNode(content.name);
            name.appendChild(textName);

            if (content.description) {
                description = document.createElement('p');
                textDescriptionValue = document.createTextNode(content.description);
                description.appendChild(textDescriptionValue);
            }

            //Aggiunta degli elementi creati al pulsante al div card
            card.appendChild(image);
            div.appendChild(card);
            div.appendChild(name);
            if (content.description) div.appendChild(description);

            //Aggiunta del div card alla sezione
            projectsDiv.appendChild(div);
        }
    }
}


//Funzione per passare la risposta JSON
function onResponse(response) {
    return response.json();
}

function onJsonRandomProjects(json) {
    importRandomProjects(json);
}

function onError(e) {
    console.log(e)
}

const numberOfProjects = 4;
let projectsDiv = null;
let mainDiv = null;

function showProjects(id) {
    projectsDiv = document.querySelector('#' + id + ' .random.main');
    mainDiv = document.querySelector('#' + id);
    mainDiv.classList.remove("hidden")
    fetch(route('api.projects', numberOfProjects)).then(onResponse, onError).then(onJsonRandomProjects).catch(onError)
}