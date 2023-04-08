import styled,{css} from 'styled-components';

export const HeaderContainer = styled.div(

    ({ theme: {color} }) => css`
    display: flex;
    height: 5rem;
    background-color: ${color.sidebarHeader};
    align-content: center;
    justify-content: space-around;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    @media screen and (max-width: 800px) {
       height:3rem;
      }
    

`);

export const LogoContainer = styled('div')<{img: any}>`
  
   
    background:url(${(props: any) => props.img}) center/cover;
    height: 4.6rem;
    width: 5rem;
    cursor: pointer;
  
    @media screen and (max-width: 800px) {
      width: 3rem;
      height: 3rem;
    }
`;

export const ListItems = styled.ul`
    display: flex;
    list-style-type: none;
    align-items: flex-end;
`;
export const ListItem = styled.li(
    ({ theme: {typography} }) => css`
   margin-left: 1.1rem;
   font-size: ${typography.fontSize.body};
   cursor: pointer;
   @media screen and (max-width: 800px) {
    font-size: 0.5rem;
  }
`);



export const AuthContain = styled.div`
    display: flex;
    align-items: center;
  
`;

export const CartLength = styled.span`
  background-color: #ffff;
  border-radius: 60%;
  position: absolute;
  left: 4px;
  bottom:18px;
  padding:0.2rem;
  @media screen and (max-width: 800px) {
    padding:0.2rem;
    left: 4px;
    bottom:7px;
  }
`;