import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {theme} from "./theme";
import {ThemeProvider} from "styled-components";
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
    </Provider>
);

