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
    @media (max-width: 900px) {
        grid-template-columns: auto auto;
        width:100%;
        margin: 0.5rem;
        grid-column-gap: 0px; 
        grid-row-gap: 20px;
      }

`


