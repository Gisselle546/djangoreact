import React, {useEffect, useState} from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentFormWrapper, PaymentTotal, PaymentTotalHeader, Submenu, OrderItems, OrderWrapper, OrderItem, Money, FormButton, FormInfo, PaymentFormContainer, CardElementWrapper, CardLabel, CardContainer, InputWrapper  } from './PaymentForm.style'
import { useStore } from '@/context/cart';
import router from 'next/router';
import { toast } from 'react-toastify';

type Props = {
    onPaymentMethodUpdate: (paymentMethod: any) => void;
}

function PaymentForm({onPaymentMethodUpdate}: Props) {
  const { state } = useStore();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [fullName, setFullName ] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Invalid card element");
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    setProcessing(false);

    if (error) {
      setError(error.message ?? "An error occurred while creating payment method");
      return;
    }

    onPaymentMethodUpdate(paymentMethod);
  };

  useEffect(()=>{
    if(state.cart.length <1){
      toast('Please add items into your cart to checkout')
      router.push("/")
    };
   
  },[state.cart])


  return (
    <PaymentFormWrapper>
        <PaymentFormContainer>
      <form style={{margin: 0, border: 0, height:'100%' }}onSubmit={handleSubmit}>
        <CardContainer>
          
          <CardLabel htmlFor="card-element">Card Details</CardLabel>
            <div>
            <InputWrapper type="text" id="name" name="name" placeholder=' Full Name (as it appears on card)' onChange={(e:any)=>setFullName(e.target.value)}/>
              <CardElementWrapper>
                <CardElement id="card-element" />
              </CardElementWrapper>
            </div>
            <div>
              <FormButton type="submit" disabled={processing}>
                  {processing ? "Processing..." : "Next"}
              </FormButton>
            </div>
        </CardContainer>
      </form>
    </PaymentFormContainer>
      
      <PaymentTotal>
                <PaymentTotalHeader>
                  Your Order
                </PaymentTotalHeader>
                 <Submenu>{state.cart.length} items</Submenu>
                 <OrderItems>
                  <OrderWrapper><OrderItem>Order Subtotal</OrderItem><Money>${state.cart.reduce((acc:any, item: any) => acc + item.quantity * item.details.price, 0).toFixed(2)}</Money></OrderWrapper>
                  <OrderWrapper><OrderItem>Shipping</OrderItem><Money>0.00</Money></OrderWrapper>
                  <OrderWrapper><OrderItem>TAX</OrderItem><Money>0.00</Money></OrderWrapper>
                  <OrderWrapper><OrderItem>Total</OrderItem><Money>0.00</Money></OrderWrapper>
                 </OrderItems>
      </PaymentTotal>  
    </PaymentFormWrapper>
  )
}

export default PaymentForm