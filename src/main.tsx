import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

const $rootElem = document.querySelector('#root');
if ($rootElem) {
    ReactDOM.createRoot($rootElem).render(
        <QueryClientProvider client={queryClient}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>,
    );
} else {
    console.error('Root element not found!');
}
