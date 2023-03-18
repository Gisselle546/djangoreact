import React from 'react'
import { data } from '@/dummy_data'
import Card from '../Card/Card'
import { CardListWrapper, PopularClubsHeading, Container } from './CardList.style'

function CardList() {

    const dataf = data.map(datafield=>{
        return(
            <>
                <Card data={datafield}/>
            </>
        )
    })
  return (
    <Container>
        <PopularClubsHeading>Popular Clubs</PopularClubsHeading>
        <CardListWrapper>
            {dataf}
        </CardListWrapper>
    </Container>
  )
}

export default CardList