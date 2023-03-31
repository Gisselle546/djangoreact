import React, {useCallback, useEffect} from 'react'
import CardList from '@/Components/CardList/CardList'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { PageTemplate } from '@/templates/PageTemplate';
import { filterMethod, filterValue } from '@/redux/reducer/filterSlice'

function NationalTeam() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(filterValue)


  const fetchNational = useCallback(()=>{
    dispatch(filterMethod({ filter_type: 'teams', team_type: 'national', club: 'true' }))
  },[dispatch])

  useEffect(()=>{
    fetchNational()
  },[fetchNational])


  return (
   <>
    <PageTemplate>
     <CardList data={value} heading={"National Teams"}/>
    </PageTemplate>
   </>
  )
}

export default NationalTeam