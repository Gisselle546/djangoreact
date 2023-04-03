import styled from 'styled-components';

export const StyledBoxContainer = styled.div`
border: 2px solid #c7ecee;
display: flex;
height: 10rem;
align-items: center;
justify-content: space-evenly;
@media (max-width: 768px) {
  flex-direction: column;
  align-items: space-between; 

`

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
  @media (max-width: 768px) {
    width: 5rem;
  
  `
  
