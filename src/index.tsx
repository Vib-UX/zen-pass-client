import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Provider from './provider';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
