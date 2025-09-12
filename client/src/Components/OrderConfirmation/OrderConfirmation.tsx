// Components/OrderConfirmation/OrderConfirmation.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type OrderItem = {
  name: string;
  sizeLabel?: string;
  quantity: number;
  price: number; // unit price
  image?: string;
};

type ShippingAddress = {
  name?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
};

type LastOrder = {
  id: string;
  email?: string;
  createdAt?: string; // ISO
  total: number;
  tax?: number;
  shipping?: number;
  payment?: { brand?: string; last4?: string };
  address?: ShippingAddress;
  items?: OrderItem[];
};

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

export default function OrderConfirmation() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  if (!order) {
    return (
      <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            ✓
          </div>
          <div>
            <h2 className="text-lg font-semibold">Order confirmed</h2>
            <p className="mt-1 text-sm text-slate-600">
              Thanks for your purchase! We couldn’t load the order details for
              this session, but you can view them in your account.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/account/orders"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-700"
              >
                View orders
              </Link>
              <Link
                href="/"
                className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    id,
    email,
    createdAt,
    total,
    tax = 0,
    shipping = 0,
    payment,
    address,
    items = [],
  } = order;

  const subtotal = Math.max(0, total - Number(tax) - Number(shipping));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            ✓
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold">
              Thanks! Your order is confirmed.
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Order <span className="font-medium text-slate-900">#{id}</span>
              {createdAt && (
                <>
                  {" "}
                  • Placed on{" "}
                  {new Date(createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </>
              )}
              {email && (
                <>
                  {" "}
                  • Confirmation sent to{" "}
                  <span className="font-medium">{email}</span>
                </>
              )}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/account/orders"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-700"
              >
                View order
              </Link>
              <Link
                href="/"
                className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column details */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Items */}
        <div className="lg:col-span-8 rounded-2xl border bg-white/70 p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold">Items</h3>
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-sm text-slate-600">No items to show.</div>
            ) : (
              items.map((it, i) => (
                <div key={i} className="flex items-center gap-3">
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.name}
                      className="h-14 w-14 rounded object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded bg-slate-200" />
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">
                      {it.name}
                    </div>
                    <div className="text-xs text-slate-600">
                      {it.sizeLabel ? `Size: ${it.sizeLabel} • ` : ""}
                      Qty {it.quantity}
                    </div>
                  </div>
                  <div className="ml-auto text-sm tabular-nums">
                    {currency(it.price * it.quantity)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary / Address / Payment */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">{currency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {shipping === 0 ? "Free" : currency(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="tabular-nums">{currency(tax)}</span>
              </div>
              <div className="border-t pt-4 text-base font-semibold flex justify-between">
                <span>Total</span>
                <span className="tabular-nums">{currency(total)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Delivery</h3>
            {address ? (
              <address className="not-italic text-sm text-slate-700 leading-6">
                {address.name && <div>{address.name}</div>}
                {address.street_address && <div>{address.street_address}</div>}
                <div>
                  {[address.city, address.state, address.zip_code]
                    .filter(Boolean)
                    .join(", ")}
                </div>
                {address.country && <div>{address.country}</div>}
              </address>
            ) : (
              <div className="text-sm text-slate-600">No address on file.</div>
            )}
          </div>

          <div className="rounded-2xl border bg-white/70 p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Payment</h3>
            <div className="text-sm text-slate-700">
              {payment?.brand ? (
                <>
                  {payment.brand.toUpperCase()}
                  {payment.last4 ? ` •••• ${payment.last4}` : ""}
                </>
              ) : (
                "Payment method on file"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
