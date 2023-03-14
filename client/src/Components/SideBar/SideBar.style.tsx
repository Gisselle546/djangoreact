import styled, {css} from 'styled-components';

export const SideBarContainer = styled.div(
    ({ theme: {color} }) => css`
    background: ${color.sidebarBackground};
    top: 0;
    left: 0;
    position: fixed;
    height: 100vh;
    z-index: 999;
    padding 0.4rem 1.5rem;
    width: 7rem;
    `
  )
  
  
  export const LogoContainer = styled('div')<{img: any}>`
  
   
    background:url(${(props: any) => props.img}) center/cover;
    height: 7%;
    width: 100%;
    cursor: pointer;
  
    @media screen and (max-width: 800px) {
      width: 50%;
      padding: 0;
      opacity: 0;
    }
    `;
  
  export const HeadingContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    height: 90%;
  `;
  
  export const SideBarItemContainers = styled.div`
    flex:1;
    flex-direction: column; 
   
  `;

  export const SidebarHeader = styled.div`
    display: flex;
    justify-content: space-around;
    background: ${({theme: {color} }) => (color.sidebarHeader)};
  `

