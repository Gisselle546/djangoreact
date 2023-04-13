import React, { useState } from 'react'
import { ButtonContainer, InnerStyling, Inventory, StyledBoxContainer } from './SizeBox.style'

type Props= {
    product: any
    onSizeChange: any
    quantity: any
} 

function SizeBox({product, onSizeChange, quantity}: Props) {

 
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

    function getStockStatus(data: any, quantity:any) {
      if (data.inventory <= 3) {
        return `Only ${data.inventory} left`;
      } else if (data.inventory < quantity) {
        return 'out of stock';
      } else {
        return null;
      }
    }
    
    return(
        <>
      <InnerStyling>
        <div style={{ marginBottom: '12px' }}>
          <Inventory>{getStockStatus(data, quantity)}</Inventory>
        </div>
        <div style={{ display: 'inline-block'}}>
          <ButtonContainer  disabled={data.inventory<quantity}style={{ marginBottom: data.inventory <= 3 ? '18px' : '0' }} onClick={() => handleSizeClick(data.size.size)} key={data.size.id}>
            {data.size.size}
          </ButtonContainer>
        </div>
      </InnerStyling>
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