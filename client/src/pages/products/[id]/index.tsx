import { PageTemplate } from '@/templates/PageTemplate'
import { useRouter } from 'next/router'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useStore} from '../../../context/cart';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { filterProduct, filterProductMethod, getAvgReview, avgReview } from '@/redux/reducer/filterSlice'
import { tokenValue } from '@/redux/reducer/userSlice';
import { ButtonContainer, ProductBottom, ProductContainer, ProductDetails, ProductDetailWrapper, ProductHeaders, ProductInfo, ProductSubContainer, SelectOptionWrapper, SizeChart, SubProductHeaders } from './index.style'
import ImageHandler from '@/Components/ImageHandler/ImageHandler'
import SizeBox from '@/Components/SizeBox/SizeBox'
import SelectOption from '@/Components/SelectOption/SelectOption'
import Accordion from '@/Components/Accordion/Accordion'
import styled from 'styled-components'
import {getItemBySize} from '../../../../utils/arr'
import ReviewForm from '@/Components/ReviewForm/ReviewForm';
import { toast } from "react-toastify";


type Props ={
  product : any,
  details: any
}

function ProductDetail() {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useAppDispatch();
    const product = useAppSelector(filterProduct);
    const stars = useAppSelector(avgReview);
    const user = useAppSelector(tokenValue);
    const {addCart} = useStore();

    console.log(product);

    useEffect(() => {
      const hash = router.asPath.split('#')[1];
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [router.asPath]);
    

    const Spacing = styled.div`
      margin-bottom: 4.5rem;
    `

    const BigSpacing = styled.div`
    margin-bottom: 7.5rem;
  `
    const fetchProductDetails = useCallback(() => {
        dispatch(filterProductMethod({ filter_type: 'products', product_id: id }))
        dispatch(getAvgReview({ filter_type: 'products', product_id: id }))
      }, [dispatch, id])
    
      useEffect(() => {
        fetchProductDetails()
      }, [fetchProductDetails])

      const clickHandler = () => {
        if (user) {
          // Navigate to the element with the ID of `product-review-form`
          router.push(`/products/${id}#product-review-form`, undefined, { scroll: true });
        } else {
          // Redirect to the sign-in page if the user is not logged in
          router.push('/signin');
        }
      };
    
      if(!product){
        return <div>....</div>
      }

    function Product({product, details}: any){
      const [quantity, setQuanity] = useState(1);
      const [selectedSize, setSelectedSize] = useState('');
      

      const handleItem = () =>{
        if (selectedSize === '') {
          toast.warning('Please select a size before adding to cart');
          return;
        }
        console.log(product, selectedSize);

        let data = getItemBySize(selectedSize, product);
        toast(`Successfully added ${quantity} ${details.name} to your cart`, {
          hideProgressBar: true,
          autoClose: 1000,
          type: 'success',
        });
        if (data !== null) {
          const cart = { quantity, data: data, details: details };
          console.log(cart, 'cart')
           addCart(cart);
        }
     
      }

      const handleSizeChange = (size: any) => {
        setSelectedSize(size);
      };

      const handleClick = () =>{

        window.location.href="https://soccer.com/content/size-chart"
      }

      console.log(product[0], 'product 000')

      return(
        <ProductSubContainer>
         <ImageHandler image={product[0]?.images}/>
          <ProductDetails>
            <ProductHeaders> {details.name}</ProductHeaders> 
            <SubProductHeaders>${details.price}</SubProductHeaders>
            <SizeChart onClick={handleClick}>Size Chart</SizeChart>
            <SizeBox quantity={quantity} product={details.product_options[0]}  onSizeChange={handleSizeChange}/>
            <SelectOptionWrapper>
            <SelectOption quantity={quantity} onIncrement={(e:any) => setQuanity(+e.target.value)}/>
            </SelectOptionWrapper>
            <ButtonContainer onClick={handleItem}>Add to Cart</ButtonContainer>
          </ProductDetails>
        </ProductSubContainer>
      )
    }

   
  return (
    <>
        <PageTemplate>
          <BigSpacing/>
          <ProductContainer>
            <ProductDetailWrapper>
              <Product details={product} product={product?.product_options[0]?.product_variants}/>
            </ProductDetailWrapper>
            <ProductBottom>
            <Spacing/>
            <ProductInfo>
              <Accordion title={`Reviews (${product.review.length}) `} stars={stars.average_rating}content={product.review} clicked={clickHandler}/>
              <Accordion title={"Details"} content={product.details}/>
              <Accordion title={"Description"} content={product.description}/>
              <Accordion title={"Highlights"} content={product.highlights}/>
            </ProductInfo>
            <BigSpacing/>
            <div id='product-review-form'>
              {user && <ReviewForm product_id={id}/>}
              
            </div>
            </ProductBottom>
          </ProductContainer>
        </PageTemplate>
    </>
  )
}

export default ProductDetail