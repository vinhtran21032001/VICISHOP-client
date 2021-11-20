import React from 'react';
import { Facebook, Instagram, LocalPhoneOutlined, Mail, MailOutlineOutlined, Room, Twitter } from '@material-ui/icons';
import styled from 'styled-components';
import { ipad, mobile } from '../responsive';


const Container = styled.div`
box-sizing:border-box;
    width:100%;
    height:35vh;
    display:flex;
    padding:20px;
  
      ${mobile({
       flexDirection:"column",
    })}
`;

const ShopInfo = styled.div`
    flex:1;
   padding:0 20px;
   ${mobile({
         padding:0,
    })}
`;

const TitleName = styled.h2`
    font-size:35px;
    font-weight: 700;
`;

const Desc = styled.p`
    font-size:15px;
    letter-spacing:1.1px;
    padding:15px 0;
`;

const SocialContainer = styled.div`
    display:flex;
`;

const SocialIcon = styled.a`
    display:block;
    background-color: #${props => props.color};
    height:40px;
    color:white;
    width:40px;
    border-radius:15px;
    display:flex;
    justify-content: center;
    align-items:center;
    margin-right:20px;
`;


const UsefulLink = styled.div`
    flex:1;
    ${mobile({
        display:"none", 
    })}
`;
const Title = styled.p`
    font-size:18px;
    font-weight:bold;
    margin-bottom:20px;
`;

const LinkContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
`;

const Link = styled.a`
    flex:1;
    min-width: 40%;
    margin-top:10px;
`;

const Right = styled.div`
    flex:1;
    ${mobile({
        marginTop:"20px",
    })}
`;

const ContactContainer = styled.div`
    display: flex;
    flex-direction:column;  
`;

const MyContact = styled.div`
    margin-top:20px;
    display: flex;
    align-items:center;
    ${mobile({
        marginTop:"10px"
    })}
`;

const Payment = styled.img`
    min-width:200px;
    max-width:50%;
   margin-top:20px;
   `;

function Footer() {
    return (
        <Container>
            <ShopInfo>
                <TitleName>VICI.</TitleName>
                <Desc>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.</Desc>
                <SocialContainer >
                    <SocialIcon target="_blank" href="https://www.facebook.com/profile.php?id=100013204927300" color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Mail />
                    </SocialIcon>
                </SocialContainer>
            </ShopInfo>
            <UsefulLink>
                <Title>Useful Links</Title>
                <LinkContainer>
                    <Link>Home</Link>
                    <Link>Cart</Link>
                    <Link>Man Fashion</Link>
                    <Link>Woman Fashion</Link>
                    <Link>Accessories</Link>
                    <Link>My Account</Link>
                    <Link>Order Tracking</Link>
                    <Link>Wishlist</Link>
                    <Link>Wishlist</Link>
                    <Link>Terms</Link>
                </LinkContainer>
            </UsefulLink>
            <Right>
                <Title>Contact</Title>
                <ContactContainer>
                    <MyContact>
                        <Room />
                        622 Dixie Path , South Tobinchester 98336
                    </MyContact>
                    <MyContact>
                        <LocalPhoneOutlined />
                        +1 234 56 78
                    </MyContact>
                    <MyContact>
                        <MailOutlineOutlined />
                        contact@vici.dev
                    </MyContact>
                    <Payment src="https://i.ibb.co/Qfvn4z6/payment.png">

                    </Payment>
                </ContactContainer>
            </Right>
        </Container>
    );
}

export default Footer;