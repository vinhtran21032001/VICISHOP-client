import { Send } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import { ipad } from '../responsive';


const Container = styled.div`
    height:60vh;
    display: flex;
    background-color: #fcf5f5;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`;

const Title = styled.h3`
    font-size:70px;
    letter-spacing:1.5px;
    
`;

const Desc = styled.p`
    font-size:25px;
    margin:20px 0;
    ${ipad({
       textAlign:"center", 
    })}
`;

const InputContainer = styled.div`
    width:50%;
    height:40px;
    display:flex;
    justify-content:space-between;
    border: 1px solid lightgray;
`;

const Input = styled.input`
    flex:8;
    border:none;
    
    padding-left:15px;
`;

const Button = styled.button`
    flex:1;
    background-color:teal;
    color:white;
    border:teal;
`;


export default function NewsLetter() {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Get timely updates from your favorite products.</Desc>
            <InputContainer>
                <Input placeholder="Your email" />
                <Button>
                    <Send />
                </Button>
            </InputContainer>

        </Container>
    )
}
