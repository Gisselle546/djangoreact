import React, { useState } from 'react';
import { SideBarContainer, LogoContainer, HeadingContainer, SideBarItemContainers, SidebarHeader, SidebarList, SidebarListBottom, ListItem, ListButton, SidebarBody } from './SideBar.style';
import styled, {css} from 'styled-components';
import { CSSTransition } from "react-transition-group";
import {BiExit} from 'react-icons/bi';
import {FiShoppingCart} from 'react-icons/fi';
import logo from '../../assets/images/logo-grey.png';
import { useRouter } from 'next/router';


type Props ={
    show: boolean
}

function SideBarItems({show}:Props){
    const router = useRouter()
   
 const Animation = styled.div<{state: any}>`
        position: absolute;
        left:7rem;
        z-index:5;
        width: 300px;
        height: 100vh;
        /* example for move item */
        opacity: ${({ state }: any) => {
            switch (state) {
                case "entering":
                    return 0;
                case "entered":
                    return 1;
                case "exiting":
                    return 1;
                case "exited":
                    return 0;
                default:
                    return 1;
            }
        }};
        
        transform: ${({ state }: any) => {
            switch (state) {
                case "entering":
                    return "translateX(-20rem)";
                case "entered":
                    return "translateX(0)";
                case "exiting":
                    return "translateX(0)";
                case "exited":
                    return "translateX(-20rem)";
                default:
                    return "translateX(0)";
            }
        }};
    
        transition: opacity 500ms, transform 500ms;
        background:  ${({theme: {color} }) => (color.screenBackground)};
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        box-shadow: ${({theme: {boxShadow}}) => (boxShadow.outerBorder)}
    `;

    const handleClick = (data: string) =>{
        router.push(`/${data}`);
    }

    return(
        <>
         <CSSTransition in={show} timeout={300} unmountOnExit={false}>
         {(state) => (
          <Animation state={state}>
            <SideBarItemContainers>
                <SidebarHeader>
                    <h1>Strikers</h1>
                    <div style={{margin: '10px 0px 0px 40px'}}>
                        <BiExit size={32} style = {{ verticalAlign: 'middle' }}/>
                    </div>
                </SidebarHeader>
                <SidebarBody>
                    <SidebarList>
                        <ListItem>Footwear</ListItem>
                        <ListItem>Players</ListItem>
                        <ListItem>Clubs</ListItem>
                        <ListItem>National Teams</ListItem>
                    </SidebarList>
                    <SidebarList>
                        <ListItem onClick={()=>handleClick('cart')}>Cart <FiShoppingCart size={18} style={{verticalAlign:'middle', marginRight:'0.2rem'}}/></ListItem>
                        
                    </SidebarList>
                    <SidebarListBottom onClick={()=>handleClick('signin')}>
                        
                        <ListButton>Sign In</ListButton>
                    </SidebarListBottom>
                </SidebarBody>
            </SideBarItemContainers>
          </Animation>
          )}
        </CSSTransition>
        </>
    )
}


function SideBar() {
    const [show, setShow] = useState(false);
  return (
    <div style={{display: 'flex'}}>
        <SideBarContainer>
            <LogoContainer img={logo.src} onClick={() => setShow(!show)}/>
            <HeadingContainer>
            <h3 style={{textOrientation:'upright', writingMode: 'vertical-lr', color:'white', letterSpacing: '16px', fontSize:'1.2rem'}}>Strikers</h3>
            </HeadingContainer>
        </SideBarContainer>
        <SideBarItems show={show} />
    </div>
  )
}

export default SideBar