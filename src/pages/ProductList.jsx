import React, { useState } from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import { useLocation } from 'react-router';
import { mobile } from '../responsive';

const HeadingProducts = styled.div`
    margin-top:20px;
    padding:0 20px;
    width:100%; 

    box-sizing:border-box;
    
    display:flex;
    flex-direction:column;
`;
const TitleHeading = styled.p`
    font-size:30px;
`;
const HeadingContainer = styled.div`
    width:90%;
    margin: 0 auto;

    display:flex;
    justify-content:space-between;
    align-items:center;
    ${mobile({
       width:"100%",
      
    })}

`;
const FilterContainer = styled.div`
    flex:1;
    max-width:300px;
    display:flex;
    justify-content:space-around;
    ${mobile({
       flexDirection:"column",
      
    })}
`;
const Title = styled.div`
    font-size:20px;
    margin-right:10px;
    ${mobile({
      fontSize:"16px",
      width:"40px",
    })}
`;
const FilterColor = styled.div`
    display:flex;
    align-items:center;
    ${mobile({
       marginTop:"5px",
   
    })}
   
`;
const FilterColorSelect = styled.select`
    padding:2px 10px;
    font-size:16px;
    ${mobile({
       fontSize:"14px",
       padding:"2px 5px", 
    })}
`;
const FilterColorOption = styled.option`
  
  `;
const FilterSize = styled.div`
     display:flex;
     align-items:center;
     ${mobile({
       marginTop:"5px",
   
    })}
`;
const FilterSizeSelect = styled.select`
  padding:2px 10px;
  font-size:16px;
  ${mobile({
       fontSize:"14px",
       padding:"2px 5px", 
    })}
    `;
const FilterSizeOption = styled.option``;
const SortContainer = styled.div`
    display:flex;
    align-items:center;
    justify-self:flex-end;
`;
const SortSelect = styled.select`
  padding:2px 10px;
  font-size:16px;
  ${mobile({
       fontSize:"14px",
       padding:"2px 5px", 
    })}
`;

const SortOption = styled.option``;


const ProductList = () => {
    const [filters,setFilters] = useState({
    });
    const [sort, setSort] =useState("newest");

    const location = useLocation();
    const cate = location.pathname.split("/")[2];

  
    // function 
    const hanldeFilter = (e) => {
        setFilters({
            ...filters,
            [e.target.name] : e.target.value
        })
    }
    const hanldeSort = (e) => {
        setSort(e.target.value)
    }
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <HeadingProducts>
                <TitleHeading>{cate || "ALL ITEMS"}</TitleHeading>
              <HeadingContainer>
              <FilterContainer>
                    <FilterColor>
                        <Title>Color:</Title>
                        <FilterColorSelect name="color" onChange={hanldeFilter}>
                            <FilterColorOption selected value="">All</FilterColorOption>
                            <FilterColorOption>black</FilterColorOption>
                            <FilterColorOption>blue</FilterColorOption>
                            <FilterColorOption>gray</FilterColorOption>
                            <FilterColorOption>yellow</FilterColorOption>
                            <FilterColorOption>green</FilterColorOption>
                            <FilterColorOption>white</FilterColorOption>
                        </FilterColorSelect>
                    </FilterColor>
                    <FilterSize>
                        <Title>Size:</Title>
                        <FilterSizeSelect name="size" onChange={hanldeFilter}>
                            <FilterSizeOption selected value="">All</FilterSizeOption>
                            <FilterSizeOption>S</FilterSizeOption>
                            <FilterSizeOption>M</FilterSizeOption>
                            <FilterSizeOption>L</FilterSizeOption>
                            <FilterSizeOption>XL</FilterSizeOption>
                        </FilterSizeSelect>
                    </FilterSize>
                </FilterContainer>
                <SortContainer>
                    <Title>Sort :</Title>
                    <SortSelect name="sort" onChange={hanldeSort}>
                        <SortOption value="newest">Newest</SortOption>
                        <SortOption value="acs">Price Acsending</SortOption>
                        <SortOption value="desc">Price Decsending</SortOption>
                    </SortSelect>
                </SortContainer>
              </HeadingContainer>
            </HeadingProducts>
            <Products cate={cate} sort={sort} filters={filters}/>
            <Footer/>
        </div>
    );
};

export default ProductList;