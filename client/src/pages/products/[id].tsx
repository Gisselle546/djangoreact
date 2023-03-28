import { PageTemplate } from '@/templates/PageTemplate'
import { useRouter } from 'next/router'
import React, {useCallback, useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { filterProduct, filterProductMethod } from '@/redux/reducer/filterSlice'
import { ButtonContainer, ProductContainer, ProductDetails, ProductDetailWrapper, ProductHeaders, ProductInfo, ProductSubContainer, SubProductHeaders } from './[id].style'
import ImageHandler from '@/Components/ImageHandler/ImageHandler'
import SizeBox from '@/Components/SizeBox/SizeBox'
import SelectOption from '@/Components/SelectOption/SelectOption'
import Accordion from '@/Components/Accordion/Accordion'

type Props ={
  product : any,
  details: any
}

function ProductDetail() {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useAppDispatch();
    const product = useAppSelector(filterProduct)
    

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

      return(
        <ProductSubContainer>
         <ImageHandler image={product[0]?.images}/>
          <ProductDetails>
            <ProductHeaders> {details.name}</ProductHeaders> 
            <SubProductHeaders>${details.price}</SubProductHeaders>
            <SizeBox product={details.product_options[0]}/>
            <SelectOption/>
            <ButtonContainer>Add to Cart</ButtonContainer>
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
            <ProductInfo>
              <Accordion/>
            </ProductInfo>
          </ProductContainer>
        </PageTemplate>
    </>
  )
}

export default ProductDetail