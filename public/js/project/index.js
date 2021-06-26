function insertProjectInfo(json) {
    let principalData = document.createElement("div");
    let logoDiv = document.createElement("div");
    logoDiv.setAttribute("class", "logo");

    let logo = document.createElement("img");
    logo.setAttribute("src", APP_URL + "/img/projects/" + json.name + ".png");

    logoDiv.appendChild(logo)

    let infoDiv = document.createElement("div");
    let title = document.createElement("h2");
    let titleText = document.createTextNode(json.name);
    title.appendChild(titleText);

    infoDiv.appendChild(title);

    if (json.description) {
        let description = document.createElement("p");
        let descriptionText = document.createTextNode(json.description);
        description.appendChild(descriptionText);
        infoDiv.appendChild(description);
    }

    let dataDiv = document.createElement("div");

    let collaborationsDiv = document.createElement("div");
    collaborationsDiv.setAttribute("id", "collaborations");
    dataDiv.appendChild(collaborationsDiv)

    let updateDate = document.createElement("p");
    let updateTitleDate = document.createElement("b");
    let updateTitleDateText = document.createTextNode("Updated: ")
    let updateDateText = document.createTextNode(new Date(Date.parse(json.updated_at)).toISOString().split('T')[0]);
    updateTitleDate.appendChild(updateTitleDateText);
    updateDate.appendChild(updateTitleDate);
    updateDate.appendChild(updateDateText);
    dataDiv.appendChild(updateDate);

    let createDate = document.createElement("p");
    let createTitleDate = document.createElement("b");
    let createTitleDateText = document.createTextNode("Created: ")
    let createDateText = document.createTextNode(new Date(Date.parse(json.created_at)).toISOString().split('T')[0]);
    createTitleDate.appendChild(createTitleDateText);
    createDate.appendChild(createTitleDate);
    createDate.appendChild(createDateText);
    dataDiv.appendChild(createDate);

    principalData.appendChild(logoDiv);
    principalData.appendChild(infoDiv);

    menu.appendChild(principalData);
    menu.appendChild(dataDiv);
    addCollaborations(json.collaborations)

}

function addCollaborations(json) {
    const collaborationsDiv = document.querySelector("#collaborations");
    collaborationsDiv.innerHTML = ""
    let collaborations = json.slice(0, 3);
    for (let c of collaborations) {
        let type = c.propic ? "img" : "p";
        let propic = document.createElement(type);
        propic.setAttribute("class", "propic")
        let titlePropic = []
        if (c.datauser.name) titlePropic.push(c.datauser.name);
        if (c.datauser.surname) titlePropic.push(c.datauser.surname);
        if (titlePropic === "") titlePropic.push(c.username);
        propic.setAttribute("title", titlePropic.join(" "))
        if (type === "p") {
            let text = document.createTextNode(titlePropic.map((string) => string[0]).join('').toUpperCase())
            propic.appendChild(text);
        } else {
            propic.setAttribute("src", c.propic)
        }
        collaborationsDiv.appendChild(propic);
    }
}

function onJsonProject(json) {
    insertProjectInfo(json)
    insertProjectData(json)
}

function onError(e) {
    console.log(e)
}

function animateCounter() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        counter.innerText = '0'
        const target = +counter.getAttribute('data-target');
        const interval = target / 100;

        const updateCounter = () => {
            const value = +counter.innerText;
            if (value < target) {
                counter.innerText = Math.ceil(value + interval);
                setTimeout(() => {
                    updateCounter()
                }, 500);
            }
        }

        updateCounter();

    });
}

function animateBars() {
    const bars = document.querySelectorAll(".progressBarLine");

    bars.forEach(bar => {
        let lineProgressBar = bar.querySelector(".line")
        let percentage = bar.querySelector("span.percentage")
        percentage.innerText = '0 %'
        lineProgressBar.style.width = "0";
        const target = +percentage.getAttribute('data-target');
        const interval = target / 100;

        const updateBar = () => {
            const value = +percentage.innerText.split(" ")[0];
            if (value < target) {
                lineProgressBar.style.width = "calc(" + Math.ceil(value + interval) + "% - 8px)";
                percentage.innerText = Math.ceil(value + interval) + " %";
                setTimeout(() => {
                    updateBar()
                }, 10);
            }
        }

        updateBar();

    });
}

function insertProjectData(json) {
    let devicesDiv = document.createElement("div");
    devicesDiv.setAttribute("class", "numDevices")
    let numberDevices = document.createElement("span");
    numberDevices.setAttribute("class", "counter");
    numberDevices.setAttribute("data-target", json.devicesNumber);
    let titleDevices = document.createElement("p");
    let titleDevicesText = document.createTextNode("devices")
    titleDevices.appendChild(titleDevicesText)
    devicesDiv.appendChild(numberDevices);
    devicesDiv.appendChild(titleDevices);

    container.appendChild(devicesDiv);

    if (Object.keys(json.updatedPercentages).length > 0) {
        let statistics = document.createElement("div");
        statistics.setAttribute("class", "centered");
        statistics.setAttribute("id", "statistics")

        let titleStatistics = document.createElement("h1");
        let titleStatisticsText = document.createTextNode("Statistics")
        titleStatistics.appendChild(titleStatisticsText)
        statistics.appendChild(titleStatistics);

        let subtitleStatistics = document.createElement("p");
        let subtitleStatisticsText = document.createTextNode("Percentage of updated devices")
        subtitleStatistics.appendChild(subtitleStatisticsText)
        statistics.appendChild(subtitleStatistics);


        for (let updatedPercentage in json.updatedPercentages) {
            let oneline = document.createElement("div");
            oneline.setAttribute("class", "oneLine progressBarLine");
            let board = document.createElement("span")
            let boardText = document.createTextNode(updatedPercentage);
            board.appendChild(boardText);
            oneline.appendChild(board);

            let progressBar = document.createElement("div");
            progressBar.setAttribute("class", "progressBar")
            let backgroundProgressBar = document.createElement("div");
            backgroundProgressBar.setAttribute("class", "background")
            let lineProgressBar = document.createElement("div");
            lineProgressBar.setAttribute("class", "line")

            lineProgressBar.style.width = "calc(" + Math.round(json.updatedPercentages[updatedPercentage]) + "% - 8px)";
            progressBar.appendChild(backgroundProgressBar);
            progressBar.appendChild(lineProgressBar);
            oneline.appendChild(progressBar)

            let percentage = document.createElement("span")
            percentage.setAttribute("class", "percentage");
            percentage.setAttribute("data-target", Math.round(json.updatedPercentages[updatedPercentage]));
            oneline.appendChild(percentage);

            statistics.appendChild(oneline);

        }

        container.appendChild(statistics);
    } else {
        let notify = document.createElement("div");
        notify.setAttribute("class", "notify duck");

        let titleStatistics = document.createElement("h2");
        let titleStatisticsText = document.createTextNode("There are no data here ")
        titleStatistics.appendChild(titleStatisticsText)
        notify.appendChild(titleStatistics);

        let subtitleStatistics = document.createElement("p");
        let subtitleStatisticsText = document.createTextNode("Hey Yaaaaaaaaa")
        subtitleStatistics.appendChild(subtitleStatisticsText)
        notify.appendChild(subtitleStatistics);

        container.appendChild(notify);
    }

    let oneLineDiv = document.createElement("div")
    oneLineDiv.setAttribute("class", "oneLine lists")

    if (json.devices.length > 0) {
        let testedDeviceDiv = document.createElement("div");

        let titleTest = document.createElement("h1");
        let titleTestText = document.createTextNode("Tested on")
        titleTest.appendChild(titleTestText)
        testedDeviceDiv.appendChild(titleTest);

        let ul = document.createElement('ul');
        for (let device of json.devices) {

            let li = document.createElement('li');
            let lispan = document.createElement('span');
            let nameText = device.name
            if (device.Versione > 1) nameText += " " + device.version
            let litext = document.createTextNode(nameText)
            lispan.appendChild(litext)
            li.appendChild(lispan)
            ul.appendChild(li)
        }
        testedDeviceDiv.appendChild(ul);
        oneLineDiv.appendChild(testedDeviceDiv);
    }

    if (json.OS.length > 0) {
        let compiledDiv = document.createElement("div");

        let titleCompiled = document.createElement("h1");
        let titleCompiledText = document.createTextNode("Compiled for")
        titleCompiled.appendChild(titleCompiledText)
        compiledDiv.appendChild(titleCompiled);

        let ull = document.createElement('ul');
        for (let OS of json.OS) {
            let lii = document.createElement('li');
            lii.setAttribute("class", "centered")
            let liispan = document.createElement('span');
            let img = document.createElement("img")
            img.setAttribute('class', 'shieldsBadge')
            img.setAttribute('src', themeShieldsBadge(OS.icon))
            img.setAttribute('data-image', OS.icon)
            let liitext = document.createTextNode(OS.name)
            liispan.appendChild(liitext)
            lii.appendChild(img)
            lii.appendChild(liispan)
            ull.appendChild(lii)
        }
        compiledDiv.appendChild(ull);
        oneLineDiv.appendChild(compiledDiv);
    }
    container.appendChild(oneLineDiv);

    animateCounter();
    animateBars()

}

function toogleCollaboration(event) {
    if (event.currentTarget.textContent === "Remove") {
        event.currentTarget.textContent = "Add to my account"
        event.currentTarget.classList.remove("remove");
    } else {
        event.currentTarget.textContent = "Remove";
        event.currentTarget.classList.add("remove");
    }
    fetch(route("api.toogle.collaboration", [project, user])).then(onResponse, onError).then(onJsonCollaboration).catch(onError);
}

function onJsonCollaboration(json) {
    fetch(route("api.project", project)).then(onResponse, onError).then(onJsonDivCollaboration).catch(onError);
}

function onJsonDivCollaboration(json) {
    addCollaborations(json.collaborations)
}

function onJsonExistCollaboration(json) {
    let button = document.createElement("a")
    button.setAttribute("class", "projectButton")
    let text = "Add to my account";
    if (json.exists) {
        text = "Remove";
        button.classList.add("remove");
    }
    button.textContent = text;
    button.addEventListener("click", toogleCollaboration)
    container.appendChild(button)
}

const project = window.location.pathname.split("/").pop();
const menu = document.querySelector(".menu");
const container = document.querySelector(".container");
fetch(route("api.project", project)).then(onResponse, onError).then(onJsonProject).catch(onError);

if (user)
    fetch(route("api.check.collaboration", [project, user])).then(onResponse, onError).then(onJsonExistCollaboration).catch(onError);