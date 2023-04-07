import styled, {css} from 'styled-components';

export const OrderSummaryContainer = styled.div(
({ theme: {color} }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    border: 2px solid red;
`)

export const OrderSummaryWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;

`