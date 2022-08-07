import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {v4 as uuid} from "uuid"
import styled, {css} from "styled-components";

import {productActions} from "../redux/slices/productSlice";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import FeatureDetailsDialog from "../components/FeatureDetailsDialog";
import {Add, Remove} from "@mui/icons-material";
import {CircularProgress, Stack} from "@mui/material";
import Footer from "../components/Footer";
import {addProduct} from "../redux/slices/cartSlice";


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
      case "cream":
        return props.theme.gradient.cream.first;
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
      case "cream":
        return props.theme.gradient.cream.second;
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
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.buttonBlue};;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
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
    const product = useSelector(state => state.product);
    const {colorsImg, wheels: wheelByModel, interior, currentModel: modelById, allBrands} = product;
    const colors = {
        white: "white",
        black: "black",
        blue: "blue",
        red: "red",
        grey: "grey",
        cream: "cream"
    }
    const dispatch = useDispatch();
    const params = useParams();
    const modelId = Number(params.id);
    const navigate = useNavigate();

    const {pathname} = useLocation();
    const path = pathname.split('/')[1];
    const brandByModelName = allBrands.find(item => item.name.toLowerCase() === path);
    const [activeColor, setActiveColor] = useState(colors.white);
    const [activeInteriorColor, setActiveInteriorColor] = useState(colors.black);
    const [stateWheelId, setStateWheelId] = useState(null);
    const [arrayForSlider, setArrayForSlider] = useState([]);
    const [activeWheelsSize, setActiveWheelsSize] = useState(null);
    const [stateInterior, setStateInterior] = useState([]);
    const [wheel, setWheel] = useState(null);
    const [uniqueColors, setUniqueColors] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const colorHandler = (color) => {
        const findColorsImgWidthColor = colorsImg.filter(item => item.name === color && item.modelId === modelId && item.wheelId === Number(stateWheelId));
        setArrayForSlider(findColorsImgWidthColor);
        setActiveColor(color);
    }
    const wheelHandler = (wheelId) => {
        setStateWheelId(wheelId);
        const findColorsImgWidthWheels = colorsImg.filter(item => item.name === activeColor && item.modelId === modelId && item.wheelId === Number(wheelId));
        setArrayForSlider(findColorsImgWidthWheels);
        setActiveWheelsSize(wheelId);
        const wheelByModelWithWheelId = wheelByModel.find(item => item.id === wheelId);
        setWheel(wheelByModelWithWheelId)
    }

    const interiorHandler = (interId) => {
        const findInterior = interior.filter(item => item.id === Number(interId));
        setActiveInteriorColor(findInterior[0].color);
        setStateInterior(findInterior);
    }


    useEffect(() => {
        dispatch(productActions.modelById(modelId));


    }, [])

    useEffect(() => {
        if (wheelByModel.length && colorsImg.length) {
            setStateWheelId(wheelByModel[0].id);
            setActiveWheelsSize(wheelByModel[0].id);
            const set = new Set();
            colorsImg.map(item => item.modelId === modelId && set.add(item.name));
            setUniqueColors(Array.from(set));
            setWheel(wheelByModel[1]);
            setStateInterior(interior)
            const findColorsImg = colorsImg.filter(item => item.name === activeColor && item.modelId === modelId && item.wheelId === wheelByModel[0].id);
            setArrayForSlider(findColorsImg)
        }

    }, [product.wheels, product.colorsImg, product.interior, modelId])
    if (!modelId) {
        return null
    }
    const handleQuantity = (type) =>{
        if(type === "dec"){
            setQuantity(prev => prev === 1 ? prev : prev - 1)
            // quantity > 1 && setQuantity( quantity - 1)
        }else {
            setQuantity(prev => prev + 1);
            // setQuantity( quantity + 1)
        }
    }
    const handleClick = () =>{
        dispatch(addProduct({
            id:modelById.id,
            name:modelById.name,
            price:(modelById.price + wheel.markup + stateInterior[0].markup)*quantity,
            brand:brandByModelName.name,
            color: activeColor,
            interiorColor: activeInteriorColor,
            wheelsSize:wheel.size,
            image:arrayForSlider.find(item => item.angle === 'front').image,
            quantity}));
        navigate('/cart');
    }
    return (
        <>
            <Navbar/>
            <Container>
                {modelById && wheel && colorsImg.length && uniqueColors.length && <><WrapperSlider>
                    <Slider findColorsImg={arrayForSlider} salonImg={stateInterior}/>
                    <BottomDesc>
                        <AddContainer>
                        <Price>${(modelById.price + wheel.markup + stateInterior[0].markup).toLocaleString('en-US')}</Price>
                        <AmountContainer>
                            <Remove onClick={()=> handleQuantity('dec')}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=> handleQuantity('inc')}/>
                        </AmountContainer>
                        </AddContainer>
                        <WrapButton>
                            <Button onClick={handleClick} disabled={false}>Add to cart</Button>
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
                                <FeatureItemData>{modelById.range + wheel.rangeRatio}</FeatureItemData>
                                <FeatureItemDesc>{modelById.rangeUnits}</FeatureItemDesc>
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
                            <FeatureDetailsDialog description={modelById.description} brandName={brandByModelName.name}
                                                  modelName={modelById.name}/>
                        </FeatureDetails>
                        <Features>
                            <Feature>
                                <FeatureTitle>Paint</FeatureTitle>
                                <Circles>
                                    {uniqueColors.map(item => <Circle
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
                                        img={`${process.env.REACT_APP_API}/${item.image}`}
                                        key={item.id}
                                        active={item.id === activeWheelsSize && true}
                                        onClick={() => {
                                            wheelHandler(item.id);
                                        }}
                                    />)}
                                </Wheels>
                                <WheelDesc>
                                    <WheelItem><WheelSpan>{wheel.size}{wheel.sizeUnits === 'inch'? '″': wheel.sizeUnits} {wheel.description} </WheelSpan><WheelSpan
                                        markup>{wheel.markup === 0 ? 'Included' : `$ ${wheel.markup}`}</WheelSpan></WheelItem>
                                    <WheelFeature>Range (est.): {modelById.range + wheel.rangeRatio}</WheelFeature>

                                </WheelDesc>
                            </Feature>
                            <Feature>
                                <FeatureTitle>Interior</FeatureTitle>
                                <Circles>
                                    {interior.map(item => <Circle
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
                </>}
            </Container>
            <Footer/>
        </>
    );
};

export default ModelPage;