import React, { useEffect, useState } from 'react'
import SliderCard from '../SliderCard/SliderCard'
import { SliderWrapper } from './Slider.style'
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

type Props = {
  data: any
}


function Slider({data}: Props ) {
  const [index, setIndex] = useState(0);
  const [jersey, setJersey] = useState([]);

  useEffect(() => {
    function getInitialJerseyData() {
      if (!data) {
        return [];
      }
      return data.slice(0, 4);
    }
    setJersey(getInitialJerseyData());
  }, [data]);

  
  const nextPerson = () => {
    setIndex((prevIndex) => {
      let newStartIndex = (prevIndex + 1) % (data.length - 3);
      setJersey(data.slice(newStartIndex, newStartIndex + 4));
      return newStartIndex;
    });
  };



  const prevPerson = () => {
    setIndex((prevIndex) => {
      let newStartIndex = prevIndex - 1;
      if (newStartIndex < 0) {
        newStartIndex = data.length - 4;
      }
      setJersey(data.slice(newStartIndex, newStartIndex + 4));
      return newStartIndex;
    });
  };
  

  if(!jersey){
    return <div>....</div>
  }
  
  
  const card = jersey?.map((cards:any, i: any)=>{
    
    
    return(
      <>
         
      <SliderCard data={cards}/>
     
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