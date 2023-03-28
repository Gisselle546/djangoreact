import styled, {css} from 'styled-components';


export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const ProductDetailWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    height: 50vh;
    border: 2px solid green;
    align-items: center;
`

export const ProductSubContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
   

`;

export const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

export const ProductHeaders =  styled.div(
    ({ theme: {color, typography} }) => css`
    font-size: ${typography.fontSize.heading3}
    `
  )

  export const SubProductHeaders =  styled.div(
    ({ theme: {color, typography} }) => css`
    font-size: ${typography.fontSize.heading4};
    font-weight: ${typography.fontWeight.bold}
    `
  )



export const ButtonContainer = styled.button`
background-color: #4CAF50; 
border: none;
color: white;
display: flex;
padding: 1rem;
text-decoration: none;
text-transform: capitalize;
cursor: pointer;
font-size: 16px;
text-align: center;


`

export const ProductInfo = styled.div`
    display: flex;

`;