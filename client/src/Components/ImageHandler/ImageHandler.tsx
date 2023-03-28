import React, {useState} from 'react'
import { BigContainer, Container, ImageItem, ImageList, ImageWrapper } from './ImageHandler.style'

type Props = {
    image: any
}

function ImageHandler({image}: Props) {
    const [primaryimage, setImage ] = useState(image[0])
   const imagelist = image.map((item: any)=>{
    

   const handleClicker=(item: any)=>{
     setImage(item)
    }

    return (
        <ImageList key={item.id}>
            <Container>
                <ImageItem img={item.url} onClick={()=>handleClicker(item)}/>
            </Container>
        </ImageList>
    )
   })
  return (
    <ImageWrapper>
    <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}} >
      { imagelist}
    </div>
     <BigContainer>
        <ImageItem img={primaryimage.url} />
     </BigContainer>
    </ImageWrapper>
  )
}

export default ImageHandler