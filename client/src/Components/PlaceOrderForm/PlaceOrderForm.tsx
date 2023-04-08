import React, { useState } from 'react'
import { PaymentMethod, Stripe } from "@stripe/stripe-js";
import { FormButton, Item, ItemDetails, ItemImageContainer, ItemSize, Itemlist, MappedItemsContainer, MappedWrapper, OrderLetters, OrderSummaryContainer, OrderSummaryHeader, OrderSummaryWrapper, PlaceOrder, PriceContainer, Span } from './PlaceOrder.style';
import { useStore } from '@/context/cart';
import { QuantityWrapper } from '../CartItems/index.style';
import { createOrder } from '@/redux/reducer/orderSlice';
import { useAppDispatch } from '@/redux/hooks';
import styled from 'styled-components';
import PromoInput from '../PromoInput/PromoInput';
import { getStorageLocal } from '../../../utils/storage';

interface PaymentInfo {
  cardBrand: string;
  paymentMethodId: string;
}

type Props ={
  
    paymentMethod: PaymentMethod;
    stripePromise: any;

  
}

const Spacing = styled.div`
    margin-bottom: 4.5rem;
  `;


function PlaceOrderForm({ paymentMethod, stripePromise }: Props) {
  const { state } = useStore()
  const dispatch = useAppDispatch()
  console.log(stripePromise)
  console.log(paymentMethod, 'paymentmethod')
  const [correct, setCorrect] = useState()

  let itemsPrice = state.cart.reduce((acc: any, item: any) => acc + item.quantity * item.details.price, 0).toFixed(2)
  let shippingPrice = (itemsPrice < 250 ? 0 : 10).toFixed(2)
  let taxPrice = Number((0.082) * itemsPrice).toFixed(2)
  let discount = Number((0.30) * itemsPrice).toFixed(2)
  let totalPriceNodiscount = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2) 
  let totalPricediscount = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice) - Number(discount)).toFixed(2) 
  
  const handleConfirmPayment = async () => {
    if (!stripePromise) {
      return;
    }
    const stripe = await stripePromise;
   
    const { paymentIntent, error } = await stripe.confirmCardPayment((paymentMethod as any).client_secret, {
      payment_method: paymentMethod.id,
    });
  
    if (paymentIntent) {
      let data = {
        payment_method: paymentMethod,
        total_price: totalPriceNodiscount,
        tax_price: taxPrice,
        shipping_price: shippingPrice,
        order_id: null,
        shippingaddress: getStorageLocal('shipping_address'),
        order_items: state.cart
      }
    
      try {
        await dispatch(createOrder(data))
      } catch (error) {
        console.log(error)
      }
    }
    
  }

   


    const mappedItems = state.cart.map((item:any)=>{
   

      return(
          <MappedItemsContainer key={item.data.id}>
              <MappedWrapper>
                  <ItemImageContainer  img={item.data.images[0].url}/>
                  <ItemDetails>
                      <Item>{item.details.name}</Item>
                      <ItemSize>Size: {item.data.size.size}</ItemSize>
                  </ItemDetails>
              </MappedWrapper>
              <QuantityWrapper>
                  {item.quantity}
              </QuantityWrapper>
        
              <PriceContainer>
                  <div>${item.details.price}</div>
              </PriceContainer>
  
          </MappedItemsContainer>
      )
    })
  
  console.log(paymentMethod.card?.brand);
  return (

    <>
    <PromoInput correctAnswer="clasico" setCorrect={(e:any)=>setCorrect(e)}/>
    <Spacing/>
    <PlaceOrder>
        <Itemlist>

          {mappedItems}

        </Itemlist>
        <OrderSummaryContainer>
            <OrderSummaryWrapper>
            <OrderSummaryHeader>Order Summary</OrderSummaryHeader>
                <OrderLetters> <div>Total:</div> <Span> { correct ?  totalPricediscount: totalPriceNodiscount} </Span></OrderLetters>
                <OrderLetters> <div>Shipping:</div> <Span>${shippingPrice}</Span></OrderLetters>
                <OrderLetters> <div>Tax:</div> <Span>${taxPrice}</Span></OrderLetters>
                {correct &&<OrderLetters> <div>Discount:</div><Span>${discount}</Span></OrderLetters>}
              
                <div style={{textTransform: 'capitalize'}}>Payment method: {paymentMethod.card?.brand}</div>
                
                <FormButton onClick={handleConfirmPayment}>Complete Purchase</FormButton>
            </OrderSummaryWrapper>
            
        </OrderSummaryContainer>
    </PlaceOrder>
    </>
  )
}

export default PlaceOrderForm