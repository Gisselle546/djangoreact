import React from 'react'
import { HeaderContainer, ListItems, LogoContainer, ListItem, AuthContain } from './Header.style'
import logo from '../../assets/images/logo-grey.png'
import { useRouter } from 'next/router';
import {FiShoppingCart} from 'react-icons/fi';

function Header() {
  const router = useRouter();
  return (
   <HeaderContainer>
         <LogoContainer img={logo.src} onClick={()=>router.push('/')}/>
         <ListItems>
            <ListItem>Footwear</ListItem>
            <ListItem>Players</ListItem>
            <ListItem>Clubs</ListItem>
            <ListItem>National Teams</ListItem>
         </ListItems>
         <AuthContain>
          <FiShoppingCart size={22} style={{verticalAlign:'middle', marginRight:'0.2rem'}}/>
         </AuthContain>
   </HeaderContainer>
  )
}

export default Header