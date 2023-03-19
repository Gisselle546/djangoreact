import React from 'react'
import { BottomContainer, CardContainer, ImageContainer } from './Card.style';

type Props = {
 data: {
  id: 1
  location: string; 
  logo_url: string;
  name: string;
  team_type: string;
 }

}

function Card({data}:Props) {
  const {logo_url, name, location} = data;

  return (
    <CardContainer>
        <ImageContainer img={logo_url}/>
        <BottomContainer>
        <h1>{name}</h1>
        <p>{location}</p>
        </BottomContainer>
    </CardContainer>
  )
}

export default Card