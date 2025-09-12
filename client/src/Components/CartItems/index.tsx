"use client";

import React from "react";
import { useStore } from "@/context/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";

function CartItems() {
  const { state, clearAll, remove, increment, decrement } = useStore();
  const router = useRouter();

  return (
    <div className="page-container">
      {state.cart.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <button
            onClick={() => router.push("/footwear")}
            className="px-4 py-2 bg-emerald-600 text-white cursor-pointer rounded hover:bg-emerald-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2 text-sm text-slate-800">
              {/* Sticky, clean header */}
              <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur [&>tr>th]:p-3 [&>tr>th]:text-left [&>tr>th]:font-semibold [&>tr>th]:text-slate-600">
                <tr>
                  <th>Product</th>
                  <th className="hidden sm:table-cell">Size</th>
                  <th>Quantity</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody
                className="
        [&>tr]:bg-white [&>tr]:shadow-sm [&>tr]:border [&>tr]:border-slate-200
        [&>tr]:rounded-xl [&>tr>td]:p-3
        [&>tr>td:first-child]:rounded-l-xl [&>tr>td:last-child]:rounded-r-xl
      "
              >
                {state.cart.map((item: any, index: number) => {
                  const unit =
                    typeof item.data.price === "number"
                      ? item.data.price
                      : Number(
                          String(item.data.price).replace(/[^0-9.-]/g, "")
                        ) || 0;

                  return (
                    <tr key={index} className="align-middle">
                      {/* Product */}
                      <td>
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.data.image}
                            alt={item.data.name}
                            className="size-16 rounded-md object-cover ring-1 ring-slate-200"
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 line-clamp-2">
                              {item.data.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {item.data.size?.label}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="hidden sm:table-cell text-slate-700">
                        {item.data.size?.label}
                      </td>

                      <td>
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => decrement(item)}
                            aria-label="Decrease quantity"
                            className="size-8 rounded-md border border-slate-300 hover:bg-slate-50 active:scale-95 transition"
                          >
                            −
                          </button>
                          <span className="min-w-[2ch] text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increment(item)}
                            aria-label="Increase quantity"
                            className="size-8 rounded-md border border-slate-300 hover:bg-slate-50 active:scale-95 transition"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="text-right tabular-nums">
                        ${unit.toFixed(2)}
                      </td>

                      <td className="text-right tabular-nums font-semibold">
                        ${(unit * item.quantity).toFixed(2)}
                      </td>

                      <td className="text-right">
                        <button
                          onClick={() => remove(item)}
                          className="inline-flex items-center gap-1 rounded-md border border-transparent px-3 py-1.5 text-slate-500 hover:text-red-600 hover:border-red-100 hover:bg-red-50/50 transition"
                        >
                          <svg
                            className="size-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M6 7a1 1 0 011-1h6a1 1 0 011 1v9a2 2 0 01-2 2H8a2 2 0 01-2-2V7z" />
                            <path d="M9 1a1 1 0 00-1 1v1H5.5a.5.5 0 000 1h9a.5.5 0 000-1H12V2a1 1 0 00-1-1H9z" />
                          </svg>
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between items-center section-y">
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
            <button
              onClick={() => router.push("/checkout")}
              className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItems;
