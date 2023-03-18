import styled from 'styled-components';


export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    height: 350px;
    width: 350px;
    padding: 0.2rem;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

`;

export const ImageContainer =  styled('div')<{img: any}>`
    background:url(${(props: any) => props.img}) center/cover;
    height: 100%;
    width: 100%;
`;

export const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;