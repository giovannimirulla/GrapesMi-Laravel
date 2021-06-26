function checkFormInputListener(event) {
    let div = event.currentTarget.parentNode.parentNode.parentNode
    checkFormInput(div)
}

function checkFormInput(div) {
    let type = div.id
    let input = div.querySelector("input")
    let span = div.querySelector("span")
    if (checkFormDictionary[type]) {
        if (input.value.length > 0) {
            let regEx = checkFormDictionary[type].regEx
            if (type == "confirmPassword") regEx = RegExp(document.querySelector("#password input").value)
            if (!regEx.test(input.value)) {
                span.textContent = checkFormDictionary[type].error
                div.classList.add('error');
                formStatus[type] = false
            } else {
                span.textContent = ""
                div.classList.remove('error');
                let passData = {
                    column: type,
                    query: input.value
                }
                if (user) passData["_query"] = { user: user }
                if (checkFormDictionary[type].check) fetch(route(checkFormDictionary[type].check, passData)).then(onResponse).then(jsonCheckInput);
                else formStatus[type] = true
            }
        } else {
            updateDataUser(type, input.value)
            if (span) span.textContent = "";
            div.classList.remove('error');
        }
    } else {
        const formData = new FormData()
        formData.append('column', type)
        formData.append(type, input.value)
        fetch(route("api.update.profile", user), {
            method: 'POST',
            body: formData
        }).then(onResponse).then((json) => console.log(json))
        updateDataUser(type, input.value)
    }

}

function jsonCheckInput(json) {
    // Controllo il campo exists ritornato dal JSON
    let type = json.input
    let div = document.querySelector("#" + type);
    let span = div.querySelector("span")

    if (json.exists) {
        if (json.isMine === null || !json.isMine) {
            div.classList.add('error');
            let text = type.split(/(?=[A-Z])/).join(" ").toLowerCase();
            span.textContent = text[0].toUpperCase() + text.slice(1) + " already used"
            formStatus[type] = false
        } else {
            formStatus[type] = true
            span.textContent = "";
            div.classList.remove('error');
        }
        // document.querySelector("."+type).textContent = "@" + json.value;

    } else {
        formStatus[type] = true
        if ("isMine" in json) {
            if (json.isMine === false) {
                updateDataUser(type, json.value)
                span.textContent = "";
                div.classList.remove('error');
                const formData = new FormData()
                formData.append('column', type)
                formData.append(type, json.value)
                fetch(route("api.update.profile", user), {
                    method: 'POST',
                    body: formData
                })
            }
        }
    }
}

function updateDataUser(type, newValue) {
    if (type === "name" || type === "surname") {
        let otherValue = (type === "name") ? document.querySelector("#surname input").value : document.querySelector("#name input").value
        newValue = (type === "name") ? newValue + " " + otherValue : otherValue + " " + newValue
        let objects = document.querySelectorAll(".dataUser")
        for (let object of objects) {
            if (newValue.trim() === "") {
                object.classList.add("username")
                let usernameText = document.querySelector(".username").textContent
                object.textContent = usernameText
            } else {
                object.classList.remove("username")
                object.textContent = newValue
            }
        }
        let propics = document.querySelectorAll("p.propic")
        for (let propic of propics) {
            if (newValue.trim() === "") {
                let usernameText = document.querySelector(".username").textContent
                propic.textContent = usernameText.charAt(1).toUpperCase();
            } else {
                propic.textContent = newValue.split(" ").map((string) => string[0]).join('')
            }
        }
    } else {
        let objects = document.querySelectorAll("." + type)
        for (let object of objects) {
            if (type === "username") object.textContent = "@" + newValue;
            else object.textContent = newValue;
        }
    }
}

const formDiv = document.querySelectorAll("form > div")