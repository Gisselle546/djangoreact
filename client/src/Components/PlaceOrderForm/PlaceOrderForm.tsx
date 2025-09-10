"use client";
import React, { useState } from "react";
import { PaymentMethod, Stripe } from "@stripe/stripe-js";
import {
  FormButton,
  Item,
  ItemDetails,
  ItemImageContainer,
  ItemSize,
  Itemlist,
  MappedItemsContainer,
  MappedWrapper,
  OrderLetters,
  OrderSummaryContainer,
  OrderSummaryHeader,
  OrderSummaryWrapper,
  PlaceOrder,
  PriceContainer,
  Span,
} from "./PlaceOrder.style";
import { useStore } from "@/context/cart";
import { QuantityWrapper } from "../CartItems/index.style";
import { createOrder } from "@/redux/reducer/orderSlice";
import { useAppDispatch } from "@/redux/hooks";
import PromoInput from "../PromoInput/PromoInput";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getLocalValue } from "../../../utils/storage";
import customFetch from "../../../utils/axios";

interface PaymentInfo {
  cardBrand: string;
  paymentMethodId: string;
}

type Props = {
  paymentMethod: PaymentMethod;
  stripePromise: any;
};

const Spacing = () => <div style={{ marginBottom: "4.5rem" }} />;

function PlaceOrderForm({ paymentMethod, stripePromise }: Props) {
  const { state, clearAll } = useStore();
  const dispatch = useAppDispatch();
  const [correct, setCorrect] = useState();
  const router = useRouter();
  let itemsPrice = state.cart
    .reduce(
      (acc: any, item: any) => acc + item.quantity * item.details.price,
      0
    )
    .toFixed(2);
  let shippingPrice = (itemsPrice < 250 ? 0 : 10).toFixed(2);
  let taxPrice = Number(0.082 * itemsPrice).toFixed(2);
  let discount = Number(0.3 * itemsPrice).toFixed(2);
  let totalPriceNodiscount = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  let totalPricediscount = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice) -
    Number(discount)
  ).toFixed(2);

  const newArray = state.cart.reduce((acc: any, cur: any) => {
    acc.push({
      product_variant: cur.data,
      quantity: cur.quantity,
    });
    return acc;
  }, []);

  const handleConfirmPayment = async () => {
    if (!stripePromise) {
      return;
    }
    const stripe = await stripePromise;

    let paymentIntent = {
      amount: totalPriceNodiscount,
      currency: "usd",
    };

    const response = await customFetch.post(
      "/create_payment_intent/",
      paymentIntent
    );
    const { client_secret } = response.data;

    const { error } = await stripe.confirmCardPayment(client_secret, {
      payment_method: paymentMethod.id,
    });

    type ShippingAddress = {
      street_address: string;
      city: string;
      state: string;
      zip_code: string;
      country: string;
    };

    let data = {
      payment_method: paymentMethod.card?.brand,
      total_price: correct ? totalPricediscount : totalPriceNodiscount,
      tax_price: taxPrice,
      shipping_price: shippingPrice,
      shippingaddress: getLocalValue("shipping_address") as ShippingAddress,
      order_items: newArray,
    };

    try {
      await dispatch(
        createOrder({
          data: {
            payment_method: data.payment_method as string,
            total_price: data.total_price,
            tax_price: data.tax_price,
            shipping_price: data.shipping_price,
            shipping_address: data.shippingaddress,
            order_items: data.order_items,
          },
        })
      );
      clearAll();
      toast.success("Order submitted successfully!");
      router.push("/");
    } catch (error) {
      toast.error(
        "An error occurred while submitting the order. Please try again later."
      );
    }
  };

  const mappedItems = state.cart.map((item: any) => {
    return (
      <MappedItemsContainer key={item.data.id}>
        <MappedWrapper>
          <ItemImageContainer img={item.data.images[0].url} />
          <ItemDetails>
            <Item>{item.details.name}</Item>
            <ItemSize>Size: {item.data.size.size}</ItemSize>
          </ItemDetails>
        </MappedWrapper>
        <QuantityWrapper>{item.quantity}</QuantityWrapper>

        <PriceContainer>
          <div>${item.details.price}</div>
        </PriceContainer>
      </MappedItemsContainer>
    );
  });

  return (
    <>
      <PromoInput
        correctAnswer="clasico"
        setCorrect={(e: any) => setCorrect(e)}
      />
      <Spacing />
      <PlaceOrder>
        <Itemlist>{mappedItems}</Itemlist>
        <OrderSummaryContainer>
          <OrderSummaryWrapper>
            <OrderSummaryHeader>Order Summary</OrderSummaryHeader>
            <OrderLetters>
              {" "}
              <div>Total:</div>{" "}
              <Span>
                {" "}
                {correct ? totalPricediscount : totalPriceNodiscount}{" "}
              </Span>
            </OrderLetters>
            <OrderLetters>
              {" "}
              <div>Shipping:</div> <Span>${shippingPrice}</Span>
            </OrderLetters>
            <OrderLetters>
              {" "}
              <div>Tax:</div> <Span>${taxPrice}</Span>
            </OrderLetters>
            {correct && (
              <OrderLetters>
                {" "}
                <div>Discount:</div>
                <Span>${discount}</Span>
              </OrderLetters>
            )}

            <div style={{ textTransform: "capitalize" }}>
              Payment method: {paymentMethod.card?.brand}
            </div>

            <FormButton onClick={handleConfirmPayment}>
              Complete Purchase
            </FormButton>
          </OrderSummaryWrapper>
        </OrderSummaryContainer>
      </PlaceOrder>
    </>
  );
}

export default PlaceOrderForm;
