import CartItems from "@/Components/CartItems";
import OrderSummary from "@/Components/OrderSummary/OrderSummary";
import React from "react";

function Cart() {
  return (
    <section className="section-y bg-white min-h-screen">
      <div className="page-container">
        {/* Page header */}
        <header className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Your Bag</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Free shipping over $50. Easy returns within 30 days.
          </p>
        </header>

        {/* Content grid: items (left) + summary (right) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ITEMS */}
          <div className="lg:col-span-8">
            <CartItems />
          </div>

          {/* SUMMARY */}
          <aside className="lg:col-span-4">
            {/* Sticky on desktop */}
            <div className="lg:sticky lg:top-24">
              <OrderSummary />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
