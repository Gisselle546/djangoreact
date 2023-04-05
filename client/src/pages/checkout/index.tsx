import React, { useEffect, useState } from 'react'
import CheckoutProgress from '@/Components/CheckoutProgress';
import { PageTemplate } from '@/templates/PageTemplate';
import { tokenValue } from '@/redux/reducer/userSlice';
import { useAppSelector } from '@/redux/hooks';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ShippingForm from '@/Components/ShippingForm/ShippingForm';
import PaymentForm from '@/Components/PaymentForm/PaymentForm';
import PlaceOrderForm from '@/Components/PlaceOrderForm/PlaceOrderForm';
import OrderConfirmation from '@/Components/OrderConfirmation/OrderConfirmation';


const Spacing = styled.div`
    margin-bottom: 4.5rem;
  `;

function Checkout() {
    const [step, setStep] = useState(1);
    const token = useAppSelector(tokenValue);
    const [loggedIn, setLoggedIn] = useState(token);
    const router = useRouter()

    useEffect(() => {
        if (!loggedIn) {
          // Redirect to the login page if not logged in
          const timeoutId = setTimeout(() => {
            router.push('/signin');
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }{
            setStep(2)
        }
        
      }, [loggedIn, router]);

      const handleShipping = () => {
        // handle shipping logic here
        setStep(3);
      };
    
      const handlePayment = () => {
        // handle payment logic here
        setStep(4);
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
            {step === 1 && <div>Redirecting you to Login</div>}
            {step === 2 && <ShippingForm onShipping={handleShipping} />}
            {step === 3 && <PaymentForm onPayment={handlePayment} />}
            {step === 4 && <PlaceOrderForm onPlaceOrder={handlePlaceOrder} />}
            {step === 5 && <OrderConfirmation />}
            
        </PageTemplate>
    </>
  )
}

export default Checkout