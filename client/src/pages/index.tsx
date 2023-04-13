import Head from 'next/head'
import Image, { StaticImageData } from 'next/image'
import { Inter } from 'next/font/google'
import logo from '../assets/images/logo-grey.png'
import styled, {css} from 'styled-components';
import { PageTemplate } from '@/templates/PageTemplate'
import first from '../assets/images/messi-1-min.jpg'
import second from '../assets/images/NikeMercurialDream.png';
import third from '../assets/images/M181.jpeg';
import { filterMethod, filterValue, filterMethodPlayer, filterPlayer } from '@/redux/reducer/filterSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';


const bannerarr = [
  {name: 'X SPEEDPORTAL MESSI FG', heading: 'Gets the new messi kicks', image: first, url:'/products/LIKCOJV8' },
  {name: 'NIKE MERCURIAL DREAM SPEED 6 ', heading : 'get the new ronaldo', image: second, url:'/products/EULFTKOU'},
  {name: 'FUTURE ULTIMATE CREATIVITY FG/AG', heading: 'Go crazy with Neymars creativity', image: third, url:'/products/SHPZ0Y7G' }
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

const Banner = dynamic(() => import('../Components/Banner/Banner'), {
  ssr: false
});

const Slider = dynamic(() => import('../Components/Slider/Slider'), {
  ssr: false
});

const NotificationBar = dynamic(() => import('../Components/NotificationBar/NotificationBar'), {
  ssr: false
});

const Searchbar = dynamic(() => import( '@/Components/Searchbar/Searchbar'), {
  ssr: false
});

export default function Home() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(filterValue)
  const player = useAppSelector(filterPlayer)

  useEffect(()=>{
    dispatch(filterMethod({ filter_type: 'products', team_type: 'tag', club: 'Best Seller' }))
    dispatch(filterMethodPlayer({ filter_type: 'products', team_type: 'playerjersey', club: 'true' }))
    
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
      <Spacing/>
      <Container>
        <h1 style={{fontFamily:'Cairo, sans-serif', textAlign: 'center', width:'100%', textTransform:'capitalize'}}> Player Kits</h1>
        <SmallSpacing/>
        <Slider data={player}/>
      </Container>
     
    </PageTemplate>

       
     
    </>
  )
}
