import React, {useEffect} from 'react'
import CardList from '@/Components/CardList/CardList'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { PageTemplate } from '@/templates/PageTemplate';
import { filterbyClub, filterValue } from '@/redux/reducer/filterSlice'

function NationalTeam() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(filterValue)

  useEffect(()=>{
    dispatch(filterbyClub({ filter_type: 'teams', team_type: 'national', club: 'true' }))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  console.log(value);
  

  return (
   <>
    <PageTemplate>
    <CardList data={value} heading={"National Teams"}/>
    </PageTemplate>
   </>
  )
}

export default NationalTeam