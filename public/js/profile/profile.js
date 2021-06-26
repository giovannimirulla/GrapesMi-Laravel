function selectPage(event) {
    if (event.currentTarget.textContent != "Deploy") {
        if (pageNumber > 1) {
            pageNumber = 1;
            setPage(pageNumber)
        }
    }
    showPage(event.currentTarget.textContent)
}

function showPage(selectPage) {
    for (let page of pages) {
        page.classList.add("hidden")
    }
    for (let button of buttons) {
        if (button.textContent == selectPage) button.classList.add("selected")
        else button.classList.remove("selected")
    }
    document.querySelector(".title h1").textContent = selectPage
    document.querySelector("#" + selectPage.replace(" ", "-")).classList.remove("hidden")
}

function doUpload() {
    let data = document.querySelector("#uploadOriginal").files[0];
    const formData = new FormData()
    formData.append('image', data)
    fetch(route("api.upload.image", user), {
        method: 'POST',
        body: formData
    }).then(onResponse).then((json) => console.log(json))
};

function chooseAnImage(event) {
    let dropZoneElement = event.currentTarget.parentNode.parentNode;
    dropZoneElement.classList.remove("active")
    let dropZoneInput = dropZoneElement.querySelector(".dropZoneInput")
    dropZoneInput.click();
}

function clickDropZone(event) {
    dropZoneInput = event.currentTarget.querySelector(".dropZoneInput")
    dropZoneInput.click();
}

function updateThumbnail(dropZoneElement, file) {
    dropZoneElement.classList.remove("error")
    let thumbnailElement = dropZoneElement.querySelector(".dropZoneThumb");

    let dropZonePrompt = dropZoneElement.querySelector(".dropZonePrompt")
    if (!dropZonePrompt.classList.contains("hidden")) {
        dropZonePrompt.classList.add("hidden");
    }
    if (dropZoneElement.classList.contains("menuDown")) {
        dropZoneElement.removeEventListener("click", clickDropZone)
        dropZoneElement.addEventListener("click", toogleMenu)
    }
    thumbnailElement.classList.remove("hidden")


    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
            if (dropZoneElement === document.querySelector("#profileImage")) {
                let pPropics = document.querySelectorAll("p.propic");
                let imgPropics = document.querySelectorAll("img.propic");
                for (let p of pPropics) {
                    p.classList.add("hidden")
                }
                for (let img of imgPropics) {
                    img.classList.remove("hidden")
                    img.src = reader.result;
                }
            }
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
    if (dropZoneElement === document.querySelector("#profileImage")) doUpload()
}

function deleteImage(event) {
    event.stopPropagation();
    let pPropics = document.querySelectorAll("p.propic");
    let imgPropics = document.querySelectorAll("img.propic");

    let dropZoneElement = event.currentTarget.parentNode.parentNode;
    let thumbnailElement = dropZoneElement.querySelector(".dropZoneThumb");
    let dropZonePrompt = dropZoneElement.querySelector(".dropZonePrompt")

    dropZonePrompt.classList.remove("hidden")
    thumbnailElement.style.backgroundImage = "none";
    thumbnailElement.classList.add("hidden")

    dropZoneElement.removeEventListener("click", toogleMenu)

    dropZoneElement.classList.remove("active")

    if (event.currentTarget.parentNode.parentNode === document.querySelector("#profileImage")) {
        for (let p of pPropics) {
            p.classList.remove("hidden")
        }
        for (let img of imgPropics) {
            img.classList.add("hidden")
            img.src = "";
        }
        fetch(route("api.upload.image", user), {
            method: 'POST'
        }).then(onResponse).then((json) => console.log(json))
    }
    dropZoneElement.addEventListener("click", clickDropZone)
}

const textInputs = document.querySelectorAll("#Profile .textBar input")
const menu = document.querySelector(".menu")
const buttonsMenu = ["Profile", "New project", "Deploy", "Dashboard"]

const menuDown = document.querySelector(".title .dropdown")

for (let buttonTitle of buttonsMenu) {
    let a = document.createElement("a");
    if (buttonTitle == "Dashboard") a.setAttribute("class", "selected");
    a.classList.add("button");
    a.addEventListener("click", selectPage);
    a.textContent = buttonTitle;
    menu.insertBefore(a, menu.childNodes[2]);

    let divOption = document.createElement("div")
    divOption.setAttribute("class", "option centered")

    let aOption = document.createElement("a")
    aOption.addEventListener("click", selectPage)
    aOption.textContent = buttonTitle;

    divOption.append(aOption)
    if (buttonTitle !== "New project") menuDown.insertBefore(divOption, menuDown.childNodes[0])
}

let formStatus = {}
const buttons = document.querySelectorAll(".menu .button")
const pages = document.querySelectorAll(".container .page")
showPage(buttonsMenu[buttonsMenu.length - 1])

const deleteImageOptions = document.querySelectorAll(".dropZone .red")
const chooseImageOptions = document.querySelectorAll(".dropZone .option.choose")

for (let deleteImageOption of deleteImageOptions) {
    deleteImageOption.addEventListener("click", deleteImage)
}
for (let chooseImageOption of chooseImageOptions) {
    chooseImageOption.addEventListener("click", chooseAnImage)
}

let dropZonesInput = document.querySelectorAll(".dropZoneInput")

for (let dropZoneInput of dropZonesInput) {
    const dropZoneElement = dropZoneInput.closest(".dropZone");

    if (dropZoneElement.querySelector(".dropZoneThumb").classList.contains("hidden")) {
        dropZoneElement.addEventListener("click", clickDropZone);
    }

    dropZoneInput.addEventListener("change", (e) => {
        if (dropZoneInput.files.length) {
            updateThumbnail(dropZoneElement, dropZoneInput.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("dropZoneOver");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("dropZoneOver");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            dropZoneInput.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("dropZoneOver");
    });
}

const dataUserArray = ["name", "surname"]

for (let dataUserID of dataUserArray) {
    let div = document.querySelector("#" + dataUserID)
    let input = div.querySelector('input')
    if (dataUserArray.includes(div.id)) {
        input.addEventListener('blur', checkFormInputListener)
    }
}

for (let div of formDiv) {
    let input = div.querySelector('input')
    if (input) {
        if (Object.keys(checkFormDictionary).includes(div.id)) {
            input.addEventListener('blur', checkFormInputListener)
        }
    }
}