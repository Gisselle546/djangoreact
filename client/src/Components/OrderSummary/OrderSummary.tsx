"use client";

import { useStore } from "@/context/cart";

const FREE_SHIP_THRESHOLD = 10000;
const FLAT_SHIP = 500;
const TAX_RATE = 0.085;

const toNumber = (p: unknown) =>
  typeof p === "number" ? p : Number(String(p).replace(/[^0-9.-]/g, "")) || 0;

const toCents = (p: unknown) => Math.round(toNumber(p) * 100);

const formatUSD = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100
  );

function OrderSummary() {
  const { state } = useStore();

  const subtotalCents = state.cart.reduce((sum, item) => {
    const unit = toCents(item.data.price);
    return sum + unit * item.quantity;
  }, 0);

  const shippingCents =
    subtotalCents === 0
      ? 0
      : subtotalCents >= FREE_SHIP_THRESHOLD
      ? 0
      : FLAT_SHIP;

  const taxCents = Math.round(subtotalCents * TAX_RATE);

  const totalCents = subtotalCents + shippingCents + taxCents;

  return (
    <aside className="lg:col-span-4">
      <div className="lg:sticky lg:top-24">
        <div>
          <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
          <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatUSD(subtotalCents)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shippingCents === 0
                  ? subtotalCents === 0
                    ? formatUSD(0)
                    : "Free"
                  : formatUSD(shippingCents)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>{formatUSD(taxCents)}</span>
            </div>

            <div className="border-t pt-4 text-lg font-semibold flex justify-between">
              <span>Total</span>
              <span>{formatUSD(totalCents)}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default OrderSummary;
