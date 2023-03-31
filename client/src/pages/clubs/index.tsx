import React, {useCallback, useEffect} from 'react'
import CardList from '@/Components/CardList/CardList'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { PageTemplate } from '@/templates/PageTemplate'
import { filterMethod, filterValue } from '@/redux/reducer/filterSlice'



function Clubs() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(filterValue)


const fetchClubs = useCallback(()=>{
  dispatch(filterMethod({ filter_type: 'teams', team_type: 'club', club: 'true' }))
},[dispatch])


  useEffect(()=>{
   fetchClubs()
  },[fetchClubs])

  return (
    <PageTemplate>
        <CardList data={value}  heading={"Popular Clubs"}/>
    </PageTemplate>
  )
}

export default Clubs