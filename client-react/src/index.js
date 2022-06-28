import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {theme} from "./theme";
import {ThemeProvider} from "styled-components";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
);

