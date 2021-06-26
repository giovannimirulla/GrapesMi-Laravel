function toogleMenu(e) {
    e.currentTarget.classList.toggle('active');
}

const menusDown = document.querySelectorAll('.menuDown')
for (let menuDown of menusDown) {
    menuDown.addEventListener('click', toogleMenu)
}
const toggleSwitches = document.querySelectorAll('.theme-switch input[type="checkbox"]');


if (currentThemeMode) {
    if (currentThemeMode === "dark") {
        for (let toggleSwitch of toggleSwitches) {
            toggleSwitch.checked = true;
        }
    }
}

function themeShieldsBadge(icon) {
    let r = document.querySelector('body');
    let style = getComputedStyle(r);
    let shieldsBadgeBackground = style.getPropertyValue('--white-third-color').replace(" #", "")
    let shieldsBadgeLogoColor = (shieldsBadgeBackground == "1f1f1f") ? "fff" : null;
    icon = icon.replace("{background}", shieldsBadgeBackground.replace(" #", ""))
    if (shieldsBadgeLogoColor) {
        let urlSearchParams = new URLSearchParams(icon);
        urlSearchParams.set("logoColor", shieldsBadgeLogoColor);
        return decodeURIComponent(urlSearchParams.toString()).replace("+-#", "-")
    }
    return icon;
}

function switchTheme(e) {
    let theme = (e.target.checked) ? 'dark' : 'light';
    currentThemeMode = theme

    let darkModeStatus = (e.target.checked) ? 1 : 0;
    document.documentElement.setAttribute('data-theme', theme);
    let shieldsBadges = document.querySelectorAll(".shieldsBadge")
    for (let shieldsBadge of shieldsBadges) {
        if (shieldsBadge.getAttribute("data-image")) shieldsBadge.src = themeShieldsBadge(shieldsBadge.getAttribute("data-image"))
    }
    const formData = new FormData()
    formData.append('column', 'darkMode')
    formData.append('darkMode', darkModeStatus)
    fetch(route("api.update.profile", user), {
        method: 'POST',
        body: formData
    })
}

//Funzione per passare la risposta JSON
function onResponse(response) {
    return response.json();
}

for (let toggleSwitch of toggleSwitches) {
    toggleSwitch.addEventListener('change', switchTheme, false);
}
window.onload = function() {
    document.querySelector("body").classList.remove("preload");
};