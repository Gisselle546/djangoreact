"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import type { PaymentMethod } from "@stripe/stripe-js";

import ShippingForm from "@/Components/ShippingForm/ShippingForm";
import PaymentForm from "@/Components/PaymentForm/PaymentForm";
import PlaceOrderForm from "@/Components/PlaceOrderForm/PlaceOrderForm";
import OrderConfirmation from "@/Components/OrderConfirmation/OrderConfirmation";

import { useAppSelector } from "@/redux/hooks";
import { shippingValue } from "@/redux/reducer/orderSlice";
import { getSessionValue } from "@/utils/storage";

import { useStore } from "@/context/cart";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_API_KEY as string
);

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

function CheckoutProgress({ step }: { step: number }) {
  const steps = [
    { id: 1, name: "Login" },
    { id: 2, name: "Shipping" },
    { id: 3, name: "Payment" },
    { id: 4, name: "Review" },
    { id: 5, name: "Done" },
  ];

  return (
    <ol className="mx-auto max-w-5xl mb-6 flex items-center justify-between">
      {steps.map((s, idx) => {
        const active = step >= s.id;
        const next = idx < steps.length - 1;

        return (
          <li key={s.id} className="flex items-center">
            <div
              className={[
                "flex size-9 items-center justify-center rounded-full text-xs font-semibold",
                active
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 text-slate-600",
              ].join(" ")}
            >
              {s.id}
            </div>
            <span
              className={[
                "ml-2 text-sm font-medium",
                active ? "text-slate-900" : "text-slate-500",
              ].join(" ")}
            >
              {s.name}
            </span>
            {next && (
              <span
                className={[
                  "mx-3 h-[2px] w-10 sm:w-20 rounded",
                  step > s.id ? "bg-emerald-600" : "bg-slate-200",
                ].join(" ")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ---------- Main ----------
export default function Checkout() {
  const router = useRouter();

  // auth gate
  const token = typeof window !== "undefined" ? getSessionValue("token") : "";
  const [loggedIn] = useState<boolean>(Boolean(token));

  // redux shipping address
  const address = useAppSelector(shippingValue);

  // stripe payment method (set by PaymentForm)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  // current step
  const [step, setStep] = useState<number>(1);

  // cart summary (right column)
  const { state } = useStore();
  const summary = useMemo(() => {
    const items = state.cart ?? [];
    const subtotal = items.reduce(
      (sum: number, it: any) => sum + Number(it.data.price || 0) * it.quantity,
      0
    );
    const shipping = subtotal > 150 ? 0 : 5; // example rule
    const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% example
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [state.cart]);

  // derive step from state
  useEffect(() => {
    if (!loggedIn) {
      setStep(1);
      const t = setTimeout(() => router.push("/signin"), 1200);
      return () => clearTimeout(t);
    }

    // logged in → decide which form to show
    if (!address?.city) {
      setStep(2);
    } else if (!paymentMethod) {
      setStep(3);
    } else {
      setStep(4);
    }
  }, [loggedIn, address?.city, paymentMethod, router]);

  // --- handlers passed to child forms ---
  const handleShipping = () => {
    setStep(3);
  };

  const handlePaymentMethodUpdate = (pm: PaymentMethod) => {
    setPaymentMethod(pm);
    setStep(4);
  };

  const handleOrderPlaced = () => {
    setStep(5);
  };

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <div className="page-container py-8">
        <CheckoutProgress step={step} />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: step content */}
          <div className="lg:col-span-8 space-y-6">
            {step === 1 && (
              <div className="rounded-2xl border bg-white/70 p-6 text-sm shadow-sm">
                Redirecting you to Login…
              </div>
            )}

            {step === 2 && (
              <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Shipping</h2>
                <ShippingForm onShipping={handleShipping} />
              </div>
            )}

            {step === 3 && (
              <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Payment</h2>
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    onPaymentMethodUpdate={handlePaymentMethodUpdate}
                  />
                </Elements>
              </div>
            )}

            {step === 4 && (
              <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Review & Place</h2>
                <PlaceOrderForm
                  paymentMethod={paymentMethod!}
                  stripePromise={stripePromise}
                  onPlaced={handleOrderPlaced}
                />
              </div>
            )}

            {step === 5 && (
              <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
                <OrderConfirmation />
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-medium">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums">
                      {currency(summary.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="tabular-nums">
                      {summary.shipping === 0
                        ? "Free"
                        : currency(summary.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (est.)</span>
                    <span className="tabular-nums">
                      {currency(summary.tax)}
                    </span>
                  </div>
                  <div className="border-t pt-4 text-base font-semibold flex justify-between">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {currency(summary.total)}
                    </span>
                  </div>
                </div>

                {/* Mini cart preview (optional) */}
                <div className="mt-6 space-y-3">
                  {(state.cart ?? []).slice(0, 3).map((it: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={it.data.image}
                        alt={it.data.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {it.data.name}
                        </div>
                        <div className="text-xs text-slate-600">
                          Size: {it.data.size?.label} • Qty {it.quantity}
                        </div>
                      </div>
                      <div className="ml-auto text-sm tabular-nums">
                        {currency(Number(it.data.price) * it.quantity)}
                      </div>
                    </div>
                  ))}
                  {(state.cart ?? []).length > 3 && (
                    <div className="text-xs text-slate-600">
                      +{(state.cart ?? []).length - 3} more item(s)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
