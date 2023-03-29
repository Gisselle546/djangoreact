import styled, {css} from 'styled-components';


export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const ProductDetailWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    height: 50vh;
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
background-color: #c7ecee; 
border: none;
color: #a9a9a9;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;  


export const ProductBottom= styled.div`
height: 50vh;
overflow: scroll;
`;

export const SizeChart = styled.p`
    text-align: right;
    cursor: pointer;

`