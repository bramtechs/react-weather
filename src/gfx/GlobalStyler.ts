let isDark = false;

export const _defaultTextStyle = "text-2xl";
export const _defaultButtonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

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
