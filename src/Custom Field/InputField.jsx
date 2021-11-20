import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


InputField.propTypes = {
    form : PropTypes.object.isRequired,
    field : PropTypes.object.isRequired,
    
    onSendMail: PropTypes.func,
    type: PropTypes.string,
    placeholder : PropTypes.string,
    sendmail : PropTypes.bool,
};

InputField.defaultProps = {
    onSendMail: null,
    sendmail: false,
    type : "text",
    placeholder : "",
}

const Input = styled.input`
    width:100%;
    box-sizing:border-box;
    height:40px;
`;

const MessageErrors = styled.p`
    font-size:14px;
    color:red;
`;
const FormGroup = styled.div`
    position: relative;
    height:65px;
    width:45%;
    box-sizing:border-box;
`;
const ButtonSend = styled.a`
    position: absolute;
    right: 0;
    top : 0;
    width:70px;
    height:40px;
    background-color:teal;
    color:white;
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center;
     &:disabled{
        opacity:0.5;
        cursor: not-allowed;
     }

`;



function InputField(props) {



    const {form, field} = props;
    const {name} = field
    const {type, label, placeholder} = props;
    const {errors, touched} = form;

    const showErrors = errors[name] && touched[name];






   
    return (
        <FormGroup>
        <Input
            {...field}
           
            placeholder={placeholder}
            type={type}
            
        />
        {showErrors && <MessageErrors>{errors[name]}</MessageErrors> || ""}
        </FormGroup>
            
       
    );
}

export default InputField;