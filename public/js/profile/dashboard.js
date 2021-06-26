//Funzione per importare i contenuti con la creazione degli elementi (createElement) e l'aggiunta al rispettivo div #deploy .cards (appendChild)
function importBoardsDashboard(json) {
    //Dichiarazione delle variabili
    let id, card, addButton, imageDiv, image, name, textName, divOS, imageOS, description, boldTextDescriptionKey, textDescriptionKey, textDescriptionValue, br
        //For per tutti gli elementi presenti nei contenuti
    if (json.length > 0) {
        for (let board of json) {

            //Creazione del div che conterrà tutti i valori dell'elemento
            card = document.createElement('div');
            card.setAttribute('class', 'card centered');

            //Creazione del div contenente l'immagine principale
            imageDiv = document.createElement('div');
            imageDiv.setAttribute("class", "rightDiv centered")

            image = document.createElement('img');
            image.setAttribute('class', 'mainImage centered');
            image.setAttribute('src', "img/boards/" + board.image);
            imageDiv.appendChild(image);

            //Creazione del tag h1 contenente il nome
            let leftDiv = document.createElement("div");
            leftDiv.setAttribute("class", "leftDiv")

            name = document.createElement('h2');
            let nameText = board.name
            if (board.version > 1) nameText += " " + board.version
            textName = document.createTextNode(nameText);
            name.appendChild(textName);
            leftDiv.appendChild(name);

            //Creazione del div contenente le immagini dei sistemi operativi
            divOS = document.createElement('div');
            divOS.setAttribute('class', 'item leftTop');
            imageOS = document.createElement('img');
            imageOS.setAttribute('class', 'shieldsBadge')
 
            imageOS.setAttribute('src', themeShieldsBadge(board.iconSO));
            imageOS.setAttribute('data-image', board.iconSO);
            divOS.appendChild(imageOS);

            description = document.createElement('p');

            let array = { "Project": board.nameProject, "OS Version": board.versionSO }

            for (let o in array) {
                boldTextDescriptionKey = document.createElement('b');
                textDescriptionKey = document.createTextNode(o + ': ');
                boldTextDescriptionKey.appendChild(textDescriptionKey);
                boldTextDescriptionKey.appendChild(textDescriptionKey);

                //Creazione del ritorno a capo
                textDescriptionValue = document.createTextNode(array[o]);
                br = document.createElement('br');

                description.appendChild(boldTextDescriptionKey);
                description.appendChild(textDescriptionValue);
                description.appendChild(br);
            }

            leftDiv.appendChild(description);

            //Creazione del pulsante per l'aggiunta ai selezionati
            addButton = document.createElement('p');
            addButton.setAttribute('class', 'item status rightTop');
            let status = (board.current == 1) ? '◉ Online' : '◉ Offline';
            let statusClass = (board.current == 1) ? "statusGreen" : "statusRed";
            textAddButton = document.createTextNode(status);
            addButton.classList.add(statusClass);
            addButton.appendChild(textAddButton);

            //Aggiunta degli elementi creati al div card
            card.appendChild(imageDiv);
            card.appendChild(leftDiv)
            card.appendChild(addButton);
            card.appendChild(divOS)

            //Aggiunta del div card alla sezione
            dashboardCards.appendChild(card);
        }
        dashboardNotify.classList.add("hidden")
    }else showNotify(dashboardCards, dashboardNotify, "empty")
}


function onJsonDashboard(json) {
    importBoardsDashboard(json);
}

const dashboardCards = document.querySelector("#Dashboard .cards")
const dashboardNotify = document.querySelector("#Dashboard .notify")

fetch(route('api.dashboard', user)).then(onResponse).then(onJsonDashboard)