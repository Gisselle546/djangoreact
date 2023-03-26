import { PageTemplate } from '@/templates/PageTemplate'
import { useRouter } from 'next/router'
import React, {useCallback, useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { filterProduct, filterProductMethod } from '@/redux/reducer/filterSlice'
import { ProductDetailWrapper } from './[id].style'

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
    
    console.log(product); 
  return (
    <>
        <PageTemplate>
          <ProductDetailWrapper>
            
          </ProductDetailWrapper>
        </PageTemplate>
    </>
  )
}

export default ProductDetail