import styled, { css } from 'styled-components';

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const HeaderContainer = styled.div(
    ({ theme: {typography} }) => css`
        display: flex;
        justify-content: center;
        font-size: ${typography.fontSize.heading3};
        color: #9b2828;
        padding: 1.3rem;
        
    `);

export const InputWrapper = styled.input(
    ({ theme: {color} }) => css`
        border: 2px solid ${color.sidebarHeader};
        width: 300px;
        margin: 1.5rem;
        height: 3.5rem;
        @media (max-width: 768px) {
            
            
        }
        
       

`);

export const FormBody = styled.div`
        display: flex;
        flex-direction: column;
        border: 2px solid  #c7ecee;
        border-radius: 5px;
        padding: 1rem;
        @media (max-width: 768px) {
            width: 100%;
            
        }
`

export const StyledSelect = styled.select(
    ({ theme: {color} }) => css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    border: 2px solid ${color.sidebarHeader};
    width: 250px;
    margin: 1.5rem;
    margin-left: 3rem;
    border-radius: 5px;
    height: 3.5rem;
    @media (max-width: 768px) {
               
                
                
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #5f9ea0;
    }
`);

export const FormButton = styled.button(
    ({ theme: {color} }) => css`
    background-color: #9b2828; 
    cursor: pointer;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    align-self: center;
    width: 40%

`
)

