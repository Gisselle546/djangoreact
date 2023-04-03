import React from 'react'
import { HeaderContainer, ListItems, LogoContainer, ListItem, AuthContain } from './Header.style'
import logo from '../../assets/images/logo-grey.png'
import { useRouter } from 'next/router';
import {FiShoppingCart} from 'react-icons/fi';
import styled from 'styled-components';

function Header() {
  const router = useRouter();

  const handleClick = (data: string) =>{
    router.push(`/${data}`);
}

const StyledIcon = styled(FiShoppingCart)`
  vertical-align: middle;
  margin-right: 0.2rem;
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;


  return (
   <HeaderContainer>
         <LogoContainer img={logo.src} onClick={()=>router.push('/')}/>
         <ListItems>
            <ListItem onClick={()=>handleClick('footwear')}>Footwear</ListItem>
            <ListItem>Players</ListItem>
            <ListItem onClick={()=>handleClick('clubs')}>Clubs</ListItem>
            <ListItem onClick={()=>handleClick('national-team')}>National Teams</ListItem>
         </ListItems>
         <AuthContain>
          <StyledIcon onClick={()=>handleClick('cart')}/>
         </AuthContain>
   </HeaderContainer>
  )
}

export default Header