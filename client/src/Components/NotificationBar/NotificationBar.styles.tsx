import styled from 'styled-components';

export const NotificationBarWrapper = styled.div`
display: flex;
height: 2rem;
align-items: center;
color: ${({theme: {color} }) => (color.white)};
justify-content: center;
background: ${({theme: {color} }) => (color.black)};

`