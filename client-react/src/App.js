import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {data} from './data';
import Login from "./pages/Login";



const App = () => {
    const cat = data.category;
    return (

        <Routes>
         <Route path={'/'} element={<Navigate to={`/${cat[0].name.toLowerCase()}`} />} />
            {cat.map(item => <Route key={item.id} path={`/${item.name}`} element={<Home category={item} />} />)}
            <Route path={'/login'} element={<Login/>} />
        </Routes>
    );
};

export default App;