import styled, { css } from 'styled-components'

export const AccordionWrapper = styled.div`
display: flex;
flex-direction: column;
border: 2px solid #c7ecee;
width: 50%;
min-height: 3rem;
margin: 0 auto;
margin-bottom: 1rem;
border-radius: 0.5rem;
overflow: scroll;
transition: transform 0.3s ease-out;
@media (max-width: 768px) {
 width: 100%;
}
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer; 
  height: 4rem;
  width: 100%;
`;


export const Content = styled("div")<{isOpen: Boolean}>`
  display: ${(props: any) => props.isOpen ? 'block' : 'none'};
  max-height: ${(props: any) => props.isOpen ? '100%' : '0'};
  overflow: scroll;
  transition: max-height 0.3s ease-out;
  background-color:  #FFFFFF;
  padding: 1.5rem;
`;


export const Header = styled.div(
  ({ theme: {color, typography} }) => css`
    display: flex;
    width: 30%;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      font-size: ${typography.fontSize.body};
      width: 70%;
     }
    
`)

export const Innerheader = styled.h2(
  ({ theme: {color, typography} }) => css`
  color: #a9a9a9;
  @media (max-width: 768px) {
    font-size: ${typography.fontSize.body};
    width: 70%;
  }
`)