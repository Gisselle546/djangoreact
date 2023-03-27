import React from 'react'
import Card from '../Card/Card'
import { CardListWrapper, PopularClubsHeading, Container } from './CardList.style'

type Props = {
    data: any
    heading: string
    
}

function CardList({data, heading}:Props) {

    if(!data){
        return <div>....</div>
    }

    const dataf = data.map((datafield: any)=>{
        return(
            <>
                <Card  data={datafield}/>
            </>
        )
    })
  return (
    <Container>
        <PopularClubsHeading>{heading}</PopularClubsHeading>
        <CardListWrapper>
            {dataf}
        </CardListWrapper>
    </Container>
  )
}

export default CardList