import React from 'react'
import { HeaderContainer, ListItems, LogoContainer, ListItem, AuthContain } from './Header.style'
import logo from '../../assets/images/logo-grey.png'
import { useRouter } from 'next/router';
import {FiShoppingCart} from 'react-icons/fi';

function Header() {
  const router = useRouter();

  const handleClick = (data: string) =>{
    router.push(`/${data}`);
}

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
          <FiShoppingCart size={22} style={{verticalAlign:'middle', marginRight:'0.2rem', cursor: 'pointer'}} onClick={()=>handleClick('cart')}/>
         </AuthContain>
   </HeaderContainer>
  )
}

export default Header