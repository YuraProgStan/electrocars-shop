import React, {useContext, useState} from 'react';
import { Route, Routes} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import {productInputs, userInputs} from "./formSource";
import  './style/dark.scss';
import {DarkModeContext} from "./context/darkModeContext";
import ProductSingle from "./pages/product/ProductSingle";
import ProductNew from "./pages/productnew/ProductNew";
import User from "./pages/user/User";
import UserNew from "./pages/usernew/UserNew";
import Brand from "./pages/brand/Brand";
import BrandNew from "./pages/brandnew/BrandNew";
import ModelNew from "./pages/modelnew/ModelNew";

const App = () => {
const {darkMode} = useContext(DarkModeContext);
    const [dark, setDark] = useState(false);
    return (
        <div className={darkMode ? 'app dark' : 'app'}>
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />}/>
                        <Route path='login' element={<Login/>}/>
                        <Route path='users'>
                            <Route index element={<List type={'users'}/>}/>
                            <Route path=':userId' element={<User/>}/>
                            <Route path='new' element={<UserNew />}/>
                            {/*<Route path='new' element={<New inputs={userInputs} title={'Add New User'}/>}/>*/}
                        </Route>
                        <Route path='brands'>
                            <Route index element={<List type={'brands'}/>}/>
                            <Route path=':brandId' element={<Brand/>}/>
                            <Route path='new' element={<BrandNew/>}/>
                        </Route>
                        <Route path='models'>
                            <Route index element={<List type={'models'}/>}/>
                            {/*<Route path=':brandId' element={<Brand/>}/>*/}
                            <Route path='new' element={<ModelNew/>}/>
                        </Route>

                        {/*<Route path='products'>*/}
                        {/*    <Route index element={<List type={'products'}/>}/>*/}
                        {/*    <Route path=':productId' element={<ProductSingle/>}/>*/}
                        {/*    <Route path='new' element={<ProductNew inputs={productInputs} title={'Add New Product'}/>}/>*/}
                        {/*</Route>*/}
                    </Route>
                </Routes>
        </div>
    );
};

export default App;