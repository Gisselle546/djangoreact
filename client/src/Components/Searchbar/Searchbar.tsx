import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { SearchbarWrapper, SearchInput } from './Searchbar.style'

function Searchbar() {
  return (
    <>
    <SearchbarWrapper>
       <SearchInput className="w3-input w3-border" name="search" type="text" placeholder="Search"/>
        <BiSearch  size={20} style={{cursor: 'pointer', position: 'absolute', left: '60%'}} />
    </SearchbarWrapper>
    
    </>
  )
}

export default Searchbar