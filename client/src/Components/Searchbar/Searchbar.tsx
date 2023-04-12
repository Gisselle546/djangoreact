import React, {useState} from 'react'
import { BiSearch } from 'react-icons/bi'
import styled from 'styled-components';
import { useAppDispatch } from '@/redux/hooks'
import { SearchbarWrapper, SearchInput } from './Searchbar.style'
import { Search } from '@/redux/reducer/filterSlice'
import { useRouter } from 'next/router';

function Searchbar() {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };



  function handleKeyPress(event: any) {
    if (event.key === "Enter") {
      // Handle search here
      router.push(`/products/search/${searchTerm}`)

    }
  }

  const StyledIcon = styled(BiSearch)`
  cursor: pointer;
  position: absolute;
  left:60%;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    left:85%;
  }
`;


  return (
    <>
    <SearchbarWrapper>
       <SearchInput className="w3-input w3-border" name="search" type="text" placeholder="Search" value={searchTerm} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
        <StyledIcon />
    </SearchbarWrapper>
    
    </>
  )
}

export default Searchbar