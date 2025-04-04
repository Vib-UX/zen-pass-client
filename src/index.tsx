import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import EventDetails from './pages/EventDetails';
import EventsListing from './pages/Events';
import HomePage from './pages/HomePage';

import Provider from './provider';
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/events',
        element: <EventsListing />,
    },
    {
        path: '/events/:eventId',
        element: <EventDetails />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
