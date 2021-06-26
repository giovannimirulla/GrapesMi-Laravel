//Funzione per mostrare o meno il div #notify
function showNotify(contentsDiv, notifyDiv, type) {
    //Mostra il div #notify e nascondi il div #deploy .cards
    contentsDiv.classList.add("hidden");
    notifyDiv.classList.remove("hidden");

    //In base al tipo di notifica setto il titolo, il sottotitolo e la classe
    notifyDiv.querySelector('h2').textContent = notifyData[type].title;
    notifyDiv.querySelector('p').textContent = notifyData[type].subtitle;
    notifyDiv.setAttribute("class", "notify " + notifyData[type].class);
}