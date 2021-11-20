import {
    ContactPhoneSharp,
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from "@material-ui/icons";
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

Product.propTypes = {
    item: PropTypes.object,
    hanldeClickDetail: PropTypes.func,
};
Product.defaultProps = {
    item : {},
    hanldeClickDetail: null

}


const Info = styled.div`
    width:100%;
    height:100%;
    position: absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:3; 
    background-color: rgba(0, 0, 0, 0.2);
    opacity:0;
    transition:all .3s ease-in-out;
`;
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 300px;
    max-width:calc(50% - 10px);
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
  
  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
    height:200px;
    width:200px;
    position: absolute;
    border-radius:50%;
    background-color:white;
`;

const Image = styled.img`
height:75%;
object-fit:cover;
z-index:2;
`;


const Icon = styled.div`
height:40px;
width:40px;
border-radius:50%;
background-color:white;
margin:10px;
display:flex;
justify-content:center;
align-items:center;
cursor: pointer;
&:hover {
background-color: #e9f5f5;
transform: scale(1.1);
  }
transition:all .2s ;
`;

function Product(props) {
    const {item,hanldeClickDetail} = props
    return (
        <Container>
            <Circle />
            <Image
                src={item.img}
            ></Image>
            <Info>
                <Icon
                >
                    <ShoppingCartOutlined />
                </Icon>
                <Icon
                onClick={hanldeClickDetail}
                >
                    <SearchOutlined />
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>

            </Info>
        </Container>
    );
}

export default Product;