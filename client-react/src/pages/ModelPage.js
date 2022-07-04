import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import styled, {css} from "styled-components";
import {data} from "../data";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import {v4 as uuid} from "uuid"
import FeatureDetailsDialog from "../components/FeatureDetailsDialog";
import {useDispatch} from "react-redux";
import {productActions} from "../redux/slices/productSlice";

const Container = styled.div`
  width: 100vw;
  display: flex;
  padding-top: 60px;
  color: ${props => props.theme.colors.main}
`

const WrapperSlider = styled.div`
    //background-color: ${props => props.theme.colors.smoke};
  background: radial-gradient(#FAEFD4, ${props => props.theme.colors.smoke} 60%);
  flex: 3;
  overflow: hidden;
  position: relative;
`

const Right = styled.div`
  flex: 1;
`
const Title = styled.h1`
  text-align: center;
`
const FeatureItems = styled.div`
  display: flex;
  padding: 10px;
  gap: 20px;
  justify-content: center;
  align-items: center;
`

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px
`

const FeatureItemData = styled.div`
  font-size: 24px;
  font-weight: 500;
`
const FeatureItemDataSpan = styled.span`
  font-size: 16px;
`
const FeatureItemDesc = styled.div`
  font-size: 14px;
`

const FeatureDetails = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`
const FeatureDetailsButton = styled.button`
  border: none;
  border-radius: 10px;
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.main};
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
`

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`
const Feature = styled.div`

`
const FeatureTitle = styled.h2`
  text-align: center;

`
const Circles = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`
const Circle = styled.div`
  display: block;
  border-radius: 50%;
  height: 43px;
  width: 43px;
  margin: 0;
  ${props =>
          (props.active &&
                  css`
                    box-shadow: 0 0 0 2px ${props => props.theme.colors.buttonBlue};
                  `)

  }

  border: 2px solid #fff;

  background: radial-gradient(circle at 20px 20px,
  ${props => {
    switch (props.bg) {
      case "white":
        return props.theme.gradient.white.first;
      case "grey":
        return props.theme.gradient.grey.first;
      case "blue":
        return props.theme.gradient.blue.first;
      case "black":
        return props.theme.gradient.black.first;
      case "red":
        return props.theme.gradient.red.first;
      case "crem":
        return props.theme.gradient.crem.first;
      default:
        return props.theme.gradient.white.first
    }
  }
  }, ${props => {
    switch (props.bg) {
      case "white":
        return props.theme.gradient.white.second;
      case "grey":
        return props.theme.gradient.grey.second;
      case "blue":
        return props.theme.gradient.blue.second;
      case "black":
        return props.theme.gradient.black.second;
      case "red":
        return props.theme.gradient.red.second;
      case "crem":
        return props.theme.gradient.crem.second;
      default:
        return props.theme.gradient.white.second
    }
  }
  });
`
const Wheels = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`
const Wheel = styled.div`
  border-radius: 50%;
  width: 47px;
  height: 47px;
  background: url(${props => props.img});
  ${props =>
          (props.active &&
                  css`
                    box-shadow: 0 0 0 2px ${props => props.theme.colors.buttonBlue};
                  `)

  }

  border: 2px solid #fff;
`
const BottomDesc = styled.div`
  padding: 10px 20px;
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.theme.colors.light};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

`
const Price = styled.div`
  color: ${props => props.theme.colors.buttonBlue};
  font-size: 26px;
  width: 120px;
  text-align: center;
  overflow: hidden;
`
const WrapButton = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
`
const AuthorizeStatus = styled.p`
  font-size: 12px;
  color: ${props => props.theme.colors.buttonBlue};
`
const Button = styled.button`
  background-color: ${props => props.theme.colors.buttonBlue};
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  color: ${props => props.theme.colors.light};
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`
const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.buttonBlue};
`
const WheelDesc = styled.div`

`
const WheelItem = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 5px;
`
const WheelFeature = styled.div`
  font-size: 14px;
  text-align: center;
`

const WheelSpan = styled.span`
  font-weight: ${props => props.markup ? 300 : 500};
`

const ModelPage = () => {
    const dispatch = useDispatch();
    const params = useParams();

    let colorsFind = [];
    const {colorsImg, wheels, interior, model, brands} = data;
    const {pathname} = useLocation();
    const path = pathname.split('/')[1];
    const brandByModelName = brands.find(item => item.name.toLowerCase() === path);
    const modelId = pathname.split('/')[2];
    const wheelByModel = wheels.filter(item => item.modelId === Number(modelId));
    const modelById = model.find(item => item.id === Number(modelId))
    const [activeColor, setActiveColor] = useState("white");
    const [activeInteriorColor, setActiveInteriorColor] = useState("black");
    const [stateWheelId, setStateWheelId] = useState(wheelByModel[0].id)
    const [activeWheelsSize, setActiveWheelsSize] = useState(wheelByModel[0].id);
    const findColorsImg = colorsImg.filter(item => item.name === activeColor && item.modelId === Number(modelId) && item.wheelId === stateWheelId);
    colorsImg.map(item => item.modelId === Number(modelId) && colorsFind.push(item.name));
    const [arrayForSlider, setArrayForSlider] = useState(findColorsImg);
    const interiorFind = interior.filter(item => item.modelId === Number(modelId));
    const [wheel, setWheel] = useState(wheelByModel[1]);
    const [stateInterior, setStateInterior] = useState(interiorFind);

    // const findBrandId = data.brands.filter(item => item.name.toLowerCase() === path)[0].id;
    const colorHandler = (color) => {
        const findColorsImgWidthColor = colorsImg.filter(item => item.name === color && item.modelId === Number(modelId) && item.wheelId === Number(stateWheelId));
        setArrayForSlider(findColorsImgWidthColor);
        setActiveColor(color);
    }
    const wheelHandler = (wheelId) => {
        setStateWheelId(wheelId);
        const findColorsImgWidthWheels = colorsImg.filter(item => item.name === activeColor && item.modelId === Number(modelId) && item.wheelId === Number(wheelId));
        setArrayForSlider(findColorsImgWidthWheels);
        setActiveWheelsSize(wheelId);
        const wheelByModelWithWheelId = wheelByModel.find(item => item.id === wheelId);
        setWheel(wheelByModelWithWheelId)
    }

    const interiorHandler = (interId) => {
        const findInterior = interiorFind.filter(item => item.id === Number(interId));
        setActiveInteriorColor(findInterior[0].color);
        setStateInterior(findInterior);
    }
    const unique = (arr) => {
        return Array.from(new Set(arr)); //или [...new Set(arr)]
    }
    const uniqueColorsFind = unique(colorsFind);
    console.log('params', params)
    useEffect(() => {
        dispatch(productActions.modelById(params))
    }, [dispatch])
    return (
        <>
            <Navbar/>
            <Container>
                <WrapperSlider>
                    <Slider findColorsImg={arrayForSlider} salonImg={stateInterior}/>
                    <BottomDesc>
                        <Price>${(modelById.price + wheel.markup + stateInterior[0].markup).toLocaleString('en-US')}</Price>
                        <WrapButton>
                            <Button disabled={false}>Add to cart</Button>
                            <AuthorizeStatus>You are not authorized for getting access to
                                cart, go to <StyledLink to={'/registration'}>Register</StyledLink> or <StyledLink
                                    to={'/login'}>Signin</StyledLink>
                            </AuthorizeStatus>
                        </WrapButton>
                    </BottomDesc>
                </WrapperSlider>
                <Right>
                    <Title>{modelById.name}</Title>
                    <FeatureItems>
                        <FeatureItem>
                            <FeatureItemData>{modelById.range + wheel.rangeRatio}<FeatureItemDataSpan>{modelById.rangeUnits}</FeatureItemDataSpan></FeatureItemData>
                            <FeatureItemDesc>{modelById.rangeDesc}</FeatureItemDesc>
                        </FeatureItem>
                        <FeatureItem>
                            <FeatureItemData>{modelById.topSpeed}<FeatureItemDataSpan>{modelById.topSpeedUnits}</FeatureItemDataSpan></FeatureItemData>
                            <FeatureItemDesc>{modelById.topSpeedDesc}</FeatureItemDesc>
                        </FeatureItem>
                        <FeatureItem>
                            <FeatureItemData>{modelById.acceleration}<FeatureItemDataSpan>{modelById.accelerationUnits}</FeatureItemDataSpan></FeatureItemData>
                            <FeatureItemDesc>{modelById.accelerationDesc}</FeatureItemDesc>
                        </FeatureItem>
                    </FeatureItems>
                    <FeatureDetails>
                        {/*<FeatureDetailsButton>Feature Details</FeatureDetailsButton>*/}
                        <FeatureDetailsDialog description={modelById.description} brandName={brandByModelName.name}
                                              modelName={modelById.name}/>
                    </FeatureDetails>
                    <Features>
                        <Feature>
                            <FeatureTitle>Paint</FeatureTitle>
                            <Circles>
                                {uniqueColorsFind.map(item => <Circle
                                    key={uuid()}
                                    bg={item}
                                    active={item === activeColor && true}

                                    onClick={() => {
                                        colorHandler(item);
                                    }}
                                />)}
                            </Circles>
                        </Feature>
                        <Feature>
                            <FeatureTitle>Wheels</FeatureTitle>
                            <Wheels>
                                {wheelByModel.map(item => <Wheel
                                    img={`${process.env.REACT_APP_PUBLIC_URL}/images/${item.image}`}
                                    key={item.id}
                                    active={item.id === activeWheelsSize && true}
                                    onClick={() => {
                                        wheelHandler(item.id);
                                    }}
                                />)}
                            </Wheels>
                            <WheelDesc>
                                <WheelItem><WheelSpan>{wheel.size}″ {wheel.description} </WheelSpan><WheelSpan
                                    markup>{wheel.markup === 0 ? 'Included' : `$ ${wheel.markup}`}</WheelSpan></WheelItem>
                                <WheelFeature>Range (est.): {modelById.range + wheel.rangeRatio}</WheelFeature>

                            </WheelDesc>
                        </Feature>
                        <Feature>
                            <FeatureTitle>Interior</FeatureTitle>
                            <Circles>
                                {interiorFind.map(item => <Circle
                                    bg={item.color}
                                    key={item.id}
                                    active={item.color === activeInteriorColor && true}
                                    onClick={() => {
                                        interiorHandler(item.id);
                                    }}
                                />)}
                            </Circles>
                        </Feature>
                    </Features>
                </Right>
            </Container>
        </>
    );
};

export default ModelPage;