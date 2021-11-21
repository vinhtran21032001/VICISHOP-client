import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import styled from 'styled-components';

import { login } from '../redux/apiCall';

const Container = styled.div`
    width:100%;
    height: 100vh;

    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ),  
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;

    background-size: cover;

    display:flex;
    justify-content:center;
    align-items:center;
`;

const Wrapper = styled.div`
    width:25%;
    min-width:300px;
    display:flex;
    flex-direction:column;

    padding:20px;
    background-color:white;

`;

const Title = styled.h3`
    font-size:23px;
    font-weight:300;
    margin:0;
`;

const Form = styled.form`
    display:flex;
    flex-direction:column;
`;

const Input = styled.input`
    height:35px;
    margin-top:20px;
    padding-left:10px;
    border:1px solid gray;
`;

const Button = styled.button`
    width:150px;
    border:none;
    background-color:teal;
    color:white;
    height:45px;
    margin-top:15px;
    &:disabled{
        color:red;
        cursor:not-allowed
    }
    cursor: pointer;
`;
const Error = styled.p`
    color:red;
`;

const LinkItem = styled.a`
    font-size:12px;
    text-decoration:underline;
    margin-top:10px;
`;


function Login() {
    const {error, isFetching} = useSelector(state=>state.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    // function
    const hanldeSubmit = (e) => {
        e.preventDefault();
        login(dispatch, {
            username,
            password
        })
    }


    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input 
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder="username"></Input>
                    <Input 
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    placeholder="password"></Input>
                    <Button
                    onClick = {hanldeSubmit}
                    disabled={isFetching}
                    >LOGIN</Button>
                    {error && <Error>Something went wrong...!</Error>}
                     <LinkItem>DO NOT YOU REMEMBER THE PASSWORD?</LinkItem>
                    <LinkItem><Link to="/registor">CREATE A NEW ACCOUNT</Link></LinkItem>
                </Form>

            </Wrapper>
        </Container>
    );
}

export default Login;