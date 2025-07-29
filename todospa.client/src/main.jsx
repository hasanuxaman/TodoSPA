import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import Home from './Home.jsx';
import ToDo from './Component/Todo.jsx';

const rootElement = document.querySelector('#root');

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
               
                <Route path="/" element={<App />}>
                    <Route path="home" element={<Home />} />
                    <Route path="todo" element={<ToDo />} />
                    <Route index element={<Navigate to="/home" replace />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
