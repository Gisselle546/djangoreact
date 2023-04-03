import React from 'react'
import { Router, useRouter } from 'next/router';
import { ButtonContainer, ImageContainer, SliderContainer, Heading } from './SliderCard.style';
import { useAppDispatch } from '@/redux/hooks';
import { filterProductMethod } from '@/redux/reducer/filterSlice';

type Props = {
    data : {
        name: string;
        primary_image: string
        product_id: any
    }
}



function SliderCard({data}: Props) {
 const router = useRouter();
 const { name, primary_image, product_id} = data;


 const handleClick = () =>{
  router.push(`/products/${product_id}`)
 }

 return (
    <SliderContainer onClick={()=>handleClick()}>
        <ImageContainer img={primary_image}/>
       {name.length> 41? name.substring(0, 40) : name}
       <ButtonContainer>Details</ButtonContainer>
    </SliderContainer>
  )
}

export default SliderCard