import React from 'react'
import { PaymentMethod, Stripe } from "@stripe/stripe-js";

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

    <>
    <h2>Order Summary</h2>
      <div>
        <div>
          <span>Total:</span>
          
        </div>
        <div>
          <span>Payment method:</span>
          
        </div>
      </div>
      <button onClick={handleConfirmPayment}>Complete Purchase</button>
      </>
  )
}

export default PlaceOrderForm