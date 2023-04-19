import styled from 'styled-components'
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

export const SliderWrapper = styled.div`
    display: grid;
    height: 30rem;
    grid-template-columns: auto auto auto auto;
    justify-content: space-around;
    align-content: center;
    overflow: hidden;
    margin: 1rem;
    max-width: 100%;
    overflow-x: hidden;
    @media (max-width: 900px) {
        grid-template-columns: auto auto;
        width:100%;
        margin-left: 0.5rem;
        grid-column-gap: 0px; 
        grid-row-gap: 20px;
      }

`


export const ArrowLeft = styled(AiOutlineArrowLeft)`
position: absolute; 
left: 0; 
top: 40%;
vertical-align: middle; 
cursor: pointer;
font-size: 1.5rem;

&:hover {
  color: #555;
  transform: scale(1.1);
}


@media (max-width: 900px) {
    color: #333;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    z-index:999;

    &:hover {
        color: #555;
        transform: scale(1.1);
    }
  }
`;

export const ArrowRight = styled(AiOutlineArrowRight)`
position: absolute; 
right: 0; 
top: 40%;
vertical-align: middle; 
cursor: pointer;
font-size: 1.5rem;

&:hover {
  color: #555;
  transform: scale(1.1);
}

@media (max-width: 900px) {
    color: #333;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        color: #555;
        transform: scale(1.1);
    }
  }
`;