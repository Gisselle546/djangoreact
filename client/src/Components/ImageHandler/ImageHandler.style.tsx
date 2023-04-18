import styled from 'styled-components';

 export const ImageWrapper = styled.div`
    display: flex;
    padding: 1rem;
    border-radius: 5px;
    @media (max-width: 768px) {
      height:60%;
    
     
   }
 `


 export const ImageList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    
 `;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 50px;
    width: 50px;
    border: 0.5px solid black;
    margin-top: 0.4rem;
    cursor: pointer;
    
`


 export const ImageItem = styled('div')<{img: any}>`
    background:url(${(props: any) => props.img}) center/cover;
    height: 100%;
    width: 100%;
 `
 export const BigContainer = styled.div`
   height: 400px;
   width: 400px;
   @media (max-width: 768px) {
      height: 150px;
      width: 150px;
      margin-left: 1rem;
     
   }

 
 `


