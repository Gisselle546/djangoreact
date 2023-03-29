import React, { useState } from 'react'
import { PageTemplate } from '@/templates/PageTemplate'
import { CartProductItem, CartProductTotal, CartWrapper } from '@/styles/cart/index.style'
import styled from 'styled-components';

function Cart() {
    const [cart, setCart] = useState([])
    let data;
    if(cart.length==0){
        data = 'cart is empty'
    }

const Spacing = styled.div`
  margin-bottom: 4.5rem;
`;
  return (
    <PageTemplate>
        <Spacing/>
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