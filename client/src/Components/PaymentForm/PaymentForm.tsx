"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { PaymentMethod } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useStore } from "@/context/cart";

type Props = {
  onPaymentMethodUpdate: (paymentMethod: PaymentMethod) => void;
};

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

export default function PaymentForm({ onPaymentMethodUpdate }: Props) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useStore();

  const [fullName, setFullName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // Redirect if cart is empty
  useEffect(() => {
    if (!state.cart || state.cart.length === 0) {
      toast("Please add items into your cart to checkout");
      router.push("/");
    }
  }, [state.cart, router]);

  // Order math (match PlaceOrderForm)
  const summary = useMemo(() => {
    const items = state.cart ?? [];
    const subtotal = items.reduce(
      (sum: number, it: any) => sum + Number(it.data.price || 0) * it.quantity,
      0
    );
    const shipping = subtotal >= 250 ? 0 : 10;
    const tax = Math.round(subtotal * 0.082 * 100) / 100; // 8.2%
    const total = subtotal + shipping + tax;
    return { itemsCount: items.length, subtotal, shipping, tax, total };
  }, [state.cart]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg(null);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrMsg("Card element not found.");
      return;
    }

    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: { name: fullName },
    });
    setProcessing(false);

    if (error || !paymentMethod) {
      setErrMsg(error?.message ?? "Failed to create payment method.");
      return;
    }

    onPaymentMethodUpdate(paymentMethod);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Left: Card form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Full name (as it appears on card)
          </label>
          <input
            id="name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="Jane Appleseed"
            required
          />
        </div>

        <div>
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-slate-700"
          >
            Card details
          </label>
          <div className="mt-1 rounded-lg border px-3 py-3">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: { fontSize: "16px" },
                  invalid: { color: "#ef4444" },
                },
              }}
            />
          </div>
        </div>

        {errMsg && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={processing || !stripe || !elements || !fullName}
          className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {processing ? "Processing…" : "Next"}
        </button>
      </form>

      {/* Right: Order summary */}
      <aside className="rounded-2xl border bg-white/70 p-4 shadow-sm md:p-5">
        <h3 className="mb-2 text-base font-semibold">Your Order</h3>
        <div className="text-sm text-slate-600 mb-4">
          {summary.itemsCount} item{summary.itemsCount === 1 ? "" : "s"}
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
          <div className="border-t pt-3 text-base font-semibold flex justify-between">
            <span>Total</span>
            <span className="tabular-nums">{currency(summary.total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
