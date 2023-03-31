import { PageTemplate } from '@/templates/PageTemplate'
import { useRouter } from 'next/router'
import React, {useCallback, useEffect, useState} from 'react'
import {useStore} from '../../context/cart';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { filterProduct, filterProductMethod } from '@/redux/reducer/filterSlice'
import { ButtonContainer, ProductBottom, ProductContainer, ProductDetails, ProductDetailWrapper, ProductHeaders, ProductInfo, ProductSubContainer, SizeChart, SubProductHeaders } from './[id].style'
import ImageHandler from '@/Components/ImageHandler/ImageHandler'
import SizeBox from '@/Components/SizeBox/SizeBox'
import SelectOption from '@/Components/SelectOption/SelectOption'
import Accordion from '@/Components/Accordion/Accordion'
import styled from 'styled-components'
import {getItemBySize} from '../../../utils/arr'

type Props ={
  product : any,
  details: any
}




function ProductDetail() {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useAppDispatch();
    const product = useAppSelector(filterProduct);
    const {addCart} = useStore();
    
   

    const Spacing = styled.div`
      margin-bottom: 4.5rem;
    `


    const fetchProductDetails = useCallback(() => {
        dispatch(filterProductMethod({ filter_type: 'products', product_id: id }))
      }, [dispatch, id])
    
      useEffect(() => {
        fetchProductDetails()
      }, [fetchProductDetails])
    
      if(!product){
        return <div>....</div>
      }

    function Product({product, details}: any){
      const [quantity, setQuanity] = useState(1);
      const [selectedSize, setSelectedSize] = useState('');

      const handleItem = () =>{
        let data = getItemBySize(selectedSize,product);
         const cart = {quantity, data: data, details:details}
        addCart(cart);
        return data;
      }

     
     

      const handleSizeChange = (size: any) => {
        setSelectedSize(size);
      };

      

      console.log(product);
     
       const handleClick = () =>{

        window.location.href="https://soccer.com/content/size-chart"
      }

      return(
        <ProductSubContainer>
         <ImageHandler image={product[0]?.images}/>
          <ProductDetails>
            <ProductHeaders> {details.name}</ProductHeaders> 
            <SubProductHeaders>${details.price}</SubProductHeaders>
            <SizeChart onClick={handleClick}>Size Chart</SizeChart>
            <SizeBox product={details.product_options[0]}  onSizeChange={handleSizeChange}/>
            <SelectOption quantity={quantity} onIncrement={(e:any) => setQuanity(+e.target.value)}/>
            <ButtonContainer onClick={handleItem}>Add to Cart</ButtonContainer>
          </ProductDetails>
        </ProductSubContainer>
      )
    }

   
  return (
    <>
        <PageTemplate>
          <ProductContainer>
            <ProductDetailWrapper>
              <Product details={product} product={product?.product_options[0]?.product_variants}/>
            </ProductDetailWrapper>
            <ProductBottom>
            <Spacing/>
            <ProductInfo>
              <Accordion title={`Reviews (${product.review.length})`} content={product.review}/>
              <Accordion title={"Details"} content={product.details}/>
              <Accordion title={"Description"} content={product.description}/>
              <Accordion title={"Highlights"} content={product.highlights}/>
            </ProductInfo>
            </ProductBottom>
          </ProductContainer>
        </PageTemplate>
    </>
  )
}

export default ProductDetail