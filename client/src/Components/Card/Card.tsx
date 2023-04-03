import React from 'react'
import { BottomContainer, CardContainer, ImageContainer, MainHeading, SubHeading } from './Card.style';
import router from 'next/router'
import { filterMethod, filterValue } from '@/redux/reducer/filterSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';



type Props = {
 data: {
  id: 1
  location: string; 
  logo_url: string;
  name: string;
  team_type: string;
  primary_image?: string;
  first_name?: string;
  last_name?: string;
  image_url?: string
  
 }

}

function Card({data}:Props) {
  const {logo_url, name, location, team_type, primary_image, first_name, last_name, image_url} = data;
  const dispatch = useAppDispatch()
  const value = useAppSelector(filterValue)
  console.log(team_type)

  const handleClick = () =>{

    const team = team_type==='CLUB'? 'clubs' : 'national'

    router.push(`/clubs/${team}?query=${name}`)
    dispatch(filterMethod({filter_type:'products', team_type:'q', club: name}))
   }

  
  return (
    <CardContainer onClick={handleClick}>
        <ImageContainer img={logo_url|| primary_image|| image_url }/>
        <BottomContainer>
        <MainHeading>{name? name : `${first_name} ${last_name}` }</MainHeading>
        <SubHeading>{location? location: null}</SubHeading>
        </BottomContainer>
    </CardContainer>
  )
}

export default Card