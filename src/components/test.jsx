import React from 'react';
import styled from 'styled-components';


const Container = styled.div``;
const Item = styled.div``;

const Test = () => {
    return (
        <Container className="owl-carousel">
            <Item>item1</Item>
            <Item>item2</Item>
            <Item>item3</Item>
        </Container>
    ); 
};

export default Test;