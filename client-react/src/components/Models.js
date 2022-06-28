import React from 'react';
import {data} from '../data'
import Model from "./Model";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 60px;
`;
const Models = () => {
    const models = data.model
    return (
        <Container>
            {models.map(item => <Model key={item.id} model={item}/>)}
        </Container>
    );
};

export default Models;