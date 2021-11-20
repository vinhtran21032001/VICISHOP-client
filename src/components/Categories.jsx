import React from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import { categories } from '../data'
import {ipad} from '../responsive'




const Container = styled.div`
    width:100%;
    position: relative;
`;

const Wrapper = styled.div`
    display:flex;
    align-items: center;
    ${ipad({
        flexDirection:"column",
       
    })}
`;



const Categories = () => {
    return (
        <Container>
            <Wrapper>
                {categories.map(item => (
                    <CategoryItem key={item.id}
                        imgURL={item.img}
                        title={item.title}
                        cat = {item.categoryName}
                    />
                ))}
            </Wrapper>
        </Container>
    );
};

export default Categories;