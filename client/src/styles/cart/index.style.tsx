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

export const CartProductTotal = styled.div`
border: 2px solid #a9a9a9;
width: 25%;
`;