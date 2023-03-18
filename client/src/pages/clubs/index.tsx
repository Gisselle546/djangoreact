import React, {useEffect} from 'react'
import CardList from '@/Components/CardList/CardList'
import { useAppDispatch } from '@/redux/hooks'
import { PageTemplate } from '@/templates/PageTemplate'
import { filterbyClub } from '@/redux/reducer/filterSlice'

function Clubs() {
  const dispatch = useAppDispatch()
  return (
    <PageTemplate>
        <CardList/>
    </PageTemplate>
  )
}

export default Clubs