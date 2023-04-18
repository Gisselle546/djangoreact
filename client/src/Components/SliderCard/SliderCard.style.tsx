import styled from "styled-components";

export const SliderContainer =  styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    flex-wrap: nowrap;
    transition: all 0.2s ease-out;
    &:hover{
        transform: scale(1.1);
    }
    @media (max-width: 900px) {
       width: 100%;
      
      }
`;


export const ImageContainer =  styled('div')<{img: any}>`
    background:url(${(props: any) => props.img}) center/cover;
    height: 30vh;
    width: 30vh;
    cursor: pointer;
    @media (max-width: 768px) {
        height: 7rem;
        width: 7rem;
      }
`;


export const ButtonContainer = styled.button`
    margin: 1rem;
    border: none;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background-color: #c7ecee; 
    border: none;
    color: #a9a9a9;
`;

export const Heading = styled.h4`

@media (max-width: 768px) {
    font-size: 0.5rem;
    max-width: 75%;
  }

`