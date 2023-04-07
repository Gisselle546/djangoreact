import React from 'react'
import { PaymentMethod, Stripe } from "@stripe/stripe-js";
import { OrderSummaryContainer, OrderSummaryWrapper } from './PlaceOrder.style';

interface PaymentInfo {
  cardBrand: string;
  paymentMethodId: string;
}

type Props ={
  
    paymentMethod: PaymentMethod;
    stripe: any;

  
}

function PlaceOrderForm({ paymentMethod, stripe }: Props) {

  
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

  console.log(paymentMethod)

  
  return (

    <OrderSummaryContainer>
      <h2>Order Summary</h2>
        <OrderSummaryWrapper>
          <div>
            <span>Total:</span>
            
          </div>
          <div>
            <span>Payment method:</span>
            
          </div>
        </OrderSummaryWrapper>
        <button onClick={handleConfirmPayment}>Complete Purchase</button>
    </OrderSummaryContainer>
  )
}

export default PlaceOrderForm