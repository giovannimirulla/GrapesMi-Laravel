//Funzione per importare le repositories con la creazione degli elementi (createElement) e l'aggiunta al rispettivo div #deploy .cards (appendChild)
function importGitHub(contents) {
    //Dichiarazione delle variabili
    let id, card, lockImage, externalLinkImage, externalLinkButton, name, textName, languageImage, description, textDescriptionValue
        //For per tutti gli elementi presenti nei contenuti
    if (contents.length > 0) {
        for (let content of contents) {
            //Se la repository presenta contenuti verrà mostrata
            if (content.size !== 0) {
                //Inizializzo l'id 'calcolandomelo'
                id = 'card' + contents.indexOf(content);

                //Creazione del div che conterrà tutti i valori dell'elemento
                card = document.createElement('div');
                card.setAttribute('class', 'card centered noImage');
                card.setAttribute('id', id);

                //Creazione del pulsante che mi permetterà di selezionare la repository
                button = document.createElement("a")
                button.setAttribute('class', 'selectable');
                button.addEventListener("click", selectRepo);

                //Immagine che visualizzerà se la repositoy è privata o meno
                lockImage = document.createElement("img");
                lockImage.setAttribute("class", "item leftTop lock");
                if (content.private) lockImage.setAttribute("src", "img/icon/lock.svg");
                else lockImage.setAttribute("src", "img/icon/unlock.svg");

                //Creazione del tag h2 contenente il nome 
                name = document.createElement('h2');
                textName = document.createTextNode(content.name);
                name.appendChild(textName);

                //Se vi è il linguaggio di programmazzione principale utilizzato mostra la relativa imagine
                if (content.language) {
                    languageImage = document.createElement('img');
                    languageImage.setAttribute('class', 'item rightTop shieldsBadge')

                    if (languageImages[content.language]) {
                        languageImage.setAttribute('src', themeShieldsBadge(languageImages[content.language]));
                        languageImage.setAttribute('data-image', languageImages[content.language]);
                    }
                }

                //Se è presente la descrizione la inserisce e regola la distanza dal titolo meiante una classe
                if (content.description) {
                    description = document.createElement('p');
                    textDescriptionValue = document.createTextNode(content.description);
                    description.appendChild(textDescriptionValue);
                }

                //Mostra un pulsante che manda al link esterno della repository su GitHub
                externalLinkButton = document.createElement("a")
                externalLinkButton.setAttribute("href", content.url)
                externalLinkImage = document.createElement("img")
                externalLinkButton.setAttribute("class", "item rightBottom")
                externalLinkImage.setAttribute("src", "img/icon/external-link-symbol.svg")
                externalLinkButton.appendChild(externalLinkImage)
                card.appendChild(externalLinkButton)

                //Aggiunta degli elementi creati al pulsante al div card
                card.appendChild(lockImage);
                button.appendChild(name);
                if (content.language) card.appendChild(languageImage);
                if (content.description) button.appendChild(description);
                card.appendChild(button)

                //Aggiunta del div card alla sezione
                githubDiv.appendChild(card);
            }
        }
    }
}

function onErrorRepos(e) {
    console.log(e)
}

function onResponseRepos(response) {
    return response.json();
}

function onJsonRepos(json) {
    if (json.length > 0) gitHubButton.addEventListener("click", showGitHub);
    else gitHubButton.classList.add("hidden");
    importGitHub(json)
}

function selectRepo(event) {
    let name = event.currentTarget.querySelector("h2").textContent;
    let description = ""
    let descriptionElement = event.currentTarget.querySelector("p");
    if (descriptionElement) description = descriptionElement.textContent;
    inputProjectName.value = name;
    inputProjectDescription.textContent = description

    gitHubButton.classList.remove("close")
    gitHubButton.querySelector("img").src = "img/icon/github.svg"
    let p = document.createElement("p")
    p.textContent = "...with GitHub"
    gitHubButton.appendChild(p)
    githubDiv.classList.add("hidden")
    formProject.classList.remove("hidden")

    //Sali a inizio pagina
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    checkFormInput(inputProject)
}

function showGitHub(event) {
    if (githubDiv.classList.contains("hidden")) {
        event.currentTarget.classList.add("close")
        event.currentTarget.removeChild(event.currentTarget.querySelector("p"))
        event.currentTarget.querySelector("img").src = "img/icon/close.svg"
        githubDiv.classList.remove("hidden")
        formProject.classList.add("hidden")
    } else {
        event.currentTarget.classList.remove("close")
        event.currentTarget.querySelector("img").src = "img/icon/github.svg"
        let p = document.createElement("p")
        p.textContent = "...with GitHub"
        event.currentTarget.appendChild(p)
        githubDiv.classList.add("hidden")
        formProject.classList.remove("hidden")
    }
}

function jsonCheckProject(json) {
    // Controllo il campo exists ritornato dal JSON
    if (!json.exists) {
        inputProjectName.parentNode.parentNode.classList.remove('error');
        nameProjectError.classList.remove("errorSpan");
    } else {
        nameProjectError.textContent = "Nome progetto già utilizzato";
        inputProjectName.parentNode.parentNode.classList.add('error');
        nameProjectError.classList.add("errorSpan")
    }
}

const gitHubButton = document.querySelector("#github")

const nameProjectError = document.querySelector("#nameProjectError")

const githubDiv = document.querySelector("#New-project .cards")
const formProject = document.querySelector("#New-project form")

const inputProject = document.querySelector("#nameProject");
const inputProjectName = inputProject.querySelector("input")
inputProjectName.addEventListener("blur", checkFormInputListener)
const inputProjectDescription = document.querySelector("#descriprionProjectArea textarea")

fetch(route("api.github.repos", user)).then(onResponseRepos, onErrorRepos).then(onJsonRepos).catch(onErrorRepos)