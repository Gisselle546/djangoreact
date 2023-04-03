
import styled, {css} from 'styled-components'

export const CartWrapper = styled.div(
    ({ theme: {color} }) => css`
    display: flex;
    justify-content: space-around;
    border: 2px solid ${color.sidebarHeader}
    height: 100vh;
    margin: 1rem;
    @media (max-width: 768px) {
       height: 100%;
       flex-direction: column;
       justify-content: space-between;
    }
`);

export const CartProductItem = styled.div`
border: 2px solid #c7ecee;
height: 60vh;
width: 70%;
@media (max-width: 768px) {
    width: 100%;
 }

`;

export const CartProductTotal = styled.div(
({ theme: {color} }) => css`
display: flex;
flex-direction: column;
align-items: center;
background: ${color.black};
border-radius: 5px;
width: 25%;
@media (max-width: 768px) {
    width: 100%;
    justify-content: center;
 }
`);

export const CartsItems = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
`;

export const CartsItem = styled.div`
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
      color: #a9a9a9;
      margin-left: 1rem;
     
    `
)


export const ButtonContainer = styled.button`
background-color: #c7ecee; 
border: none;
color: #a9a9a9;
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
justify-content: space-around;
overflow: scroll;
@media (max-width: 768px) {
   padding: 0.2rem; 
    
 }

`;

export const MappedWrapper = styled.div`
 display: flex;
`

export const ItemImageContainer =  styled('div')<{img: any}>`
    border: 2px solid #a9a9a9;
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
    @media (max-width: 768px) {
        margin-left: 1rem;
     }
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

export const ItemDetails = styled.div`
    margin-left: 1rem; 
    display: flex; 
    flex-direction: column; 
    height: 5rem; 
    justify-content: space-around;
    @media (max-width: 768px) {
        margin-left: 0.5rem; 
        
     }

`

export const Item = styled.div`

@media (max-width: 768px) {
    font-size: 0.5rem;
    
 }

`
export const ItemSize = styled.div`
@media (max-width: 768px) {
    font-size: 0.3rem;
    
 }
`

export const QuantityWrapper = styled.div`
    display: flex; 
    align-items: center;
    @media (max-width: 768px) {
        width: 50%;
        
     }

`;

export const PriceContainer = styled.div`
    display: flex; 
    align-items: center; 
    flex-direction: column; 
    justify-content: center;

    @media (max-width: 768px) {
        font-size: 1rem;
        font-weight: bold;
        margin-right: 1rem;
        
     }

`;