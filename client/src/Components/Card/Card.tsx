import React from 'react'
import { BottomContainer, CardContainer, ImageContainer } from './Card.style';
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
  
 }

}

function Card({data}:Props) {
  const {logo_url, name, location, team_type} = data;
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
        <ImageContainer img={logo_url}/>
        <BottomContainer>
        <h1>{name}</h1>
        <p>{location}</p>
        </BottomContainer>
    </CardContainer>
  )
}

export default Card