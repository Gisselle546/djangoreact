import styled,{css} from "styled-components";

export const FormBackground = styled('div')<{img: any}>`
    display: flex;
    background: linear-gradient(to top right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${(props: any) => props.img}) center/cover;
    justify-content: flex-end;
    height: 100vh;
    width: 100vw;

`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly; 
    align-items: center;
    height: 550px;
    margin: 1rem 12rem 0 0;
    border-radius: 5px;
    width: 400px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    

`

export const HeaderContainer = styled.div(
({ theme: {typography} }) => css`
    display: flex;
    font-size: ${typography.fontSize.heading3};
    padding: 1.3rem;
`);


export const FormBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`

export const InputWrapper = styled.input(
    ({ theme: {color} }) => css`
        border: 2px solid ${color.sidebarHeader};
        width: 300px;
        margin: 1.5rem;
        height: 3.5rem;

`);


export const FormButton = styled.button(
    ({ theme: {color} }) => css`
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    width: 40%

`
)