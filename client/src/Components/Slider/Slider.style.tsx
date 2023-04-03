import styled from 'styled-components'

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
    @media (max-width: 768px) {
        grid-template-columns: auto auto;
        grid-column-gap: 10px; 
        grid-row-gap: 10px;
      }

`


