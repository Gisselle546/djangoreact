import styled, {css} from 'styled-components'

export const PaymentFormWrapper = styled.div(
    ({ theme: {color} }) => css`
    display: flex;
    justify-content: space-around;
    border: 2px solid ${color.sidebarHeader}
    height: 100vh;
    margin: 1rem;
    @media (max-width: 768px) {
       height: 100%;
       width: 100%;
       margin:0rem;
       flex-direction: column;
       justify-content: space-between;
    }
`);

export const PaymentTotal = styled.div(
    ({ theme: {color} }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${color.black};
    border-radius: 5px;
    width: 25%;
    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
     }
`);

export const PaymentTotalHeader = styled.h2(
    ({ theme: {typography, color} }) => css`
    color: ${color.white};
    font-size: ${typography.fontSize.heading4};
    font-weight: ${typography.fontWeight.bold};
`)

export const Submenu = styled.h4(
    ({ theme: {typography, color} }) => css`
    color: white;
    `);


export const OrderItems = styled.div`
    display: flex;
    flex-direction: column;
    align-self: start;
    margin-left: 2rem;
    justify-content: space-between;
    height: 15rem;
    @media (max-width: 768px) {
        margin-left: 1rem;
     }
`


export const OrderItem = styled.p(
({ theme: {typography, color} }) => css`
    color: ${color.white};
    padding: 1rem;
`);

export const OrderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 20rem;
   
`

export const Money = styled.div(
    ({ theme: {typography, color} }) => css`
    color: ${color.white};
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
    width: 150px;
    @media (max-width: 768px) {
        width: 100%;
     }

`
);

export const FormInfo = styled.div(
    ({ theme: {color} }) => css`
    border: 2px solid blue;
    display: flex;
    

`)

export const PaymentFormContainer = styled.div(
    ({ theme: {color} }) => css`
  width: 40%;
  padding: 20px;
  border:  2px solid ${color.sidebarHeader};
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.5;
  @media (max-width: 768px) {
    width: 100%;
 }
`);

export const CardLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  @media (max-width: 768px) {
   text-align: center;
 }
`;

export const CardElementWrapper = styled.div`
  border: 1px solid #ccc;
  width: 400px;
  border-radius: 5px;
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
 }
`;

export const CardContainer = styled.div`

display: flex; 
flex-direction: column; 
justify-content: space-around; 
height:100%;
@media (max-width: 768px) {
    width: 100%;
    height: 30rem;
 }

`;

export const InputWrapper = styled.input(
    ({ theme: {color} }) => css`
        border: 1px solid #ccc;
        width: 350px;
        border-radius: 5px;
        margin-bottom: 1.5rem;
        height: 2.5rem;
        @media (max-width: 768px) {
            width: 100%;
            
        }
        
       

`);