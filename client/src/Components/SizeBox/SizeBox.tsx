import React from 'react'
import { ButtonContainer, StyledBoxContainer } from './SizeBox.style'

type Props= {

    product: any

} 

const size=['small', 'medium', 'large']

function SizeBox({product}: Props) {
   
   const data = product.sizes.map((data:any)=>{
  
    return(
        // eslint-disable-next-line react/jsx-key
        <>
           
            <ButtonContainer>{data.size}</ButtonContainer>
          
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