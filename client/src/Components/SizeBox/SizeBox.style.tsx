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
  width: 11rem;
  height: 11rem;
}

`

export const ButtonContainer = styled.button`
  background-color: #c7ecee; 
  border: none;
  color: #a9a9a9;
  display: flex;
  padding: 1rem;
  text-decoration: none;
  text-transform: capitalize;
  transition: padding 0.2s ease;
  cursor: pointer;
  font-size: 16px;
  &:focus {
    color: #fff;
    padding: 30px;
    border-color: #6c757d;
  }
  @media (max-width: 768px) {
    width: 5rem;
  }
  `
  

  export const InnerStyling= styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-direction: row;
    height:10rem;
  }
  
  `
  export const Inventory = styled.div `
    color: red;
    @media (max-width: 768px) {
      font-size: 0.5rem;
    }
  `