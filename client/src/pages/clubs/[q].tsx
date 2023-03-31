import React,{useCallback, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { filterMethod, filterValue } from '@/redux/reducer/filterSlice';
import { PageTemplate } from '@/templates/PageTemplate';
import QueryList from '@/Components/QueryList/QueryList';
import { useRouter } from 'next/router';

function ClubQuery() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(filterValue)
  const router = useRouter();
  const { query }= router.query;

  const queryClub = useCallback(()=>{
    dispatch(filterMethod({filter_type:'products', team_type:'q', club: `${query}`}))
  },[dispatch, query]) 

  useEffect(()=>{
    queryClub()
  },[queryClub])

  return (
    <PageTemplate>
      <QueryList data={value} heading={`${query}`}/>
    </PageTemplate>
  )
}

export default ClubQuery