import React from 'react'
import dynamic from 'next/dynamic';


const CartItems = dynamic(() => import('../../Components/CartItems'), {
  ssr: false
});


function Cart() {


    return(
      <>
      <CartItems/>
      </>
      
    )
}

export default Cart