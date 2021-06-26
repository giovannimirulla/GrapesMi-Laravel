function switchAction(event) {
    let type = (route().current() == "login") ? "signup" : "login";
    switchForm(type);
    window.history.pushState(null, null, type);
}

function checkForm() {
    // Controlla consenso dati personali
    console.log(formStatus)
    submitButton.disabled = !allowInput.checked ||
        // Controlla che tutti i campi siano pieni
        Object.keys(formStatus).length !== 4 ||
        // Controlla che i campi non siano false
        Object.values(formStatus).includes(false);
}

function switchForm(type) {
    if (type === "login") {

        for (let div of formDiv) {
            if (Object.keys(checkFormDictionary).includes(div.id)) {
                div.classList.remove('error');
                let input = div.querySelector('input')
                input.removeEventListener('blur', checkFormInputListener)
                let span = div.querySelector('span')
                span.textContent = "";
                if (div.id == "username") input.placeholder = "username or email"
            }
            if (!formDivLogin.includes(div.id)) {

                if (div.querySelector(".textBar")) div.classList.add("hidden")
            }
        }

        titleForm.textContent = "Log in to your account"
        submitButton.value = "Login";

        allowInput.removeEventListener('change', checkForm);

        submitButton.disabled = false;
        checkBoxLabel.textContent = "Click here if you forget your passwords "

        switchButton.querySelector("b").textContent = "Create!"
        switchText.textContent = "Don't have an account?"

    } else if (type === "signup") {

        for (let div of formDiv) {
            if (Object.keys(checkFormDictionary).includes(div.id)) {
                div.classList.remove('error');
                let input = div.querySelector('input')
                input.addEventListener('blur', checkFormInputListener)
                if (input) {
                    if (input.value.trim() !== "") checkFormInput(div);
                }
                if (div.id == "username") input.placeholder = "username"
            }
            if (!formDivLogin.includes(div.id)) {
                if (div.querySelector(".textBar")) div.classList.remove("hidden")
            }
        }

        titleForm.textContent = "Sign up and experience Grapes Mi today"
        submitButton.value = "Signup";

        allowInput.addEventListener('change', checkForm);

        submitButton.disabled = true;
        checkBoxLabel.textContent = "I agree to the Terms of Service and our Privacy Policy";

        switchButton.querySelector("b").textContent = "Login!"
        switchText.textContent = "Already have an account?"
    }
}

function loading(event) {
    let img = event.currentTarget.querySelector("img");
    img.src = "img/icon/loading.gif"
    img.classList.add("loading")
}


const formStatus = {};
const titleForm = document.querySelector(".title h2");
const submitButton = document.querySelector("#submit");
const allowInput = document.querySelector('.allow input')

const checkBoxLabel = document.querySelector("label[for='allow']")

const switchButton = document.querySelector('#switch a');
const switchText = document.querySelector('#switch p');

switchButton.addEventListener('click', switchAction);

const githubButton = document.querySelector("#github");
githubButton.addEventListener("click", loading)


const formDivLogin = ["username", "password"]

window.addEventListener('popstate', function(event) {
    switchForm(route().current());
});

switchForm(route().current());