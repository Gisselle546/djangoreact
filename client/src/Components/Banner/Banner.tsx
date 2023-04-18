import { StaticImageData } from 'next/image'
import React, { useState } from 'react'
import { BannerContainer, BannerItems, BannerItem, BannerHeading } from './Banner.style'
import { useRouter } from 'next/router'

type ArrData  = {

    name: string
    image: StaticImageData
    heading: string
    url: any
}

type BannerProps = {
    data: Array<ArrData>
}

   


function Banner({data}:BannerProps) {
    const [hoveredItem, setHoveredItem] = useState('');
    const router = useRouter()
    const handleMouseEnter = (name: string) => {
        setHoveredItem(name);
    };

    const handleMouseLeave = () => {
        setHoveredItem('');
    };

    const arr = data.map((item: ArrData)=>{
        return( 
            <BannerItem key={item.name}  onMouseEnter={() => handleMouseEnter(item.name)} onMouseLeave={handleMouseLeave} img={item.image.src} onClick={()=>router.push(item.url)} >
             { hoveredItem === item.name &&<BannerHeading>{item.name}</BannerHeading>}
            </BannerItem>

           
        )
    })

  return (
    <BannerContainer>
       <BannerItems>
            {arr}
       </BannerItems>
    </BannerContainer>
  )
}

export default Banner