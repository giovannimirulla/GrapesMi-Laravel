//Quando ritorna un JSON e quindi l'invio della mail ha avuto successo, aggiorna il numero della mail inviate e se tutte inviate mostra la notifica di avvenuto invio 
function onJsonEmail(json) {
    console.log(json)
    animateCounter()
}

function animateCounter() {
    let h2 = notifyDiv.querySelector("h2")
    numberSendedMails++;
    if (numberMailsToSend <= numberSendedMails) {
        h2.innerText = notifyData["email"].title.replace("{number}", numberSendedMails)
    } else {
        showNotify(contentsDiv, notifyDiv, "emailSended")
        h2.innerText = notifyData["email"].title.replace("{number}", numberSendedMails)
    }
}

//Funzione per inviare le mails
function updateBoards() {
    //Resetto la pagina e mostro la notifica relativa alle mails
    reset()
    showNotify(contentsDiv, notifyDiv, "update")
        // updateNotifyEmails()

    console.log(outuputSelection)

    for (let board of outuputSelection[1]) {
        let boardArray = board.split(" ");
        let boardVersion = board[board.length - 1];
        let boardName = board;
        if (isNaN(boardVersion)) boardVersion = 1;
        else {
            boardArray.pop()
            boardName = boardArray.join(" ")
        }

        fetch(route("api.update.boards", [outuputSelection[0], boardName, boardVersion])).then(onResponse).then(onJsonBoardsUpdate)
    }
}

function onJsonBoardsUpdate(json) {
    fetch('../template/mailUpdate.html')
        .then(r => r.text())
        .then(t => sendMails(t, json))
}

function sendMails(template, json) {
    let h2 = notifyDiv.querySelector("h2")
    showNotify(contentsDiv, notifyDiv, "email")
    h2.innerText = notifyData["email"].title.replace("{number}", 0)
    numberMailsToSend = numberMailsToSend + json.length;
    for (let board of json) {
        const formData = new FormData()
        formData.append('email', board.user.email)
        formData.append('subject', 'Your device is about to be updated');
        formData.append('html', template
            .replace("{logo}", APP_URL + "/img/logo.png")
            .replace("{osName}", board.nameSO)
            .replace("{osVersion}", board.versionSO)
            .replace("{projectName}", outuputSelection[0])
            .replace("{deviceName}", board.name)
            .replace("{deviceVersion}", (board.version > 1) ? board.version : "")
            .replace("{deviceImage}", APP_URL + "/img/boards/" + board.image)
        );
        fetch(route("api.send.mail"), {
            method: 'POST',
            body: formData
        }).then(onResponse, onError).then(onJsonEmail).catch(onError)

        /*  fetch("../api/update.php?sbc=" + sbc + "&project=" + outuputSelection[0]);
        fetch("../api/emailsUpdate.php?sbc=" + sbc + "&project=" + outuputSelection[0]).then(onResponse, onError).then(onJsonEmails).catch(onError)
    */
    }
}
//Dichiaro e inizializzo le variabili che mi serviranno per conteggiare le mails da inviare e mandate
let numberMailsToSend = 0
let numberSendedMails = 0