import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import styled, { keyframes } from 'styled-components';
import {bounceInUp, rotateInDownLeft, rubberBand, slideInDown, zoomIn, zoomInDown} from 'react-animations'
import { ZoomIn } from '@material-ui/icons';
import {ipad, mobile} from '../responsive'


const Container = styled.div`

    width:70vw;
    height:100vh;
    padding:50px 0;
    
    box-sizing:border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    margin:0 auto;
`;
const Title = styled.div`
    font-size:80px;
    font-weight:700;
    color:teal;
    ${ipad({
        fontSize:"50px",
        fontWeight:"600"
    })}
    ${mobile({
        fontSize:"30px",
        fontWeight:"600"
    })}
 `;

 const TextZoom = keyframes`${zoomInDown}`;
const TitleChar= styled.span`
    animation: 0.5s ${TextZoom};
    animation-delay : ${props => props.delay*0.125}s;
    animation-fill-mode:backwards;
    margin:0 10px;
    ${mobile({
        margin:"0 2px",
    })}

`;
const ImageContainer = styled.div`
    height:500px;
    width:500px;
`;
const Image = styled.img`
    width:100%;
    height:100%;
`;
const Desc = styled.p`
    font-size:30px;
    ${mobile({
        fontSize:"20px",
    })}
    
`;

const Success = (props) => {

    return (
        <Container>
            <Title>
                <TitleChar delay="1">
                S
                </TitleChar>
                <TitleChar delay="2">
                U
                </TitleChar>
                <TitleChar delay="3">
                C
                </TitleChar>
                <TitleChar delay="4">
                C
                </TitleChar>
                <TitleChar delay="5">
                E
                </TitleChar>
                <TitleChar delay="6">
                S
                </TitleChar>
                <TitleChar delay="7">
                F
                </TitleChar>
                <TitleChar delay="8">
                U
                </TitleChar>
                <TitleChar delay="9">
                L
                </TitleChar>
                <TitleChar delay="9">
                    
                </TitleChar>
                <TitleChar delay="10">
                O
                </TitleChar>
                <TitleChar delay="11">
                R
                </TitleChar>
                <TitleChar delay="12">
                D
                </TitleChar>
                <TitleChar delay="13">
                E
                </TitleChar>
                <TitleChar delay="14">
                R
                </TitleChar>   
            </Title>       
           <ImageContainer>
                <Image src="https://i.ibb.co/5TKP8qG/Pngtree-shopping-521474.png">
                </Image>
            </ImageContainer>
           <Desc>
           Thanks for choosing us
           </Desc>
        </Container>
    );
};

export default Success;