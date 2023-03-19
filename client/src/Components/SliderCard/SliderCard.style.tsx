import styled from "styled-components";

export const SliderContainer =  styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 350px;
    width: 350px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

`;


export const ImageContainer =  styled('div')<{img: any}>`
    background:url(${(props: any) => props.img}) center/cover;
    height: 100%;
    width: 100%;
`;

