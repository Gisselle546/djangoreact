import styled,{css} from 'styled-components';

export const HeaderContainer = styled.div(

    ({ theme: {color} }) => css`
    display: flex;
    height: 5rem;
    background-color: ${color.sidebarHeader};
    align-content: center;
    justify-content: space-around;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

`);

export const LogoContainer = styled('div')<{img: any}>`
  
   
    background:url(${(props: any) => props.img}) center/cover;
    height: 4.6rem;
    width: 5rem;
    cursor: pointer;
  
    @media screen and (max-width: 800px) {
      width: 50%;
      padding: 0;
      opacity: 0;
    }
`;

export const ListItems = styled.ul`
    display: flex;
    list-style-type: none;
    align-items: flex-end;
`;
export const ListItem = styled.li`
   margin-left: 1.1rem;
   cursor: pointer
`;



export const AuthContain = styled.div`
    display: flex;
    align-items: flex-end;
  
`