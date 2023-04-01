import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate'
import { ButtonContainer, CartHeaderItems, CartHeaderLength, CartsItems, CartsItem, CartProductItem, CartProductTotal, CartProductTotalHeader, CartWrapper, ItemImageContainer, MappedItemsContainer, Money, OrderItem, OrderItems, OrderWrapper, Submenu, MappedWrapper, ItemDetails, QuantityWrapper, PriceContainer } from './index.style';
import styled from 'styled-components';
import { useStore } from '@/context/cart';


function CartItems() {

 const {state, clearAll, remove, increment, decrement} = useStore();

 const Spacing = styled.div`
    margin-bottom: 4.5rem;
  `;

  const mappedItems = state.cart.map((item:any)=>{
    const leftButton = () => {
      item.quantity===1?(remove(item)):(decrement(item))
    }

    const rightButton = () => {
      if (item.quantity < item.data.inventory) {
       increment(item)
      }
    }
    return(
        <MappedItemsContainer key={item.data.id}>
            <MappedWrapper>
                <ItemImageContainer img={item.data.images[0].url}/>
                <ItemDetails>
                    <div>{item.details.name}</div>
                    <div>Size: {item.data.size.size}</div>
                </ItemDetails>

            </MappedWrapper>
            <QuantityWrapper>
                <div style={{display: 'flex' }}>
                    <ButtonContainer onClick={leftButton}>-</ButtonContainer>
                    <div style={{alignSelf:'center'}}>{item.quantity}</div>
                    <ButtonContainer onClick={rightButton}>+</ButtonContainer>
                </div>
            </QuantityWrapper>
            <PriceContainer>
                <div>${item.details.price}</div>
            </PriceContainer>

        </MappedItemsContainer>
    )
  })

  return (
    <PageTemplate>
        <Spacing/>
            <CartWrapper>
            <CartProductItem>
                 {state.cart.length===0?
                        (
                          <CartsItems>
                            <CartsItem>
                              <CartHeaderItems>
                               <CartHeaderLength> Your Cart ({state.cart.length}) </CartHeaderLength>
                               <ButtonContainer onClick={()=>clearAll()}>Clear Cart</ButtonContainer>
                              </CartHeaderItems>
                            </CartsItem>
                            <div style={{marginLeft: '2rem'}}>
                            Cart is empty!
                            </div>
                       
                          </CartsItems>
                        ) :
                    (
                      <CartsItems>
                        <CartsItem>
                          <CartHeaderItems>
                           <CartHeaderLength> Your Cart ({state.cart.length}) </CartHeaderLength>
                           <ButtonContainer onClick={()=>clearAll()}>Clear Cart</ButtonContainer>
                          </CartHeaderItems>
                        </CartsItem>
                       {mappedItems}
                      </CartsItems>
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

export default CartItems