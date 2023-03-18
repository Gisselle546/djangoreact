import React from 'react'
import { BottomContainer, CardContainer, ImageContainer } from './Card.style';

type Props = {
   data:{ id: any;
    name: string;
    country: string
   }
}

function Card({data}:Props) {
  return (
    <CardContainer>
        <ImageContainer/>
        <BottomContainer>
        <h1>{data.name}</h1>
        <p>{data.country}</p>
        </BottomContainer>
    </CardContainer>
  )
}

export default Card