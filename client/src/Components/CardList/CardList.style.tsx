import styled,{css} from 'styled-components'



export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height:30rem;

`


export const PopularClubsHeading = styled.h1(
    ({ theme: {color, typography} }) => css`
    font-size: ${typography.fontSize.heading2};
    font-weight: ${typography.fontWeight.bold};
    align-self: center;
    width: 86%;
`)

export const CardListWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    
`