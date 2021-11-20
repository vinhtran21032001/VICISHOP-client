import { Add, ContactSupportOutlined, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removerProduct } from '../redux/cartSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { mobile } from '../responsive';

ProductDetailInCart.propTypes = {
    updateCountInSummary: PropTypes.func,
    product: PropTypes.object,
}
ProductDetailInCart.defaultProps = {
    updateCountInSummary: null,
    product: {},
}

const Container = styled.div`
    height:200px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom:0.5px solid #eee;
    ${mobile({
        height:"130px",
        marginTop:"20px"
    })}
  
`;
const ImageContainer = styled.div`
    flex :1;
    height:200px;
    display:flex;
    justify-content: center;
    align-items: center;
    ${mobile({
        height:"100px",
    })}

`;

const ProductImage = styled.img`
    height:180px;
  
    object-fit:cover;
    padding:10px 0; 
      ${mobile({
        height:"100px",
    })}

   
`;
const ProductInfo = styled.div`
    box-sizing:border-box;
    padding:30px 0;
    height:100%;
    flex:3;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    ${mobile({
        justifyContent :"start",
        gap:"10px",
        padding:"5px 0"
    })}

`;
const ProductInfoDetail = styled.div`
    display:flex;
    align-items: center;
    ${mobile({
        fontSize:"14px",

    })}
`;
const ProductTitle = styled.p`
    font-weight:bold; 
    margin-right:10px;
`;
const ProductProp = styled.span`
    font-size:18px;
    font-weight:300;
    height:${props => props.color ? "20px" : ""} ;
    width:${props => props.color ? "20px" : ""} ;
    background-color:${props => props.color || ""} ;
    border-radius:${props => props.color ? "50%" : ""} ;
    ${mobile({
        fontSize:"14px",

    })}
`;
const ProductPrice = styled.div`
    height:100%;
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    ${mobile({
        justifyContent :"start",
        gap:"10px",
    })}
`;
const ProductAmountContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;
   
    
`;
const Counter = styled.span`
    display:inline-block;
    text-align:center;
    width:30px;
    font-size:28px;
    margin: 0 10px;
    ${mobile({
        fontSize:"20px",
        width:"15px"
    })}
`;
const Button = styled.div`
    width:100px;
    height:30px;
    background-color:black;
    color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

`;
const Price = styled.p`
    font-size:30px;
    font-weight:200;
    text-align:center;
    ${mobile({
        fontSize:"24px",
    })}
`;


function ProductDetailInCart(props) {
    const user = useSelector(state=>state.user.currentUser)
    const {item} = props;
    const dispatch = useDispatch();
    
    //function 
    const handleClickRemove = (id) => {
        const data = {
            price : item.amount*item.price,
            id : id
        }
       console.log(data);

        const removeItem = async () => {
            try {
                const res = await axios.delete(`https://vicishop.herokuapp.com/api/cart/product/${id}`, {
                    headers: {token : "Beare " + user.token}
                });
               res.data && dispatch(removerProduct(data));
    
            }
            catch (err) {
                console.log(err)
            }
        }
        id && removeItem();

    }

    return (
        <Container>

            <ImageContainer>
                <ProductImage src={item.img}></ProductImage>
            </ImageContainer>
            <ProductInfo>
                <ProductInfoDetail>
                    <ProductTitle>Product: </ProductTitle>
                    <ProductProp>{item.title}</ProductProp>
                </ProductInfoDetail>
                <ProductInfoDetail>
                    <ProductTitle>ID: </ProductTitle>
                    <ProductProp>{item._id}</ProductProp>
                </ProductInfoDetail>
                <ProductInfoDetail>
                    <ProductTitle>Color: </ProductTitle>
                    <ProductProp>{item.color}</ProductProp>
                </ProductInfoDetail>
                <ProductInfoDetail>
                    <ProductTitle>Size: </ProductTitle>
                    <ProductProp>{item.size}</ProductProp>
                </ProductInfoDetail>
            </ProductInfo>
            <ProductPrice>
                <ProductAmountContainer>
                    <Remove style={{ cursor: "pointer"}} />
                    <Counter>{item.amount}</Counter>
                    <Add style={{ cursor: "pointer" }} />
                </ProductAmountContainer>
                <Price>
                    $ {item.price}
                </Price>
            <Button
            onClick = {()=>handleClickRemove(item._id)}
            >Remove</Button>
            </ProductPrice>





        </Container>
    );
};

export default ProductDetailInCart;