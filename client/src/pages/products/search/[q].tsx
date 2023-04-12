import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {filterSearch, Search } from '@/redux/reducer/filterSlice';
import { PageTemplate } from '@/templates/PageTemplate'
import QueryList from '@/Components/QueryList/QueryList';

function SearchQuery() {
    const dispatch = useAppDispatch()
    const value = useAppSelector(filterSearch)
    const router = useRouter();
    const query = router.query.q;

    console.log(query);

    const search_query = useCallback(()=>{
        dispatch(Search({searchterm: `${query}`}))
    },[dispatch,query])

    console.log(value);

  useEffect(()=>{
    search_query()
   },[search_query])

  return (
    <PageTemplate>
      <QueryList data={value} heading={`${query}`.toUpperCase()}/>
    </PageTemplate>
  )
}

export default SearchQuery