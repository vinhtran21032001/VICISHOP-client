import React, { useState } from 'react';
import styled from 'styled-components';
import { sliderItems } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { ipadPro, ipad, mobile } from '../responsive';

// Import Swiper styles




// import Swiper core and required module



////

const Container = styled.div`
    width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow:hidden;
  ${ipadPro({
        maxHeight:"600px",
    })}
 ${mobile({
        display:"none",
       
    })}
  `;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${props => props.sliderIndex * -100}vw);
    transition: all .4s ease-in;
  
`;

const Slide = styled.div`
    height:100vh;
    width:100vw;
    display: flex;
    align-items: center;
    background-color:#${props => props.bg};
    ${ipadPro({
        maxHeight:"600px",
    })}
`;

const ImageContent = styled.div`
  height: 100%;
  display:flex;
  justify-content:center;
  flex: 1;
  ${ipadPro({
        alignItems:"center",
    })}
  `;

const Image = styled.img`
    width:60%;
    height:80%;
    ${ipadPro({
        maxHeight:"600px",
    })}
`;


const SlideText = styled.div`
    flex :1;
`;


const Title = styled.h3`
    font-size:70px;
   
`;

const Desc = styled.p`
    font-size:20px;
    font-weight:500;
    letter-spacing:3px;
    margin: 50px 0;
`;

const Button = styled.button`
    background-color:transparent;
    padding:15px 25px;
    font-size:20px;
    cursor: pointer;
`;



const Slider = () => {

    return (
        <Container>
            <Wrapper>

                {sliderItems.map(item => {
                    return (
                        <SwiperSlide key={item.id}>
                            <Slide bg={item.bg} >
                            <ImageContent>
                                <Image src={item.img} ></Image>
                            </ImageContent>
                            <SlideText>
                                <Title>
                                    {item.title}
                                </Title>
                                <Desc>
                                    {item.desc}
                                </Desc>
                               <Link to="/products">
                                    <Button>
                                        Shop Now
                                    </Button>
                               </Link>
                            </SlideText>
                            </Slide>    
                        </SwiperSlide>               
                    )
                })}
                   </Wrapper>
        </Container>
    );
};

export default Slider;