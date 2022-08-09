import React, {useEffect} from 'react';
import {data} from '../data'
import Model from "./Model";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const Container = styled.div`
  padding-top: 60px;
`;
const Models = () => {
    const {allBrands, allModels} = useSelector(state => state.product)
    const {pathname} = useLocation();
    const path = pathname.split('/')[1];


    // const findBrandId = data.brands.filter(item =>item.name.toLowerCase() === path)[0].id;
    const findBrandId = allBrands.find(item =>item.name.toLowerCase() === path).id;

    const models = allModels.filter(item =>item.brandId === findBrandId)

    return (
        <Container>
            {models.map(item => <Model key={item.id} model={item}/>)}
        </Container>
    );
};

export default Models;