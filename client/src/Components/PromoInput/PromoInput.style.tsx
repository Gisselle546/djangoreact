import styled,{css} from "styled-components";

export const InputWrapper = styled.input(
    ({ theme: {color} }) => css`
        border: 2px solid ${color.sidebarHeader};
        width: 300px;
        margin: 1.5rem;
        height: 2.5rem;
        border-radius: 5px;
        @media (max-width: 768px) {
            width: 100%;
            
        }
        
       

`);