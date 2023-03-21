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
`;


export const ImageContainer =  styled('div')<{img: any}>`
    background:url(${(props: any) => props.img}) center/cover;
    height: 30vh;
    width: 30vh;
    cursor: pointer;
`;


export const ButtonContainer = styled.button`
    margin: 1rem;
    border: none;
    color: white;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    background-color: blue;
    cursor: pointer;
`;