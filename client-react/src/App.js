import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {data} from './data';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ModelPage from "./pages/ModelPage";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "./redux/slices/productSlice";


const App = () => {
    // const cat = data.brands;
    const cat = useSelector(state => state.product.allBrands);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActions.brand())
        dispatch(productActions.model())
    }, [])
    return (
        <>
        {cat.length &&
                <Routes>
                    <Route path={'/'} element={<Navigate to={`/${cat[0].name.toLowerCase()}`}/>}/>
                    {cat.map(item =>
                        <React.Fragment key={item.id}>
                            <Route path={`/${item.name}`} element={<Home category={item} />}/>
                            <Route path={`/${item.name}/:id`} element={<ModelPage/>}/>
                        </React.Fragment>
                    )}
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
                </Routes>
        }
        </>
    )

};

export default App;