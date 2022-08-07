import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {data} from './data';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ModelPage from "./pages/ModelPage";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "./redux/slices/productSlice";
import Cart from "./pages/Cart";


const App = () => {
    // const cat = data.brands;
    const cat = useSelector(state => state.product.allBrands);
    const dispatch = useDispatch();
    // const handleCallbackResponse = (response) => {
    //     console.log("Encoded JWT ID token: " + response.credentials);
    // }
    useEffect(() => {
        dispatch(productActions.brand())
        dispatch(productActions.model())
    }, [])
    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //         callback: handleCallbackResponse
    //     });
    //     google.accounts.id.renderButton(
    //         document.getElementById("signInDiv"),
    //         {theme: "outline", size: "large"}
    //     )
    // }, [])
    return (
        <>
            {/*<div id="signInDiv"></div>*/}
            {cat.length &&
            <Routes>
                <Route path={'/'} element={<Navigate to={`/${cat[0].name.toLowerCase()}`}/>}/>
                {cat.map(item =>
                    <React.Fragment key={item.id}>
                        <Route path={`/${item.name}`} element={<Home category={item}/>}/>
                        <Route path={`/${item.name}/:id`} element={<ModelPage/>}/>
                    </React.Fragment>
                )}
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
            </Routes>
            }
        </>
    )

};

export default App;