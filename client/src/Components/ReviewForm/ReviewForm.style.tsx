import styled, { css } from 'styled-components';


export const ReviewContainer = styled.div`
    display: flex;

`;

export const InputWrapper = styled.input(
    ({ theme: {color} }) => css`
        border: 2px solid ${color.sidebarHeader};
        width: 300px;
        margin: 1.5rem;
        height: 3.5rem;
        @media (max-width: 768px) {
            width: 100%;
            
        }
        
       

`);
