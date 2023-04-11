import React, { useState } from 'react'
import { ButtonContainer, StyledBoxContainer } from './SizeBox.style'

type Props= {
    product: any
    onSizeChange: any
    
} 

function SizeBox({product, onSizeChange}: Props) {

 
  const newArray = product.product_variants.reduce((acc:any, cur:any) => {
    acc.push({
      inventory: cur.inventory,
      size: cur.size,
    });
    return acc;
  }, []);

  console.log(newArray,'newArray');

  const handleSizeClick = (size: any) => {
    onSizeChange(size);
  };

   const data = newArray.map((data:any)=>{

    return(
        <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '12px', color: 'red' }}>
          {data.inventory <= 3 ? `Only ${data.inventory} left` : null}
        </div>
        <div style={{ display: 'inline-block'}}>
          <ButtonContainer style={{ marginBottom: data.inventory <= 3 ? '18px' : '0' }} onClick={() => handleSizeClick(data.size)} key={data.size.id}>
            {data.size.size}
          </ButtonContainer>
        </div>
      </div>
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