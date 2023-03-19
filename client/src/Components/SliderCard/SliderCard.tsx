import React from 'react'
import { ImageContainer, SliderContainer } from './SliderCard.style';

type Props = {
    data : {
        name: string;
        primary_image: string
    }
}



function SliderCard({data}: Props) {
 const { name, primary_image} = data;
  
 return (
    <SliderContainer>
        <ImageContainer img={primary_image}/>
         {name.length> 42? name.substring(0, 40) : name}
       
    </SliderContainer>
  )
}

export default SliderCard