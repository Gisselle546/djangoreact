import styled, {css} from 'styled-components'

export const CartWrapper = styled.div(
    ({ theme: {color} }) => css`
    display: flex;
    justify-content: space-around;
    border: 2px solid ${color.sidebarHeader}
    height: 100vh;
    margin: 1rem;
`);

export const CartProductItem = styled.div`
border: 2px solid #c7ecee;
height: 60vh;
width: 70%;


`;

export const CartProductTotal = styled.div(
({ theme: {color} }) => css`
display: flex;
flex-direction: column;
align-items: center;
background: ${color.black};
border-radius: 5px;
width: 25%;
`);

export const CartItems = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
`;

export const CartItem = styled.div`
    display: flex;
    width: 100%;
`

export const CartHeaderItems = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`

export const CartHeaderLength = styled.h2(
    ({ theme: {typography} }) => css`
      font-size: ${typography.fontSize.heading4};
      font-weight: ${typography.fontWeight.bold};
      color: #9b2828;
      margin-left: 1rem;
     
    `
)


export const ButtonContainer = styled.button`
background-color: #c7ecee; 
border: none;
color: #9b2828;
display: flex;
padding: 1rem;
margin: 1rem;
align-items: center;
text-decoration: none;
text-transform: capitalize;
cursor: pointer;
font-size: 16px;
text-align: center;

 &:disabled{
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
 }

`;

export const MappedItemsContainer = styled.div`
display: flex;
border: 2px solid black;
justify-content: space-around;
overflow: auto;

`

export const ItemImageContainer =  styled('div')<{img: any}>`
    border: 2px solid #9b2828;
    background:url(${(props: any) => props.img}) center/cover;
    height: 10vh;
    width: 10vh;
    cursor: pointer;
`;

export const CartProductTotalHeader = styled.h2(
    ({ theme: {typography, color} }) => css`
    color: ${color.white};
    font-size: ${typography.fontSize.heading4};
    font-weight: ${typography.fontWeight.bold};
`)


export const Submenu = styled.h4(
    ({ theme: {typography, color} }) => css`
    color: white;
    `);


export const OrderItems = styled.div`
    display: flex;
    flex-direction: column;
    align-self: start;
    margin-left: 2rem;
    justify-content: space-between;
    height: 15rem;
`


export const OrderItem = styled.p(
({ theme: {typography, color} }) => css`
    color: ${color.white};
    padding: 1rem;
`);

export const OrderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 20rem;
   
`

export const Money = styled.div(
    ({ theme: {typography, color} }) => css`
    color: ${color.white};
`);