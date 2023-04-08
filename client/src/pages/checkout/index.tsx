import React, { useEffect, useState } from 'react'
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentMethod } from "@stripe/stripe-js";
import { PageTemplate } from '@/templates/PageTemplate';
import { useAppSelector } from '@/redux/hooks';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ShippingForm from '@/Components/ShippingForm/ShippingForm';
import PaymentForm from '@/Components/PaymentForm/PaymentForm';
import PlaceOrderForm from '@/Components/PlaceOrderForm/PlaceOrderForm';
import OrderConfirmation from '@/Components/OrderConfirmation/OrderConfirmation';
import { shippingValue } from '@/redux/reducer/orderSlice';
import dynamic from 'next/dynamic';
import { getStorageValue } from '../../../utils/storage';

const CheckoutProgress = dynamic(() => import('@/Components/CheckoutProgress'), {
  ssr: false
});


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);


const Spacing = styled.div`
    margin-bottom: 4.5rem;
  `;

const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


function Checkout() {
    const [step, setStep] = useState(1);
    const token = getStorageValue('token')
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const address = useAppSelector(shippingValue)
    
    const [loggedIn, setLoggedIn] = useState(token);
    const router = useRouter()

    const handlePaymentMethodUpdate = (newPaymentMethod: PaymentMethod) => {
      setPaymentMethod(newPaymentMethod);
      setStep(4)
    };

    useEffect(() => {
        if (!loggedIn) {
          // Redirect to the login page if not logged in
          const timeoutId = setTimeout(() => {
            router.push('/signin');
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }{
          if (address.city!=='') {
            setStep(3);
          } else {
            setStep(2);
          }

          if(paymentMethod!==null){
            setStep(4)
          }else{
            setStep(3)
          }
        }
        
      }, [loggedIn, router, address, paymentMethod]);

      const handleShipping = () => {
        // handle shipping logic here
        setStep(3);
      };
    
    
      const handlePlaceOrder = () => {
        // handle place order logic here
        setStep(5);
      };

  return (
    <>
        <PageTemplate>
            <Spacing/>
            <CheckoutProgress step={step} loggedIn={loggedIn}/>
            <Spacing/>
            {step === 1 && <RedirectContainer>Redirecting you to Login</RedirectContainer>}
            {step === 2 && <ShippingForm onShipping={handleShipping} />}
            {step === 3 && 
                <>
                  <Elements stripe={stripePromise}>
                    <PaymentForm  onPaymentMethodUpdate={handlePaymentMethodUpdate}/>
                  </Elements>
                </>
                
            }
            {step === 4 && <PlaceOrderForm paymentMethod={paymentMethod!} stripePromise={stripePromise}  />}
            {step === 5 && <OrderConfirmation />}
            
        </PageTemplate>
    </>
  )
}

export default Checkout