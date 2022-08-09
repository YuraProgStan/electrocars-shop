import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {theme} from "./theme";
import {ThemeProvider} from "styled-components";
import {unstable_HistoryRouter as BrowserRouter} from 'react-router-dom';
import {store,persistor} from "./redux/store";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { history } from './services/axios.service'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter history={history}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
        </PersistGate>

    </Provider>
);

