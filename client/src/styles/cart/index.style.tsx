import styled, {css} from 'styled-components'

export const CartWrapper = styled.div(
    ({ theme: {color} }) => css`
    display: flex;
    justify-content: space-evenly
    border: 2px solid ${color.sidebarHeader}
    height: 100vh;
`);

export const CartProductItem = styled.div`
border: 2px solid red;

width: 100%;

`;

export const CartProductTotal = styled.div`
width: 100%;
border: 2px solid green;
`;