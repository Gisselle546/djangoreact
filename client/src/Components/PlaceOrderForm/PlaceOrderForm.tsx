// Components/PlaceOrderForm/PlaceOrderForm.tsx
"use client";

import React, { useMemo, useState } from "react";
import type { PaymentMethod, Stripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useStore } from "@/context/cart";
import { useAppDispatch } from "@/redux/hooks";
import { createOrder } from "@/redux/reducer/orderSlice";

import PromoInput from "@/Components/PromoInput/PromoInput";
import customFetch from "@/utils/axios";
import { getLocalValue } from "@/utils/storage";

type Props = {
  paymentMethod: PaymentMethod;
  stripePromise: Promise<Stripe | null>;
  onPlaced?: () => void;
};

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

export default function PlaceOrderForm({
  paymentMethod,
  stripePromise,
  onPlaced,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { state, clearAll } = useStore();

  const [promoOk, setPromoOk] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  const summary = useMemo(() => {
    const items = state.cart ?? [];
    const subtotal = items.reduce(
      (sum: number, it: any) => sum + Number(it.data.price || 0) * it.quantity,
      0
    );
    const shipping = subtotal >= 250 ? 0 : 10; // keep your original rule
    const tax = Math.round(subtotal * 0.082 * 100) / 100; // 8.2%
    const discount = promoOk ? Math.round(subtotal * 0.3 * 100) / 100 : 0;
    const total = subtotal + shipping + tax - discount;
    return { items, subtotal, shipping, tax, discount, total };
  }, [state.cart, promoOk]);

  const orderItems = useMemo(
    () =>
      summary.items.map((cur: any) => ({
        product_variant: cur.data,
        quantity: cur.quantity,
      })),
    [summary.items]
  );

  const confirmAndPlace = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error("Stripe is not available. Please try again.");
        setSubmitting(false);
        return;
      }

      // 1) Create PaymentIntent on your backend
      // NOTE: If your backend expects cents, send Math.round(summary.total * 100)
      const intentPayload = {
        amount: summary.total.toFixed(2), // keep string dollars if that's what your API expects
        currency: "usd",
      };
      const resp = await customFetch.post(
        "/create_payment_intent/",
        intentPayload
      );
      const { client_secret } = resp.data;

      // 2) Confirm the payment with the saved PaymentMethod from step 3
      const { error } = await stripe.confirmCardPayment(client_secret, {
        payment_method: paymentMethod.id,
      });
      if (error) {
        toast.error(
          error.message || "Payment failed. Please try another card."
        );
        setSubmitting(false);
        return;
      }

      // 3) Create your order record
      type ShippingAddress = {
        street_address: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
      };
      const shippingAddress = getLocalValue(
        "shipping_address"
      ) as ShippingAddress;

      await dispatch(
        createOrder({
          data: {
            payment_method: paymentMethod.card?.brand ?? "card",
            total_price: summary.total.toFixed(2),
            tax_price: summary.tax.toFixed(2),
            shipping_price: summary.shipping.toFixed(2),
            shipping_address: shippingAddress,
            order_items: orderItems,
          },
        })
      ).unwrap();

      // 4) Success: clear cart + advance
      clearAll();
      toast.success("Order submitted successfully!");
      onPlaced ? onPlaced() : router.push("/"); // default fallback
    } catch (err: any) {
      console.error(err);
      toast.error(
        "An error occurred while submitting the order. Please try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Promo code (kept from your UX) */}
      <PromoInput
        correctAnswer="clasico"
        setCorrect={(v: boolean) => setPromoOk(v)}
      />

      {/* Items */}
      <div className="rounded-2xl border bg-white/70 p-4 md:p-5 shadow-sm">
        <h3 className="mb-3 text-base font-semibold">Items</h3>

        <ul className="divide-y">
          {summary.items.map((item: any, i: number) => (
            <li
              key={`${item.data.id}-${i}`}
              className="flex items-center gap-4 py-3"
            >
              <img
                src={
                  item.data.image ??
                  item.data.images?.[0]?.url ??
                  item.data.images?.[0] ??
                  "/placeholder.png"
                }
                alt={item.data.name}
                className="h-14 w-14 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">
                  {item.data.name}
                </div>
                <div className="text-xs text-slate-600">
                  Size: {item.data.size?.label ?? item.data.size?.name ?? "—"}
                </div>
              </div>
              <div className="text-xs text-slate-600">Qty {item.quantity}</div>
              <div className="ml-4 text-sm tabular-nums">
                {currency(Number(item.data.price) * item.quantity)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment + place order */}
      <div className="rounded-2xl border bg-white/70 p-4 md:p-5 shadow-sm space-y-4">
        <div className="text-sm text-slate-700">
          Payment method:{" "}
          <span className="font-medium capitalize">
            {paymentMethod.card?.brand ?? "card"}
          </span>
          {paymentMethod.card?.last4 && (
            <span className="ml-1 text-slate-600">
              •••• {paymentMethod.card.last4}
            </span>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="tabular-nums">{currency(summary.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="tabular-nums">
              {summary.shipping === 0 ? "Free" : currency(summary.shipping)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="tabular-nums">{currency(summary.tax)}</span>
          </div>
          {summary.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Discount</span>
              <span className="tabular-nums">
                −{currency(summary.discount)}
              </span>
            </div>
          )}
          <div className="border-t pt-3 text-base font-semibold flex justify-between">
            <span>Total</span>
            <span className="tabular-nums">{currency(summary.total)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={confirmAndPlace}
          disabled={submitting}
          className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {submitting ? "Processing…" : "Complete Purchase"}
        </button>
      </div>
    </div>
  );
}
