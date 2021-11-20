
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProductDetailInCart from '../components/ProductDetailInCart'
import { resetProduct } from '../redux/cartSlice';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import { ipad,mobile } from '../responsive';





const Title = styled.div`
 height:80px;
 display:flex;
 justify-content: center;
 align-items: center;
 font-size:35px;
 font-weight:200;
`;

const Top = styled.div`
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding:0 20px;
    `;

const Topbutton = styled.div`
    flex:1;
    display:flex;

    align-items: center;   
    justify-content: ${props=>props.position === "right" ? "end" :""};
    
`;

const Button = styled.button`
    background-color:${props => props.bgColor};
    color:${props => props.color};
    padding:10px 15px;
    font-weight:bold;
    width:${props => props.width ? props.width : "auto"};
    cursor: pointer;
  
`;

const Toptext = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    ${ipad({
        fontSize:"14px",
    })}
    ${mobile({
        display:"none",
    })}
`;

const Toplink = styled.a`
    text-decoration:underline;
    margin:20px;
    ${ipad({
        margin:"10px",
    })}
`;

const CartContent = styled.div`
    max-height:500px;
    display:flex;
    justify-content:center;
    width:100%;
    padding:10px;
    box-sizing:border-box;
    ${mobile({
        flexDirection:"column",
        gap:"20px",
    })}
`;

const ProductDetails = styled.div`
    width:100%;
    overflow-y:scroll;
    flex:3;
    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar
    {
        width: 10px;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
        background-color: teal;
    }
`;

const Summary = styled.div`

    padding:40px;
    flex:1;
    border:0.5px solid gray;
    border-radius:20px;
    ${ipad({
        padding:"20px"
    })}
   
`;

const SummaryTitle = styled.p`
    font-size:30px;
    font-weight:200;
    margin-bottom:30px;
    ${ipad({
        marginBottom:"15px",
        fontSize:"20px",
    })}
`;

const SummaryItem = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:30px;
    font-weight:${props => props.type === "total" && "500"};
    font-size:${props => props.type === "total" && "24px"};
   
`;

const SummaryItemText = styled.span`
    
   
   
`;

const SummaryItemPrice = styled.span`

   
`;



const Cart = () => {
    const stripeKey = "pk_test_51JuHWFF6Weduuqb8Gt3OxC5M9DhtNUdHY1zSiGobvRLbaAPPCQW1eWmxoR8sbl2srZxml316257meGHchlTSFr3R00ZQuk5Eaj"
    const user = useSelector(state=>state.user.currentUser);
    const  dispatch = useDispatch()
    const cartRedux = useSelector(state=>state.cart);
    const navigate = useNavigate();

    const onToken = (stripe) => {
     
        try {
            const res = axios.post('https://vicishop.herokuapp.com/api/checkout/payment', {
                tokenId : stripe.id,
                amount : cartRedux.totalPrice*100,
            }, {
                headers: {token : "beare " + user.token}
            })
            res && navigate('/success',{test: "vinh"})
        }
        catch(err){
            console.log(err)
        }
    }



    return (
        <div>
            <Navbar />
            <Announcement />
            <Title>YOUR BAG</Title>
            <Top>
                <Topbutton position="left">
                   <Link to="/products"> <Button bgColor="transparent" color="black">CONTINUE SHOPPING</Button></Link>
                </Topbutton>
                <Toptext >
                    <Toplink>Shopping Bag({cartRedux.products && cartRedux.products.length})</Toplink>
                    <Toplink>Yout Wishlist(0)</Toplink>
                </Toptext>
                <Topbutton position="right">
                    <Button bgColor="black" color="white">CHECKOUT NOW</Button>
                </Topbutton>
            </Top>
            <CartContent>

                <ProductDetails>
                    {
                      user && cartRedux.products &&  cartRedux.products.map((item,index)=>(
                            <ProductDetailInCart key={index} item={item} />                   
                        ))
                    }
                </ProductDetails>

                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {user ? cartRedux.totalPrice : 0}</SummaryItemPrice>
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
                        <SummaryItemPrice>$ {user ? cartRedux.totalPrice : 0}</SummaryItemPrice>
                    </SummaryItem>
                  
                        <StripeCheckout
                        stripeKey={stripeKey}
                        token = {onToken}
                        name = "VICISHOP"
                        description = "This is test mode 😎😎😎"
                        amount = {cartRedux.totalPrice*100}
                        currency="USD"
                        shippingAddress
                        billingAddress
                        >
                            <Button bgColor="black" color="white" width="100%">CHECKOUT NOW</Button>
                        </StripeCheckout>
                </Summary>

            </CartContent>

            <Footer />
        </div>
    );
};

export default Cart;