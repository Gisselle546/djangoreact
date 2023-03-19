import React, { useState } from 'react'
import SliderCard from '../SliderCard/SliderCard'
import { SliderWrapper } from './Slider.style'
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

type Props = {
  data: any
}


function Slider({data}: Props ) {
  const [index, setIndex] = useState(0);

  const checkNumber=(number :any) =>{
    if( number > data.length - 1){
      return 0;
    }
    if(number < 0){
      return data.length -1
    }
    return number
  }

  const nextPerson = () => {
      setIndex((prevIndex)=>{
          let nowindex = prevIndex + 1
          return checkNumber(nowindex)
      })
     
  }

  const prevPerson = () =>{

      setIndex((prevIndex)=>{
        let nowindex = prevIndex - 1
        return checkNumber(nowindex)
    })
      
     
  }
  

  if(!data){
    return <div>....</div>
  }

  console.log(index);
  
 
  const card = data?.map((cards:any, i: any)=>{
    
    const borderwrapper = index===i? '2px solid blue': ''
    return(
        <>
         <div style={{border: borderwrapper}}>
          <SliderCard data={cards}/>
        </div>
       </>
      )
  })

  

  return (
    <>
    <SliderWrapper>
    <AiOutlineArrowLeft size={30} style={{position: 'absolute', left:'0', top:'40%',verticalAlign:'middle', cursor: 'pointer'}} onClick={()=>prevPerson()}/>
       
          {card}
     
    <AiOutlineArrowRight size={30} style={{position: 'absolute', right: '0%',  top:'40%', verticalAlign:'middle', cursor: 'pointer'}} onClick={()=>nextPerson()}/>
    </SliderWrapper>
    </>
  )
}

export default Slider