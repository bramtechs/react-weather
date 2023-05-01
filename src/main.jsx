import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const $rootElem = document.querySelector("#root");
if ($rootElem) {
    ReactDOM.createRoot($rootElem).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Root element not found!");
}
