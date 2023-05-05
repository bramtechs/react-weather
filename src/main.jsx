import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function initReact() {
    const $rootElem = document.querySelector('#root');
    if ($rootElem) {
        ReactDOM.createRoot($rootElem).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        );
    } else {
        console.error('Root element not found!');
    }
}

document.addEventListener('DOMContentLoaded', initReact);
