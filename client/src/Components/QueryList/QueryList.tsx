import React from 'react'
import { CardListWrapper, PopularClubsHeading, Container } from './QueryList.style'
import SliderCard from '../SliderCard/SliderCard'

type Props = {
    data: any
    heading: string
}

function QueryList({data, heading}:Props) {


    if(!data){
        return <div>....</div>
    }


    const object = data?.map((product: any)=>{
        return (
            <>
                <SliderCard  key={product.id} data={product}/>
            </>
        )
    })    

  return (
    <Container>
        <PopularClubsHeading>{heading}</PopularClubsHeading>
        <CardListWrapper>
            {object}
        </CardListWrapper>
    </Container>
  )
}

export default QueryList