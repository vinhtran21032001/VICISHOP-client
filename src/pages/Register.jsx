import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import InputField from '../Custom Field/InputField';
import * as yup from 'yup';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { ArrowRightAlt, Close } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { zoomIn } from 'react-animations';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { registerFail, registerStart, registerSuccess } from '../redux/registor';

const Container = styled.div`
position: relative;
    width:100%;
    height:100vh;

    display:flex;
    justify-content: center;
    align-items: center;

    background: linear-gradient(
        rgba(255,255,255, 0.5),
        rgba(255,255,255, 0.5)
    ), 
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
    background-size: cover;
    background-position:cover;
`;

const Wrapper = styled.div`
    width:40%;
    min-width:400px;
    padding:20px;
    display:flex;
    flex-direction:column;
    background-color:white;
`;

const Title = styled.p`
    font-size:25px;
    font-weight:300;
    margin-bottom:20px;
`;

// const Form = styled.form`
//   display:flex;
//   flex-wrap:wrap;

// `;

const Input = styled.input`
    min-width:40%;
    flex:1;
    padding:10px 10px;
    margin-top:20px;
    margin-right:10px;
`;

const Agreement = styled.p`
    font-size:12px;
    margin-bottom:20px;
    justify-self:flex-start;
`;

const Button = styled.button`
    padding:15px 100px;
    background-color:teal;
    border:none;
    color :white;
    cursor: pointer;
    &:disabled{
        background-color : #03aaaa;
        cursor:not-allowed;
    }
`;
const FormField = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-around;
`;

const ModalContainer = styled.div`
 
    position: absolute;
    top: 0;
    left:0;
    
    width:100%;
    height:100vh;
    z-index:2;
    background-color: rgba(0,0,0,0.4);

    display:flex;
    justify-content: center;
    align-items: center;

`;

const KfzoomIn = keyframes`${zoomIn}`
const Modal = styled.div`
    position: relative;
    width:30%;
    height:200px;
    background-color:white;
    overflow:hidden;

    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;


    background: linear-gradient(
        rgba(255,255,255,0.8),
        rgba(255,255,255,0.8)
    ),  
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
    background-size:cover;

    animation : .5s ${KfzoomIn};
`;
const IconClose = styled.div`
    position: absolute;
    top:0;
    right:0;
    height:30px;
    width:30px;
    border-radius:5px 0px 5px 5px;
    
    display:flex;
    justify-content: center;
    align-items: center;
    transition:all .2s;
    cursor: pointer;
    &:hover {
        background-color: lightgray;
    }
`;
const TitleModal = styled.div`
    font-size:25px;
    font-weight:400;


`;
const ButtonRedirect = styled.div`
    position: absolute;
    bottom:0;
    right:0;

    width:200px;
    height:50px;
    background-color:teal;

    display:flex;
    justify-content: center;
    align-items: center;
    
    color:white;
    font-size:20px;
    font-weight:200;
    cursor: pointer;
    transition:all .2s;
    &:hover{
        background-color:#059696;
    }
`;

const Register = () => {
    const ref = useRef();
    const [modal, setModal] = useState(false);
    const registerStatus = useSelector(state=>state.registor);
    const dispatch = useDispatch();
   

    const initialValues = {
        name : "",
        lastname: "",
        username: "",
        email : "",
        password : "",
        confirmpassword : "",
      
    }
   
    const schema = yup.object().shape({
        name: yup.string()
        .required("This field is required"),
        lastname : yup.string().required("This field is required"),
        username : yup.string()
        .required("This field is required")
        .min(6, 'Must be more than 6 word')
        .max(16, 'Must be less than 16 word'),
        email : yup.string().email("Must be email invalid").required("This field is required"),
        password : yup.string().required("This field is required").min(6, 'Must be more than 6 word')
        .max(16, 'Must be less than 16 word'),
        confirmpassword : yup.string()
        .oneOf([yup.ref("password")], "Password's not match")
        .required("This field is required!"),
 
        })


        const onSubmit =  async (values, {resetForm }) =>{
            const {confirmpassword,...data} = values;
            dispatch(registerStart());
            try {
                    const res = await axios.post("https://vicishop.herokuapp.com/api/auth/resgistor",data)
                    resetForm();
                    dispatch(registerSuccess())  
            } 
            catch(err) {
                    dispatch(registerFail());
               
            }
           setModal(true);
           
        }



        const handleCloseModal = () => {
            setModal(false)
        }
        
    
        
        // effect

        useEffect(() => {
            const checkClickOutSideModal = (e) => {
                if(ref.current && modal && !ref.current.contains(e.target)) {
                    setModal(false);
                }
            }
            document.addEventListener("mousedown", checkClickOutSideModal);
           return ()=> {
            document.removeEventListener("mousedown", checkClickOutSideModal)
           }
        }, [modal])








    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={onSubmit}
                >
                    {formikProps=>{
                        return (
                            <Form>
                               <FormField>
                               <FastField
                                    name="name"
                                    component={InputField}
                                    
                                    label="Your name"
                                    placeholder="Enter your name"
                                />
    
                                <FastField
                                    name="lastname"
                                    component={InputField}
                                    
                                    label="Your last name"
                                    placeholder="Enter your last name"
                                />
                                <FastField
                                    name="username"
                                    component={InputField}
                                    
                                    label="Your username"
                                    placeholder="Enter username"
                                />
                                <FastField
                                    name="email"
                                    component={InputField}
                                                            
                                    placeholder="Enter your email"
                            
                                />
                                <FastField
                                    name="password"
                                    component={InputField}
                                                              
                                     type="password"
                                     placeholder="Enter your password"
                                />
                                <FastField
                                    name="confirmpassword"
                                    component={InputField}
                                    
                                    type="password"
                                     placeholder="Confirm password"
                                />
                                </FormField>                       
                                <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
                                <Button disabled={registerStatus.isFetching} type="submit">CREATE</Button>     
                            </Form>
                        )
                    }}
                </Formik>
                {modal && <ModalContainer >
                    <Modal ref={ref} >
                        <IconClose onClick={handleCloseModal}><Close/></IconClose>
                        <TitleModal>{registerStatus.Error ? "Account already exist" : "REGISTER SUCCESSFUL"}</TitleModal>
                      { registerStatus.Success  && <Link to="/login"><ButtonRedirect>LOGIN <ArrowRightAlt/></ButtonRedirect></Link>}
                    </Modal>
                </ModalContainer>}
            </Wrapper>
        </Container>
    );
};

export default Register;