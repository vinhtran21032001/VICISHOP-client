import { Add, Remove } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'; 
import {useLocation, useNavigate} from 'react-router'
import { publicRequest, userRequest } from '../requestMethod';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/cartSlice';
import { ipadPro, mobile } from '../responsive';






Product.propTypes = {
    
};
Product.defaultProps = {

}

const Container = styled.div`
    height:100vh;
    padding:40px;
    display:flex;
 
    ${mobile({
        flexDirection:"column",
        marginBottom:"50px",
    })}

`;

const Image = styled.img`
    height:80%;
    max-width:650px;
    object-fit:cover;
    flex:3; 
    ${ipadPro({
      maxHeight:"400px"
    })}
`;
const ProductInfo = styled.div`
    flex:5;
    padding:40px;
    ${ipadPro({
      padding:"20px",
    })}
      ${mobile({
       display:"flex",
       flexDirection:"column",
       justifyContent:"center",
       alignItems:"center",
    })}
`
const ProductName = styled.h3`
    font-size:30px;
    font-weight:200;

`;
const ProductDesc = styled.p`
    font-size:16px;
    padding-right:30px;
    margin:30px 0 ;
    ${ipadPro({
      margin:"15px 0"
    })}
    ${mobile({
       textAlign:"center",
    })}
`;
const ProductPrice = styled.p`
    font-size:40px;
    font-weight:200;
    margin-bottom:40px;
    ${ipadPro({
      marginBottom:"15px",
    })}
`;
const ProductOption = styled.div`
    display:flex;
    max-width:350px;
    justify-content:space-between;
    margin-bottom:30px;
    ${ipadPro({
      marginBottom:"15px",
    })}
`;
const TitleOption = styled.p`
    font-size:20px;
    font-weight:200;
    margin:0 5px;
`;
const ColorOption = styled.div`
    display:flex;
    align-items:center;
`;
const ColorFilter = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    margin: 0 5px;
    background-color :${props=>props.color};
`;
const SizeOption = styled.div`
    display:flex;
    align-items:center;
`;
const SizeFilter = styled.select`
    padding:5px 5px;
    height:30px;
    margin-left:5px;
    border: ${props=> props.sizeError ? "1px solid red" : ""};
    color:${props=> props.sizeError ? "red" : ""};
`;
const SizeFilterOption = styled.option``;
const ProductCounter = styled.div`
    display:flex;
    max-width:350px;
    justify-content:space-between;
`;
const AmountContainer = styled.div`
    display: flex;
    align-items:center;

`;
const Amount = styled.span`
    display:inline-block;
    width:30px;
    height:30px;

    border-radius:10px;
    border:1px solid teal;

    display:flex;
    justify-content: center;
    align-items: center;

    margin:0 10px;
    font-size:18px;
    font-weight:600;
`;
const Button =styled.button`
    background-color:transparent;
    padding:15px 20px;
    border:2px solid teal;
    cursor: pointer;
`;

function Product(props) {
    const [sizeError,setSizeError] = useState(false);
    const [product, setProduct] = useState({})
    const [amount,setAmount] = useState(1);
    const [color,setColor] = useState("");
    const [size,setSize] = useState("")

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const user = useSelector(state=>state.user.currentUser);
    // function 

    const hanleChangeAmount = (num) => {
        if(num < 0) {
            amount > 1 && setAmount(amount -1)
        } else {
          setAmount(amount +1)      
        }
    }
    const hanldeChangeFilter = (e) => {
        setSize(e.target.value)
        setSizeError(false);
    }


    const hanldeAddToCart = () => {
        if(size == "") {
            setSizeError(true)
            return
        } 
        const action = addProduct({
            product: {
                productId: product._id,
                title : product.title,
                amount : amount,
                color : color,
                size : size,
                price : product.price,
                img : product.img
            },
            price: amount*product.price
        })

        setSizeError(false) 
        const data = {
           product:{
                    productId: product._id,
                    title : product.title,
                    amount : amount,
                    color : color,
                    size : size,
                    price :product.price,
                    img : product.img,
               }, 
            totalPrice : product.price*amount,
        }
        const creatCart = async () => {
           try{
            const res  = await axios.post('https://vicishop.herokuapp.com/api/cart',data,{
                headers : {token : "Beaer " + user.token}
            })
            
            dispatch(addProduct(res.data))
           }
           catch (err) {
            navigate('/login')
           }
        }
        creatCart();
    }







    useEffect(() => {
        const getProduct = async ()=> {
            try{
                const res = await publicRequest.get("/product/find/" + productId);          
                setProduct({...res.data});
                setColor(res.data.color[0])
            } catch(err) {
                navigate('/notfound')
            }
        }
        productId && getProduct();
    }, [productId])

    


    return (
       <>
        <Navbar/>
        <Announcement/>
        <Container>
            <Image src={product.img}/>
            <ProductInfo>
                <ProductName>{product.title}</ProductName>
                <ProductDesc>{product.desc}</ProductDesc>
                <ProductPrice>$ {product.price}</ProductPrice>
                <ProductOption>
                    <ColorOption>
                        <TitleOption>Color</TitleOption>
                        {product.color && product.color.map(item=>(
                            <ColorFilter key={item} color={item}/>
                        ))}
                    </ColorOption>
                    <SizeOption>
                    <TitleOption>Size</TitleOption>
                        <SizeFilter sizeError={sizeError} onChange={hanldeChangeFilter}>
                        <SizeFilterOption key="default" disabled  selected>-- Size --</SizeFilterOption>
                            {product.size && product.size.map(item=>(    
                                <SizeFilterOption key={item}>{item}</SizeFilterOption>
                            ))}
                        </SizeFilter>
                    </SizeOption>
                </ProductOption>
                <ProductCounter>
                   <AmountContainer>
                   <Remove
                    onClick = {()=>hanleChangeAmount(-1)}
                    style={{cursor:"pointer"}}/>
                    <Amount>{amount}</Amount>
                    <Add
                    onClick = {()=>hanleChangeAmount(1)}
                    style={{cursor:"pointer"}}
                      />
                   </AmountContainer>
                    <Button
                    onClick={hanldeAddToCart}
                    >
                        ADD TO CART</Button>
                </ProductCounter>
            </ProductInfo>
        </Container>
        <Footer/>
       </>
    );
}

export default Product;