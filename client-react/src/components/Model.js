import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`
const TitleWrapper = styled.div`
  position: absolute;
  z-index: 150;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 15%;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%);

`
const Title = styled.h2`
  position: absolute;
  color: ${props => props.theme.colors.light};
  font-weight: 500;
  font-size: 30px;

`
const StyledImg = styled.img`
  width: 100%;
  height: calc(100vh - 60px) ;
  object-fit: cover;
`
const Model = ({model}) => {

    return (
        <div>
            <Wrapper>
                <TitleWrapper><Title>{model.name}</Title></TitleWrapper>
                <StyledImg src={`${process.env.REACT_APP_PUBLIC_URL}/images/${model.image}`} alt={model.name}/>

            </Wrapper>
        </div>
    );
};

export default Model;