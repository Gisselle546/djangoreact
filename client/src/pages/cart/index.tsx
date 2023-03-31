import React, { useState } from 'react'
import { PageTemplate } from '@/templates/PageTemplate'
import { ButtonContainer, CartHeaderItems, CartHeaderLength, CartItem, CartItems, CartProductItem, CartProductTotal, CartProductTotalHeader, CartWrapper, ItemImageContainer, MappedItemsContainer, Money, OrderItem, OrderItems, OrderWrapper, Submenu } from '@/styles/cart/index.style'
import styled from 'styled-components';
import { useStore } from '@/context/cart';


function Cart() {
  
  const {state, clearAll} = useStore();
 

  const Spacing = styled.div`
    margin-bottom: 4.5rem;
  `;


  const mappedItems = state.cart.map((item:any)=>{
   
    return(
      <MappedItemsContainer key={item.data.id}>

        <div style={{display: 'flex'}}>
          <ItemImageContainer img={item.data.images[0].url}/>
          <div style={{marginLeft:'1rem', display: 'flex', flexDirection: 'column', height: '5rem', justifyContent: 'space-around'}}>
            <div>{item.details.name}</div>
            <div> Size: {item.data.size.size}</div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems:'center', border: '2px solid red'}}>
          <div style={{display: 'flex' }}>
            <ButtonContainer>-</ButtonContainer>
            <div style={{alignSelf:'center'}}>{item.quantity}</div>
            <ButtonContainer>+</ButtonContainer>
          </div>
        </div>
        <div style={{display: 'flex',alignItems:'center', flexDirection:'column', border:'2px solid blue', justifyContent:'center' }}>
          <div>${item.details.price}</div>
        </div>
      </MappedItemsContainer>
    )
  });
    return (
      <PageTemplate>
          <Spacing/>
          <CartWrapper>
              <CartProductItem>
                 {state.cart.length===0?
                        (
                          <CartItems>
                            <CartItem>
                              <CartHeaderItems>
                               <CartHeaderLength> Your Cart ({state.cart.length}) </CartHeaderLength>
                               <ButtonContainer onClick={()=>clearAll()}>Clear Cart</ButtonContainer>
                              </CartHeaderItems>
                            </CartItem>
                            <div style={{marginLeft: '2rem'}}>
                            Cart is empty!
                            </div>
                       
                          </CartItems>
                        ) :
                    (
                      <CartItems>
                        <CartItem>
                          <CartHeaderItems>
                           <CartHeaderLength> Your Cart ({state.cart.length}) </CartHeaderLength>
                           <ButtonContainer onClick={()=>clearAll()}>Clear Cart</ButtonContainer>
                          </CartHeaderItems>
                        </CartItem>
                       {mappedItems}
                      </CartItems>
                    ) 
                }
              </CartProductItem>
              <CartProductTotal>
                <CartProductTotalHeader>
                  Your Order
                </CartProductTotalHeader>
                 <Submenu>{state.cart.length} items</Submenu>
                 <OrderItems>
                  <OrderWrapper><OrderItem>Order Subtotal</OrderItem><Money>0.00</Money></OrderWrapper>
                  <OrderWrapper><OrderItem>Shipping</OrderItem><Money>0.00</Money></OrderWrapper>
                  <OrderWrapper><OrderItem>TAX</OrderItem><Money>0.00</Money></OrderWrapper>
                  <OrderWrapper><OrderItem>Total</OrderItem><Money>0.00</Money></OrderWrapper>
                 </OrderItems>
              </CartProductTotal>
          </CartWrapper>
      </PageTemplate>
    
    )
}

export default Cart