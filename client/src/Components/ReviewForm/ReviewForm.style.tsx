import styled, { css } from 'styled-components';


export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    

`;

export const InputWrapper = styled.input(
    ({ theme: {color} }) => css`
        border: 2px solid ${color.sidebarHeader};
        width: 650px;
        margin: 1.5rem;
        height: 3.5rem;
        @media (max-width: 768px) {
            width: 100%;
            
        }
        
       

`);

export const ReviewHeader = styled.div(
    ({ theme: {color, typography} }) => css`
    font-size: ${typography.fontSize.heading4};
    color: #a9a9a9;

    `
);

export const TextArea = styled.textarea(
({ theme: {color} }) => css`
  width: 650px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid ${color.sidebarHeader};
  border-radius: 4px;
  resize: none;
`);