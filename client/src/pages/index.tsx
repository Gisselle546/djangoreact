import Head from 'next/head'
import Image, { StaticImageData } from 'next/image'
import { Inter } from 'next/font/google'
import logo from '../assets/images/logo-grey.png'
import styled, {css} from 'styled-components';
import { PageTemplate } from '@/templates/PageTemplate'
import NotificationBar from '@/Components/NotificationBar/NotificationBar';
import Banner from '@/Components/Banner/Banner';
import first from '../assets/images/messi-1-min.jpg'
import second from '../assets/images/NikeMercurialDream.png';
import third from '../assets/images/M181.jpeg';
import Slider from '@/Components/Slider/Slider';
import Searchbar from '@/Components/Searchbar/Searchbar';
import { filterMethod, filterValue } from '@/redux/reducer/filterSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';


const bannerarr = [
  {name: 'X SPEEDPORTAL MESSI FG', heading: 'Gets the new messi kicks', image: first},
  {name: 'NIKE MERCURIAL DREAM SPEED 6 ', heading : 'get the new ronaldo', image: second},
  {name: 'FUTURE ULTIMATE CREATIVITY FG/AG', heading: 'Go crazy with Neymars creativity', image: third }
]

const Spacing = styled.div`
  margin-bottom: 4.5rem;
`

const SmallSpacing = styled.div`
  margin-bottom: 1rem;
`

const Container = styled.div`

display: flex;
flex-direction: column;

`;

export default function Home() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(filterValue)

  useEffect(()=>{
    dispatch(filterMethod({ filter_type: 'products', team_type: 'tag', club: 'Best Seller' }))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  console.log(value);
  

  return (
    <>
    <PageTemplate type="home">
      <NotificationBar notification='30% off with promo code CLASICO'/>
      <Searchbar/>
      <Banner data={bannerarr}/>
      <Spacing/>
      <Container>
        <h1 style={{fontFamily:'Cairo, sans-serif', textAlign: 'center', width:'100%', textTransform:'capitalize'}}> best sellers</h1>
        <SmallSpacing/>
        <Slider data={value}/>
      </Container>
      <Spacing/>
     
    </PageTemplate>

       
     
    </>
  )
}
