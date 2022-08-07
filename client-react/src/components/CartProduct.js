import React, {useState} from 'react';
import {Add, Remove} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const Product = styled.div`
  display: flex;
  justify-content: space-between;

`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`
const Image = styled.img`
  width: 300px;
  object-fit: contain;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductBrand = styled.span``
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
`

const Circle = styled.div`
  display: block;
  border-radius: 50%;
  height: 43px;
  width: 43px;
  margin: 0;
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
const ProductSize = styled.span``
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`

const CartProduct = ({product, setStateTotal}) => {
    const [quantity, setQuantity] = useState(product.quantity);
    const navigate = useNavigate()
    const handleQuantity = (type) =>{
        if(type === "dec"){
            quantity > 1 && setStateTotal( prev => prev - product.price);
            setQuantity(prev => prev === 1 ? prev : prev - 1);


        }else {
            setQuantity(prev => prev + 1);
            setStateTotal(prev=>prev + product.price);
            // setQuantity( quantity + 1)
        }
    }
    return (
       <Product>
           <ProductDetail>
               <Image
                   src={`${process.env.REACT_APP_API}/${product.image}`}/>
               <Details>
                   <ProductId><b>ID:</b> {product.id}</ProductId>
                   <ProductName><b>Product:</b> {product.name}</ProductName>
                   <ProductBrand><b>Brand:</b> {product.brand}</ProductBrand>
                   <ProductColor><b>Color car:</b> <Circle bg={product.color} /></ProductColor>
                   <ProductColor><b>Interior color car:</b> <Circle bg={product.interiorColor} /></ProductColor>
                   <ProductSize><b>Wheels size:</b> {product.wheelsSize}</ProductSize>
               </Details>
           </ProductDetail>
           <PriceDetail>
               <ProductAmountContainer>
                   <Remove onClick={()=> handleQuantity('dec')}/>
                   <ProductAmount>{quantity}</ProductAmount>
                   <Add onClick={()=> handleQuantity('inc')}/>
               </ProductAmountContainer>
               <ProductPrice>$ {product.price * quantity}</ProductPrice>
           </PriceDetail>
       </Product>
    );
};

export default CartProduct;