import React from 'react';
import styled from 'styled-components';



const Container = styled.div`
    height:30px;
    background-color:teal;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Title = styled.p`
color:white;
`;

function Announcement() {
    return (
        <Container>
            <Title>
                Supper Deal! Free Shipping on Order over %50
            </Title>
        </Container>
    );
}

export default Announcement;