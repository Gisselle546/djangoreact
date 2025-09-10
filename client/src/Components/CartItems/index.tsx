"use client";

import React from "react";
import { useStore } from "@/context/cart";
import { useRouter } from "next/navigation";

function CartItems() {
  const { state, clearAll, remove, increment, decrement } = useStore();
  const router = useRouter();

  return (
    <div className="page-container">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
      {state.cart.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <button
            onClick={() => router.push("/footwear")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4 text-left">Product</th>
                <th className="border-b p-4 text-left">Size</th>
                <th className="border-b p-4 text-left">Quantity</th>
                <th className="border-b p-4 text-left">Price</th>
                <th className="border-b p-4 text-left">Total</th>
                <th className="border-b p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.cart.map((item: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={item.data.primary_image}
                      alt={item.data.name}
                      className="w-16 h-16 object-cover"
                    />
                    <span>{item.data.name}</span>
                  </td>
                  <td className="p-4">{item.data.size.name}</td>
                  <td className="p-4 flex items-center gap-2">
                    <button
                      onClick={() => decrement(item)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increment(item)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </td>
                  <td className="p-4">${item.data.price.toFixed(2)}</td>
                  <td className="p-4">
                    ${(item.data.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => remove(item)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
            <button
              onClick={() => router.push("/checkout")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
