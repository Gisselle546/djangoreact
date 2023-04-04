import React from 'react'
import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/hooks';
import { filterValue } from '@/redux/reducer/filterSlice';
import { PageTemplate } from '@/templates/PageTemplate';
import QueryList from '@/Components/QueryList/QueryList';

function NationalQuery() {
    
    const value = useAppSelector(filterValue)
    const router = useRouter();
    const { query }= router.query;

  return (
    <PageTemplate>
      <QueryList  data={value} heading={`${query}`}/>
    </PageTemplate>
  )
}

export default NationalQuery