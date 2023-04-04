import { useRouter } from 'next/router';
import { filterPlayerQuery, filterPlayer } from '@/redux/reducer/filterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { PageTemplate } from '@/templates/PageTemplate';
import QueryList from '@/Components/QueryList/QueryList';
import React, {useCallback, useEffect} from 'react'

function PlayersSearch() {
    const dispatch = useAppDispatch()
    const value = useAppSelector(filterPlayer)
    const router = useRouter();
    const { first_name, last_name } = router.query;
  
    const query_player = useCallback(()=>{
        dispatch(filterPlayerQuery({filter_type:'products', player_first_name: `${first_name}`, player_last_name: `${last_name}`}))
      },[dispatch, first_name, last_name]) 
    
      useEffect(()=>{
        query_player()
      }, [query_player])

     
    return (
        <PageTemplate>
         <QueryList  data={value} heading={`${first_name} ${last_name}`}/>
      </PageTemplate>
    );
  
}

export default PlayersSearch