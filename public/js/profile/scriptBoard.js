//Funzione per importare i contenuti con la creazione degli elementi (createElement) e l'aggiunta al rispettivo div #deploy .cards (appendChild)
function importBoards(json) {
    //Dichiarazione delle variabili
    let id, card, addButton, imageDiv, image, name, textName, divOS, imageOS, showButton, boldTextShowButton, textShowButton, description, boldTextDescriptionKey, textDescriptionKey, textDescriptionValue, br
        //For per tutti gli elementi presenti nei contenuti
    for (let board of json) {
        //Inizializzo l'id 'calcolandomelo'
        id = 'card' + json.indexOf(board);

        //Inizializzazione dei valori nei dictionary per la gestione della visibilità mentre sono filtrati e non
        allContentsDisplay[id] = filteredContentsDisplay[id] = true;

        //Creazione del div che conterrà tutti i valori dell'elemento
        card = document.createElement('div');
        card.setAttribute('class', 'card board centered');
        card.setAttribute('id', id);

        //Creazione del pulsante per l'aggiunta ai selezionati
        addButton = document.createElement('a');
        addButton.setAttribute('class', 'addButton item rightTop');
        textAddButton = document.createTextNode('+');
        addButton.appendChild(textAddButton);
        addButton.addEventListener('click', addToSelection);

        //Creazione del div contenente l'immagine principale
        imageDiv = document.createElement('div');
        image = document.createElement('img');
        image.setAttribute('class', 'mainImage');
        image.setAttribute('src', "img/boards/" + board.image);
        imageDiv.appendChild(image);

        //Creazione del tag h1 contenente il nome 
        name = document.createElement('h2');
        let nameText = board.name
        if (board.version > 1) nameText += " " + board.version
        textName = document.createTextNode(nameText);
        name.appendChild(textName);

        //Creazione del div contenente le immagini dei sistemi operativi
        divOS = document.createElement('div');
        divOS.setAttribute('class', 'os');
        for (os of board.compatibilities) {
            imageOS = document.createElement('img');
            imageOS.setAttribute('class', 'shieldsBadge')
            imageOS.setAttribute('src', themeShieldsBadge(os.icon));
            imageOS.setAttribute('data-image', os.icon);
            divOS.appendChild(imageOS);
        }

        //Creazione del pulsante per mostrare la descrizione
        showButton = document.createElement('a');
        showButton.setAttribute('class', 'showButton');
        boldTextShowButton = document.createElement('b');
        showButton.addEventListener('click', toggleDescription);
        textShowButton = document.createTextNode('Show more');
        boldTextShowButton.appendChild(textShowButton);
        showButton.appendChild(boldTextShowButton);

        //Creazione della descrizione non visibile inizialmente
        description = document.createElement('p');
        for (o in board.data) {
            boldTextDescriptionKey = document.createElement('b');
            textDescriptionKey = document.createTextNode(o + ': ');
            boldTextDescriptionKey.appendChild(textDescriptionKey);
            boldTextDescriptionKey.appendChild(textDescriptionKey);

            //Creazione del ritorno a capo
            if (!board.data[o]) board.data[o] = "None"
            textDescriptionValue = document.createTextNode(board.data[o]);
            br = document.createElement('br');

            description.appendChild(boldTextDescriptionKey);
            description.appendChild(textDescriptionValue);
            description.appendChild(br);
        }
        description.setAttribute("class", nameClassHide);

        //Aggiunta degli elementi creati al div card
        card.appendChild(addButton);
        card.appendChild(imageDiv);
        card.appendChild(name);
        card.appendChild(divOS);
        card.appendChild(description);
        card.appendChild(showButton);

        //Aggiunta del div card alla sezione
        contentsDiv.appendChild(card);
    }
}
//Carica le boards
function onJsonBoards(json) {
    let arrayNames = json.map(function(element) {
        return element.name;
    });
    reset(json, arrayNames)
    importBoards(json)
    checkAllElements()
}

function chargeBoards() {
    fetch(route('api.boards')).then(onResponse).then(onJsonBoards)
}