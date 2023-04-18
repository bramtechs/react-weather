import React from "react";
import ReactDOM from "react-dom/client";
import WeatherApp from "./WeatherApp";
import "./index.css";

const $rootElem = document.getElementById("root");
if ($rootElem) {
    ReactDOM.createRoot($rootElem).render(
        <React.StrictMode>
            <WeatherApp />
        </React.StrictMode>
    );
} else {
    console.error("Root element not found!");
}
