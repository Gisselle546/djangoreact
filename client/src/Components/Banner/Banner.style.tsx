import styled from 'styled-components'


export const BannerContainer = styled.div`
    height:40vh;
    width: 100%;
    border:${({theme: {boxShadow} }) => (boxShadow.outerBorder)};
    padding: 0.5rem;
    
`;


export const BannerItems = styled.ul`
    width: 100%;
    height: 100%;
    margin: 0;
    position: relative; 
    list-style-type: none;
    display: flex;
    transition: all 0.5s;
    overflow: hidden;
    padding:0;
`

export const BannerItem = styled.li<{img: any}>`
    width: 40%;
    position: relative;
    text-align: center;
    transition: 0.5s;
    background:url(${(props: any) => props.img}) center/cover;
    &:hover {
        width: 60%;
        cursor: pointer;
       
      }
`;

export const BannerHeading = styled.div`
      color: blue;
     
`;