import styled, { css } from 'styled-components';


export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    height: 30rem;

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
  @media (max-width: 768px) {
    width: 95%;
    
}
`);

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
