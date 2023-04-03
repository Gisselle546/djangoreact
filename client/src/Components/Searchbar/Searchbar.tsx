import React from 'react'
import { BiSearch } from 'react-icons/bi'
import styled from 'styled-components';
import { SearchbarWrapper, SearchInput } from './Searchbar.style'

function Searchbar() {


  const StyledIcon = styled(BiSearch)`
  cursor: pointer;
  position: absolute;
  left:60%;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    left:90%;
  }
`;


  return (
    <>
    <SearchbarWrapper>
       <SearchInput className="w3-input w3-border" name="search" type="text" placeholder="Search"/>
        <StyledIcon />
    </SearchbarWrapper>
    
    </>
  )
}

export default Searchbar