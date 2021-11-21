import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Help, KeyboardArrowDown, MoreHoriz, NavigateNext, PersonOutline, Search, Settings, ShoppingCartOutlined,ExitToApp } from '@material-ui/icons'
import { Badge } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { resetProduct } from '../redux/cartSlice';
import { logout } from '../redux/userSlice';
import { mobile } from '../responsive';



const Container = styled.div`
    width:100%;
    height:60px;
    box-sizing:border-box;
    ${mobile({
    })}
`
const Wrapper = styled.div`
    height:100%;
    width:100%;
    padding:5px 20px;
    box-sizing:border-box;  
    display:flex;
    align-content:center;
    justify-content:space-between;
    ${mobile({
        padding:"5px 10px",
    })}
`;


const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    ${mobile({
        justifyContent:"center",
    })}
`;

const Language = styled.span`
    font-size: 14px;
    cursor:pointer ;

    ${mobile({
        display:"none",
    })}
`;

const SearchContainer = styled.div`
    display:flex;
    align-items:center;
    border:0.5px solid lightgray;
    margin-left:25px;
    padding:5px;
    ${mobile({
        width:"100%",
        marginLeft:0
    })}
`;


const Input = styled.input`
    border:none;
    outline:none;
    ${mobile({
        width:"100%",
    })}
`;

const Center = styled.div`
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:30px;
    font-weight:bold;
`;

const Right = styled.div`
    flex:1;
    display:flex;
    justify-content:flex-end;
    align-items:center;
`

const MenuItem = styled.div`
    margin-left:10px;
    display:flex;
    align-items: center;
    padding:8px;
    border-radius:40px;
    transition:.2s all;
    &:hover{
        background-color: #eee;
    }
    ${mobile({
        fontSize: "14px",
        marginLeft:"0px",
        marginRight:"5px",
        padding:0,
    })}
`
const UserImg = styled.img`
    height:30px;
    width:30px;
    border-radius:50%;
    margin-right:10px;
`;

const Username = styled.span`
    font-weight:500;
`;
const LinkItem = styled(Link)`
    color:black;
    text-decoration:none;
`;


const ToolStrip = styled.div`
    display : ${props=>props.status ? "block" : "none"};
    z-index :5;
    position:absolute;
    width:300px;
    top:80px;
    right:80px;
    background-color:white;
    padding:10px;
    ${mobile({
        right:"50px",
        width:"200px",
    })}
`;




const MyProfile = styled.div`
    position: relative;
    display:flex;
    justify-content:space-evenly;
    align-items: center;
    padding:10px 0;
    border-radius:20px;
    cursor: pointer;
    
    &:hover{
        background-color:#eee;
    }
    &::after{
        content:"";
        position: absolute;
        width:90%;
        height:1px;
        background-color:lightgray;
        bottom: -10px;
    }
    
`;
const Avatar = styled.img`
    width:50px;
    height:50px;
    border-radius:50%;
    ${mobile({
        width:"40px",
        height:"40px",
    })}

`;
const MyInfo = styled.div`

`;
const MyName = styled.div`
    margin-bottom:5px;
    font-weight:600;
    font-size:18px;
    ${mobile({
        fontSize:"16px",
        display:"flex",
        justifyContent:"center",
        alignItems :"center",
    })}
`;
const MyTitle = styled.p`
    ${mobile({
        display:"none",
    })}
`;

const ToolMenu = styled.div`
    padding:10px;
    ${mobile({
        padding:0,
    })}
    
`;
const ToolItem = styled.div`
    display:flex;
    align-items: center;
    justify-content:space-between;
    margin-top:10px;
    padding:10px 0 ;
    border-radius:20px;
    cursor: pointer;
    &:hover{
        background-color:#eee;
    }
    ${mobile({
        marginTop:"5px",
       
    })}

`;


const ToolText = styled.div`
    display:flex;
    align-items: center;
    ${mobile({
        fontSize:"12px",
    })}
`;
const ToolIcon = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:26px;
    height:40px;
    width:40px;
    border-radius:50%;
    background-color:#eee;
    ${mobile({
        width:"30px",
        height:"30px",
    })}

`;

const TitleTool = styled.p`

    margin-left:10px;
    font-weight:500;
`;


function Navbar() {
    const [isToolStrip, setIsToolStrip] = useState(false)
    // const [amout,setAmount] = useState(0);
    

    let user = useSelector(state=>state.user.currentUser);
   
    let cartRedux = useSelector(state=>state.cart); 

    // useEffect 
    

    const dispatch = useDispatch()


    // function

    const hanldeClickLogout = ()=> {
        localStorage.removeItem("persist:root");
        setIsToolStrip(false);
        dispatch(logout());
        user = null;
        dispatch(resetProduct({}));
    }


    useEffect(()=>{
        const getCart = async () => {
            try {
              const res  = await axios.get("https://vicishop.herokuapp.com/api/cart/find", {
                  headers: {token : "Beare " + user.token }
              })
          
              if( res.data.products.length > 0) {
                  console.log(res.data)
                  dispatch(resetProduct(res.data));
              }
            } 
            catch(err){
                console.log(err)
            }
        }
       user && getCart();
       console.log("check")
    },[user])


    // useEffect(()=>{
    //     const getCart = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:4000/api/cart/find',{
    //             headers : {token : "Beare " + user.token}
    //         });
    //         setAmount(res.data.products.length);
    //         }
    //         catch (err) {
    //             console.log(err)
    //         }

    //     }
    //     getCart();
    // },[amout])

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input
                            placeholder="Search"
                        ></Input>
                        <Search></Search>
                    </SearchContainer>
                </Left>
                <Center>
                    <LinkItem to="/">
                        VICI.
                    </LinkItem>
                </Center>
                <Right>
                  {user ?   
                  <>
                    <MenuItem>
                        <UserImg src={user.img || "https://i.ibb.co/7C1X4Cp/24-248253-user-profile-default-image-png-clipart-png-download.png"}></UserImg>
                        <Username> {user.name + " " + user.lastname + "    "} </Username>
                    </MenuItem> 
                    <MenuItem onClick={()=>setIsToolStrip(!isToolStrip)}>
         
                        <KeyboardArrowDown/>
           
                    <ToolStrip  status = {isToolStrip}>
                        <MyProfile>
                            <Avatar src={user.img || "https://i.ibb.co/7C1X4Cp/24-248253-user-profile-default-image-png-clipart-png-download.png"}/>
                            <MyInfo>
                                <MyName>{user.name + " " + user.lastname}</MyName>
                                <MyTitle>Xem trang cá nhân của bạn</MyTitle>
                            </MyInfo>
                          
                        </MyProfile>
                       <ToolMenu>
                       <ToolItem>
                            <ToolText>
                                <ToolIcon><MoreHoriz/></ToolIcon>
                                <TitleTool>Chuyển trang cá nhân</TitleTool>
                            </ToolText>
                            <NavigateNext/>
                        </ToolItem>
                        <ToolItem>
                            <ToolText>
                            <ToolIcon> <Settings/></ToolIcon>
                           
                                <TitleTool>Cài đặt và quyền riêng tư</TitleTool>
                            </ToolText>
                            <NavigateNext/>
                        </ToolItem>
                        <ToolItem>
                            <ToolText>
                            <ToolIcon> <Help/></ToolIcon>
                               
                                <TitleTool>Trợ giúp và hổ trợ</TitleTool>
                            </ToolText>
                            <NavigateNext/>
                        </ToolItem>
                        <ToolItem>
                            <ToolText>  
                            <ToolIcon><Settings/></ToolIcon>
                         
                            <TitleTool>Màn hình và trợ năng</TitleTool>
                            </ToolText>
                            <NavigateNext/>
                        </ToolItem>
                        <ToolItem onClick={hanldeClickLogout}>
                            <ToolText>
                            <ToolIcon><Settings/></ToolIcon>
                            <TitleTool>Đăng xuất</TitleTool>
                            </ToolText>
                            <NavigateNext/>
                        </ToolItem>
                       </ToolMenu>
                    </ToolStrip>
                    </MenuItem>
                    </>






                    : <>
                    <MenuItem>
                    <LinkItem to="/registor">
                        REGISTOR
                    </LinkItem>
                    </MenuItem>
                    <MenuItem>
                        <LinkItem to="/login">
                            LOGIN
                        </LinkItem>
                    </MenuItem>
                    </>
                    }
                    <MenuItem>
                        <LinkItem to="/cart">
                            <Badge badgeContent={user && cartRedux.products ? cartRedux?.products.length : 0} color="primary">
                                <ShoppingCartOutlined></ShoppingCartOutlined>
                            </Badge>
                        </LinkItem>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container >
    );
}

export default Navbar;