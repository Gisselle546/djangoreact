import React from 'react'
import { PaymentMethod, Stripe } from "@stripe/stripe-js";
import { FormButton, Item, ItemDetails, ItemImageContainer, ItemSize, Itemlist, MappedItemsContainer, MappedWrapper, OrderLetters, OrderSummaryContainer, OrderSummaryHeader, OrderSummaryWrapper, PlaceOrder, PriceContainer, Span } from './PlaceOrder.style';
import { useStore } from '@/context/cart';
import { QuantityWrapper } from '../CartItems/index.style';

interface PaymentInfo {
  cardBrand: string;
  paymentMethodId: string;
}

type Props ={
  
    paymentMethod: PaymentMethod;
    stripe: any;

  
}

function PlaceOrderForm({ paymentMethod, stripe }: Props) {
  const { state } = useStore()
  
  const handleConfirmPayment = async () => {
    if (!stripe) {
      return;
    }
    console.log('stripe', stripe)
    console.log('paymentmethod', paymentMethod)

    const { error } = await stripe.confirmCardPayment((paymentMethod as any).client_secret, {
      payment_method: paymentMethod.id,
    });

    if (error) {
      console.error(error);
      alert("An error occurred while confirming the payment. Please try again.");
    } else {
      alert("Payment confirmed!");
    }
  };

    let itemsPrice = state.cart.reduce((acc: any, item: any) => acc + item.quantity * item.details.price, 0).toFixed(2)
    let shippingPrice = (itemsPrice < 250 ? 0 : 10).toFixed(2)
    let taxPrice = Number((0.082) * itemsPrice).toFixed(2)
    let discount = Number((0.30)* (Number(itemsPrice) + Number(shippingPrice))).toFixed(2)
    let totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
 
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
  
  
  return (
    <PlaceOrder>
        <Itemlist>

          {mappedItems}

        </Itemlist>
        <OrderSummaryContainer>
            <OrderSummaryWrapper>
            <OrderSummaryHeader>Order Summary</OrderSummaryHeader>
                 <OrderLetters> <div>Total:</div> <Span> ${totalPrice} </Span></OrderLetters>
                <OrderLetters> <div>Shipping:</div> <Span>${shippingPrice}</Span></OrderLetters>
                <OrderLetters> <div>Discount:</div><Span>${discount}</Span></OrderLetters>
              
                <div>Payment method:</div>
                
                <FormButton onClick={handleConfirmPayment}>Complete Purchase</FormButton>
            </OrderSummaryWrapper>
            
        </OrderSummaryContainer>
    </PlaceOrder>
  )
}

export default PlaceOrderForm