import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled, {css} from "styled-components";
import {RemoveShoppingCart} from "@mui/icons-material";
// import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {v4 as uuid} from "uuid";
import CartProduct from "../components/CartProduct";
import {clearCart} from "../redux/slices/cartSlice";
import {theme} from "../theme";
import AddressDelivery from "../components/AddressDelivery";


const Container = styled.div`

`

const Wrapper = styled.div`
  padding: 60px 20px 20px 20px;
`

const Title = styled.h1`
  font-weight: 300;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

// const TopButton = styled.button`
//   padding: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   border: ${props => props.type === "filled" && "none"};
//   background-color: ${props => props.type === "filled" ? "black" : "transparent"};
//   color: ${props => props.type === "filled" && "white"};
// `

const TopButton = styled.button`
  background-color: ${props => props.type === "filled" ? "black" : props.theme.colors.buttonBlue};
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  color: ${props => props.theme.colors.light};
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  } ;

  &:hover {
    transform: scale(1.03);
  };
`
const TopClearButton = styled.button`
  border: 1px solid ${props => props.theme.colors.buttonBlue};
  padding: 10px 20px;
  border-radius: 10px;
  background-color: transparent;
  color: ${props => props.theme.colors.buttonBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`

const Span = styled.span`
`
const TopTexts = styled.div`

`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

`;
const Info = styled.div`
  flex: 3;
`;


const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-weight: ${props => props.type === "address" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [stateTotal, setStateTotal] = useState(cart.total);
    // const cart = {
    //     products: [{
    //         id: 1,
    //         brand: 'Tesla',
    //         name: 'Model S',
    //         image: 'tesla-model-s-front-blue-19-496daeeab69eb41cff06e0d35610331103.png',
    //         price: 95840,
    //         color: 'blue',
    //         wheelsSize: 19,
    //         interiorColor: 'black',
    //         quantity: 1,
    //     }], quantity: 1, total: 95840
    // }

    return (
        <Container>
            <Navbar/>
            <Wrapper>
                <Title>YOUR CART</Title>
                <Top>
                    <TopButton onClick={() => navigate('/')}>CONTINUE SHOPPING</TopButton>
                    <TopClearButton
                        onClick={
                            () => {
                                dispatch(clearCart());
                                navigate('/');
                            }
                        }><RemoveShoppingCart style={{color: theme.colors.buttonBlue, fontSize: 20}}/><Span>CLEAR
                        CART</Span></TopClearButton>
                    <TopTexts>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>

                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product =>
                            <CartProduct key={product.id} product={product} setStateTotal={setStateTotal}/>
                        )}
                        <Hr/>
                        <AddressDelivery/>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {stateTotal}</SummaryItemPrice>
                        </SummaryItem>
                        {cart.delivery
                            ?
                            <><SummaryItem type="address">
                                <SummaryItemText>Delivery address</SummaryItemText>
                            </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>TO</SummaryItemText>
                                    <SummaryItemPrice>{cart.delivery.firstName} {cart.delivery.lastName}</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Phone</SummaryItemText>
                                    <SummaryItemPrice>{cart.delivery.phone}</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>City</SummaryItemText>
                                    <SummaryItemPrice>
                                        {cart.delivery.city}
                                    </SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Street, apt, zip</SummaryItemText>
                                    <SummaryItemPrice>
                                        {cart.delivery.streetAddress}, {cart.delivery.aptNumber} apt, {cart.delivery.zip} zip
                                    </SummaryItemPrice>
                                </SummaryItem>
                            </>
                            : <SummaryItem type="address">
                                <SummaryItemText>Add address for delivery</SummaryItemText>
                            </SummaryItem>
                        }
                        <TopButton type="filled" disabled={!cart.delivery || !stateTotal}>CHECKOUT NOW</TopButton>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    );
};

export default Cart;