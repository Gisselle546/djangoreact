import styled, {css} from 'styled-components';


export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const ProductDetailWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const ProductSubContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
     }
   

`;

export const ProductDetails = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-width: 25rem;
    @media (max-width: 768px) {
      text-align: center;
      margin-top: 5px;
      justify-content: space-between;
      max-width:100%;
     }
`

export const ProductHeaders =  styled.div(
    ({ theme: {color, typography} }) => css`
    font-size: ${typography.fontSize.heading3};
    @media (max-width: 768px) {
        font-size: ${typography.fontSize.bodyXS};
     }
    `
  )

  export const SubProductHeaders =  styled.div(
    ({ theme: {color, typography} }) => css`
    font-size: ${typography.fontSize.heading4};
    font-weight: ${typography.fontWeight.bold};
    @media (max-width: 768px) {
        font-size: ${typography.fontSize.body};
        margin-top: 1rem;
     }
    `
  )



export const ButtonContainer = styled.button`
background-color: #c7ecee; 
border: none;
color: #9b2828;
display: flex;
padding: 1rem;
text-decoration: none;
text-transform: capitalize;
cursor: pointer;
font-size: 16px;
text-align: center;
justify-content: center;
@media (max-width: 768px) {
    margin-top: 1rem;
    justify-content: center;
    font-weight: bold;
    
 }
`;

export const SelectOptionWrapper = styled.div`
@media (max-width: 768px) {
    margin-top: 1rem;
 }
`

export const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
   

`;  


export const ProductBottom= styled.div`
height: 50vh;
overflow: auto;
`;

export const SizeChart = styled.p(
({ theme: {color, typography} }) => css`
    text-align: right;
    cursor: pointer;
    @media (max-width: 768px) {
        font-size: ${typography.fontSize.bodyXS};
        width: 95%;
     }

`)