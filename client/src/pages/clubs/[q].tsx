import React from 'react'
import { useAppSelector } from '@/redux/hooks';
import { filterValue } from '@/redux/reducer/filterSlice';
import { PageTemplate } from '@/templates/PageTemplate';
import QueryList from '@/Components/QueryList/QueryList';
import { useRouter } from 'next/router';

function ClubQuery() {
  
  const value = useAppSelector(filterValue)
  const router = useRouter();
  const { query }= router.query;

  return (
    <PageTemplate>
      <QueryList  data={value} heading={`${query}`}/>
    </PageTemplate>
  )
}

export default ClubQuery