import React, { useState } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp,  } from 'react-icons/ai';
import { AccordionHeader, AccordionWrapper, Content, Header } from './Accordion.style';

type Props = {
   title: any;
   content: any
}

function Accordion({ title, content }: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    console.log(isOpen);

  return (
    <AccordionWrapper>
        <AccordionHeader onClick={toggleAccordion}>
        <Header>{title}</Header>
      { isOpen?<AiOutlineArrowUp/> :<AiOutlineArrowDown/>}
      </AccordionHeader>
          {  isOpen&&<div>
              <Content isOpen={isOpen}>
                  {Array.isArray({content}) ? (
                content.map((item:any) => <div key={item.id}>{item.name}</div>)
                ) : (
                <> No Review yet</>
                )}
              </Content>
            </div>
          }
    </AccordionWrapper>
  )
}

export default Accordion