import styled,{css} from 'styled-components'



export const Container = styled.div`
    display: flex;
    flex-direction: column;


   
   
`;


export const PopularClubsHeading = styled.h1(
    ({ theme: {color, typography} }) => css`
    font-size: ${typography.fontSize.heading2};
    font-weight: ${typography.fontWeight.bold};
    align-self: center;
    margin-top: 5rem;
    width: 86%;
    @media (max-width: 768px) {
        font-size: ${typography.fontSize.heading3};
     }
`);

export const CardListWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: space-around;
    align-content: space-evenly;
    height: 50rem;
    @media (max-width: 900px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:center;
     }
    
`