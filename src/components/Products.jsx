import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import {publicRequest} from '../requestMethod'
import { useNavigate } from 'react-router';
import { ipad } from '../responsive';


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${ipad({
        justifyContent:"center",
    })}
`;


function Products(props) {
    const {cate, filters, sort} = props;
    const [products,setProducts] = useState([])
    const [filterProducts,setFilterProducts] = useState([])
    const navigate = useNavigate();

// lấy sp theo category
    useEffect(()=>{
        const getProducts = async () => {
            try{
                const res = cate ? await publicRequest.get('/product?category='+cate): await publicRequest.get('/product');
                setProducts([...res.data])         
                
            } 
            catch(err) {
                console.log(err)
            }
        }
        getProducts();       
    },[cate])


// lọc sp theo cái filter
    useEffect(() => {
        const getFilterProduct = async ()=> {
            setFilterProducts(
               filters && products.filter(item=>Object.entries(filters).every(([key,value])=> {
                    if(!value) return true
                    return item[key].includes(value);
                }))
        )

    }
    getFilterProduct()

    }, [products, filters])
//sap xeo sp 
    useEffect(() => {
        if( sort !== "" && sort === "newest") {       
            setFilterProducts(prev=>{
                return [...prev].sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
         }) 
        
        } else if(sort !== "" && sort === "acs") {
            setFilterProducts(prev=>{
                return [...prev].sort((a,b)=> a.price - b.price)
            })
        }
        //  else {
        //     setFilterProducts(prev=>{
        //         return [...prev].sort((a,b)=> a.price - b.price)
        //     })
        // }
    }, [sort])


    // function 
    const hanldeClickDetail = (value) => {
        navigate(`/product/${value}`)
    }







    return (
        <Container>
            {filters ? filterProducts.map(item=>{
                return <Product 
                    key={item._id}
                    item={item}
                    hanldeClickDetail={()=>hanldeClickDetail(item._id)}
                    />
            }) : products.slice(0,12).map(item=>{
                return <Product
                    key={item._id}
                    item={item}
                    hanldeClickDetail={()=>hanldeClickDetail(item._id)}
                    />
            })}
        </Container>
    );
}

export default Products;