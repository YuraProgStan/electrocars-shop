import React from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
`
const Title = styled.h2`
  position: absolute;
  color: ${props => props.theme.colors.light};
  font-weight: 500;
  font-size: 30px;

`
const StyledImg = styled.img`
  width: 100%;
  height: calc(100vh - 60px);
  object-fit: cover;
`

const DescriptionWrap = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  color: ${props => props.theme.colors.light};
`
const Feature = styled.div`

`
const FeatureDesc = styled.div`
  font-weight: bold;
  font-size: 20px;
`

const FeatureName = styled.div`

`
const StyledLink = styled(Link)`
  border: 1px solid ${props => props.theme.colors.light};
  border-radius: 10px;
  background-color: transparent;
  color: ${props => props.theme.colors.light};
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  font-weight: 300;
  text-decoration: none;

  &:hover{
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.main};;
  }
  & a{
    text-decoration: underline;
  }
`
const Model = ({model}) => {
    const navigate = useNavigate();

    return (
        <div>
            <Wrapper>
                <TitleWrapper><Title>{model.name}</Title></TitleWrapper>
                <StyledImg src={`${process.env.REACT_APP_API}/${model.image}`} alt={model.name}/>
                <DescriptionWrap>
                    <Feature>
                        <FeatureDesc>{model.range}</FeatureDesc>
                        <FeatureName>{model.rangeUnits}</FeatureName>
                    </Feature>
                    <Feature>
                        <FeatureDesc>{model.topSpeed}</FeatureDesc>
                        <FeatureName>{model.topSpeedDesc}</FeatureName>
                    </Feature>
                    <Feature>
                        <FeatureDesc>{model.acceleration}</FeatureDesc>
                        <FeatureName>{model.accelerationDesc}</FeatureName>
                    </Feature>
                    <Feature>
                        <StyledLink to={`${model.id}`} state={model}>More details...</StyledLink>
                    </Feature>
                </DescriptionWrap>
            </Wrapper>

        </div>
    );
};

export default Model;