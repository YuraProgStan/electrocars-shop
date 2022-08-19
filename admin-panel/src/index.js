import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {DarkModeContextProvider} from './context/darkModeContext';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {unstable_HistoryRouter as BrowserRouter} from 'react-router-dom';
import {history} from './services/axios.service';
import {RouterProvider} from "./context/previousUrlContext";

ReactDOM.render(
    <DarkModeContextProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter history={history}>
                    <RouterProvider>
                        <App/>
                    </RouterProvider>
                </BrowserRouter>
            </PersistGate>

        </Provider>
    </DarkModeContextProvider>
    , document.getElementById('root'));