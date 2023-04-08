import React, { useState } from 'react'
import { PaymentMethod, Stripe } from "@stripe/stripe-js";
import { FormButton, Item, ItemDetails, ItemImageContainer, ItemSize, Itemlist, MappedItemsContainer, MappedWrapper, OrderLetters, OrderSummaryContainer, OrderSummaryHeader, OrderSummaryWrapper, PlaceOrder, PriceContainer, Span } from './PlaceOrder.style';
import { useStore } from '@/context/cart';
import { QuantityWrapper } from '../CartItems/index.style';
import styled from 'styled-components';
import PromoInput from '../PromoInput/PromoInput';

interface PaymentInfo {
  cardBrand: string;
  paymentMethodId: string;
}

type Props ={
  
    paymentMethod: PaymentMethod;
    stripe: any;

  
}

const Spacing = styled.div`
    margin-bottom: 4.5rem;
  `;


function PlaceOrderForm({ paymentMethod, stripe }: Props) {
  const { state } = useStore()
  const [correct, setCorrect] = useState()
  
  const handleConfirmPayment = async () => {
    if (!stripe) {
      return;
    }
   
    const { error } = await stripe.confirmCardPayment((paymentMethod as any).client_secret, {
      payment_method: paymentMethod.id,
    });

    if (error) {
      alert("An error occurred while confirming the payment. Please try again.");
    } else {
      alert("Payment confirmed!");
    }
  };

    let itemsPrice = state.cart.reduce((acc: any, item: any) => acc + item.quantity * item.details.price, 0).toFixed(2)
    let shippingPrice = (itemsPrice < 250 ? 0 : 10).toFixed(2)
    let taxPrice = Number((0.082) * itemsPrice).toFixed(2)
    let discount = Number((0.30) * itemsPrice).toFixed(2)
    let totalPriceNodiscount = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2) 
    let totalPricediscount = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice) - Number(discount)).toFixed(2) 
 
    { correct ?  totalPricediscount: totalPriceNodiscount}


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