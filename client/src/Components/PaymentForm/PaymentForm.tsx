import React, {useState} from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentFormWrapper, PaymentTotal, PaymentTotalHeader, Submenu, OrderItems, OrderWrapper, OrderItem, Money, FormButton, FormInfo, PaymentFormContainer, CardElementWrapper, CardLabel  } from './PaymentForm.style'
import { useStore } from '@/context/cart';

type Props = {
    onPaymentMethodUpdate: (paymentMethod: any) => void;
}

function PaymentForm({onPaymentMethodUpdate}: Props) {
  const { state } = useStore();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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


  return (
    <PaymentFormWrapper>
        <PaymentFormContainer>
      <form style={{margin: 0, border: 0, height:'100%' }}onSubmit={handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height:'100%',}}>
          <CardLabel htmlFor="card-element">Card Details</CardLabel>
            <div>
              <CardElementWrapper>
                <CardElement id="card-element" />
              </CardElementWrapper>
            </div>
            <div>
              <FormButton type="submit" disabled={processing}>
                  {processing ? "Processing..." : "Next"}
              </FormButton>
            </div>
        </div>
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