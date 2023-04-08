import styled, {css} from 'styled-components';

export const OrderSummaryContainer = styled.div(
({ theme: {color} }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
   
`)

export const OrderSummaryHeader = styled.h2`
    text-align: center;
`

export const OrderSummaryWrapper = styled.div(
     ({ theme: {color} }) => css`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 600px;
    border: 2px solid ${color.sidebarHeader};
    width: 400px;
    padding: 1rem;

`);

export const FormButton = styled.button(
    ({ theme: {color} }) => css`
    background-color: #a9a9a9; 
    cursor: pointer;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    align-self: center;
    width: 150px;

`
);

export const MappedItemsContainer = styled.div`
display: flex;
justify-content: space-around;
overflow: auto;
@media (max-width: 768px) {
   padding: 0.2rem; 
    
 }

`;

export const MappedWrapper = styled.div`
 display: flex;
 margin-top: 0.5rem;
`

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

export const ItemImageContainer =  styled('div')<{img: any}>`
    border: 1px solid #a9a9a9;
    background:url(${(props: any) => props.img}) center/cover;
    height: 10vh;
    width: 10vh;
    cursor: pointer;
`;


export const PlaceOrder = styled.div`
display: flex;
justify-content: space-around;
@media (max-width: 768px) {
    flex-direction: column;
    
 }

`; 

export const Itemlist = styled.div(
    ({ theme: {color} }) => css`
    border: 2px solid ${color.sidebarHeader};
    width: 50%;
    padding: 1rem;
    @media (max-width: 768px) {
        width: 100%;
        
     }

`);

export const OrderLetters = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Span = styled.span(
    ({ theme: {typography} }) => css`
     font-weight: ${typography.fontWeight.bold};
    `
)

export const QuantityWrapper = styled.div`
    display: flex; 
    align-items: center;
    @media (max-width: 768px) {
        width: 50%;
        
     }

`;

