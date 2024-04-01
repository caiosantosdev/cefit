import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.js';
import Login from './pages/tela login/Login.jsx';
import Cadastro from './pages/tela cadastro/Cadastro.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "cadastro",
        element: <Cadastro/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

