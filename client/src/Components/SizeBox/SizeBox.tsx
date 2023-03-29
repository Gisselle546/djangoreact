import React, { useState } from 'react'
import { ButtonContainer, StyledBoxContainer } from './SizeBox.style'

type Props= {
    product: any
    onSizeChange: any
    
} 

function SizeBox({product, onSizeChange}: Props) {
 
  const handleSizeClick = (size: any) => {
    onSizeChange(size);
  };

   const data = product.sizes.map((data:any)=>{

    return(
        // eslint-disable-next-line react/jsx-key
        <>
            
            <ButtonContainer  onClick={() => handleSizeClick(data.size)} key={data.id} >{data.size}</ButtonContainer>
          
        </>
    )
   })
  return(
    <>
     <StyledBoxContainer>
        {data}
     </StyledBoxContainer>
    </>
  )
}

export default SizeBox