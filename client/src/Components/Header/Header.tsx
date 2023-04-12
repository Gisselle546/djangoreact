import React from 'react'
import { HeaderContainer, ListItems, LogoContainer, ListItem, AuthContain, CartLength } from './Header.style'
import logo from '../../assets/images/logo-grey.png'
import { useRouter } from 'next/router';
import {FiShoppingCart} from 'react-icons/fi';
import styled from 'styled-components';
import { useStore } from '@/context/cart';

function Header() {
  const router = useRouter();
  const { state } = useStore()
  const handleClick = (data: string) =>{
    router.push(`/${data}`);
}

const StyledIcon = styled(FiShoppingCart)`
  vertical-align: middle;
  margin-right: 0.2rem;
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;

  @media (max-width: 768px) {
   font-size: 1rem;
   margin-top: 0.2rem;
  }
`;


  return (
   <HeaderContainer>
         <LogoContainer img={logo.src} onClick={()=>router.push('/')}/>
         <ListItems>
            <ListItem onClick={()=>handleClick('footwear')}>Footwear</ListItem>
            <ListItem onClick={()=>handleClick('players')}>Players</ListItem>
            <ListItem onClick={()=>handleClick('clubs')}>Clubs</ListItem>
            <ListItem onClick={()=>handleClick('national')}>National Teams</ListItem>
         </ListItems>
         <AuthContain>
          <div>
          <StyledIcon onClick={()=>handleClick('cart')}/>
            <CartLength>{state.cart.length}</CartLength>
          </div>
         </AuthContain>
   </HeaderContainer>
  )
}

export default Header