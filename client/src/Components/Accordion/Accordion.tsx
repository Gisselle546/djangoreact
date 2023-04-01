import React, { useState } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp,  } from 'react-icons/ai';
import StarRating from '../StarRating/StarRating';
import { AccordionHeader, AccordionWrapper, Content, Header } from './Accordion.style';

type Props = {
   title: any;
   content: any
   stars?: any
}
//between the header add the stars rating
function Accordion({ title, content }: Props) {
    const [rate, setRate] = useState(3);
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    console.log(content);

  return (
    <AccordionWrapper>
        <AccordionHeader onClick={toggleAccordion}>
          
        <Header> <h2 style={{color:'#a9a9a9'}}>{title}</h2>  {Array.isArray(content) ? (
            <StarRating ratingValue={rate} setRating={(ray) => setRate(ray)} />
          ) : typeof content === 'string' ? (
            <span></span>
          ) : null}
      </Header>
      { isOpen?<AiOutlineArrowUp/> :<AiOutlineArrowDown/>}
      </AccordionHeader>
          {  isOpen&&<div>
              <Content isOpen={isOpen}>
                  {Array.isArray(content) ? 
                   (
                    content.length > 0 ? (
                      content.map((item: any) => (
                        <div key={item.id}>{item.name}</div>
                      ))
                    ) : (
                      <div>No Review yet</div>)
                    ) :typeof content === 'string' ? (
                      <span>{content}</span>
                    ) : null
                  }
              </Content>
            </div>
          }
    </AccordionWrapper>
  )
}

export default Accordion