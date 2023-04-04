import styled from 'styled-components';

export const SearchbarWrapper = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    

`;


export const SearchInput = styled.input`

    min-width: 25rem;
    height: 2rem;
    position: relative;
    border-radius: 5px;
    border:2px solid ${({theme: {color} }) => (color.sidebarBackground)};
    @media (max-width: 768px) {
        min-width: 20rem;
     }

`;