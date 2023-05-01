let isDark = false;

export function setDarkMode() {
    document.body.style.background = "darkgray";
    document.body.classList.add("dark");
    isDark = true;
}

export function setLightMode() {
    document.body.style.background = "";
    document.body.classList.remove("dark");
    isDark = false;
}

export function toggleDarkMode() {
    isDark = !isDark;
    isDark ? setDarkMode() : setLightMode();
}
