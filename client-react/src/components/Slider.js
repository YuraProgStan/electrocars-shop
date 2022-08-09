import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {ArrowLeftOutlined, ArrowRightOutlined} from "@mui/icons-material";
import {v4 as uuid} from "uuid"

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.direction === 'left' && '10px'};
  right: ${props => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.8;
  z-index: 2;
`
const Wrapper = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  transition: transform 1.5s ease;
  transform: translateX(${props => props.slideIndex * -100}vw);
  
`
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  // background-color: #${props => props.bg};

`
const ImgContainer = styled.div`
  height: 100vh;
  flex: 1;
`
// const InfoContainer = styled.div`
//   flex: 1;
//   padding: 50px;
// `
// const Title = styled.h1`
//   font-size: 70px;
// `
// const Desc = styled.p`
//   margin: 50px 0;
//   font-size: 20px;
//   font-weight: 500;
//   letter-spacing: 3px;
// `
// const Button = styled.button`
//   padding: 10px;
//   font-size: 20px;
//   background-color: transparent;
//   cursor: pointer;
// `
const Image = styled.img`
  object-fit: contain;
  ${props =>
          (props.salon &&
                  css`
                   height: 100vh;
                   object-fit: cover;
                  `)

  }
  
`
const Slider = ({findColorsImg, salonImg}) => {

    findColorsImg = [...findColorsImg,{...salonImg[0], id: uuid()}]
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : findColorsImg.length - 1)
        } else {
            setSlideIndex(slideIndex === findColorsImg.length - 1 ? 0 : slideIndex + 1)
        }
    }
    return (
        <>
            <Container>
            <Arrow direction="left" onClick={() => handleClick('left')}>
                <ArrowLeftOutlined/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {findColorsImg.map(item => (
                    <Slide key={item.id} bg={item.bg}>
                        <ImgContainer>
                            <Image src={`${process.env.REACT_APP_API}/${item.image}`} salon={!item.name && true}/>
                        </ImgContainer>
                        {/*<InfoContainer>*/}
                        {/*    <Title>{item.title}</Title>*/}
                        {/*    <Desc>{item.desc}</Desc>*/}
                        {/*    <Button>SHOW NOW</Button>*/}
                        {/*</InfoContainer>*/}
                    </Slide>
                ))}

            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick('right')}>
                <ArrowRightOutlined/>
            </Arrow>
        </Container>
        </>
    );
};

export default Slider;