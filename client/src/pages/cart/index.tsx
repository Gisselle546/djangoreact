import React, { useState } from 'react'
import { PageTemplate } from '@/templates/PageTemplate'
import { CartProductItem, CartProductTotal, CartWrapper } from '@/styles/cart/index.style'


function Cart() {
    const [cart, setCart] = useState([])
    let data;
    if(cart.length==0){
        data = 'cart is empty'
    }
  return (
    <PageTemplate>
        <CartWrapper>
            <CartProductItem>
                {data}
            </CartProductItem>
            <CartProductTotal>
                hoeuwejnfwjenfkj
            </CartProductTotal>
        </CartWrapper>
    </PageTemplate>
   
  )
}

export default Cart