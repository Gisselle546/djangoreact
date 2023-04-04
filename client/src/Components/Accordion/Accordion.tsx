import React, { useState } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp,  } from 'react-icons/ai';
import StarRating from '../StarRating/StarRating';
import { AccordionHeader, AccordionWrapper, Content, Header, Here, Innerheader } from './Accordion.style';

type Props = {
   title: any;
   content: any
   stars?: any
   clicked?: any
}
//between the header add the stars rating
function Accordion({ title, content, stars, clicked }: Props) {
    const [rate, setRate] = useState(stars);
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    const clickHandle = ()=>{
      clicked()
    }

  return (
    <AccordionWrapper>
        <AccordionHeader onClick={toggleAccordion}>
          
        <Header> <Innerheader>{title}</Innerheader>  {Array.isArray(content) ? (
            <StarRating ratingValue={rate} changable={false} setRating={(ray) => setRate(ray)} />
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
                        <div key={item.id}>
                          {item.name} - <StarRating ratingValue={item.rating} changable={false} setRating={(ray) => setRate(ray)} />
                          <div> {item.comment} </div>
                        </div>
                      ))
                    ) : (
                      <div>Be the first to review this product <Here onClick={clickHandle}>Here!</Here></div>)
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