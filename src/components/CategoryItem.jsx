import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { ipad } from '../responsive';

CategoryItem.propTypes = {
    imgURL: PropTypes.string,
    title: PropTypes.string,
};
CategoryItem.defaultProps = {
    imgURL: "",
    title: "",
}

const Container = styled.div`
    position: relative;
    flex:1;
    height:70vh;
    margin:3px;
    ${ipad({
        width:"100%",
         maxHeight:"400px",
       
    })}
`;

const Image = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`;

const Info = styled.div`
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left: 0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Title = styled.h1`
    color:white;
    font-size:25px;
    letter-spacing:3px;
    margin-bottom:20px;
`;

const Button = styled.button`
    padding:10px 15px;
    border:none;
    cursor:pointer;
`;

function CategoryItem(props) {

    const { imgURL, title, cat } = props;

    return (
        <Container>
            <Image
                src={imgURL}
            ></Image>
            <Info>
                <Title>{title}</Title>
               <Link to={`/products`}> <Button>SHOP NOW</Button></Link>
            </Info>
        </Container>
    );
}

export default CategoryItem;