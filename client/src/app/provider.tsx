"use client";

import { Provider } from "react-redux";
import { CartProvider } from "@/context/cart";
import store from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartProvider>{children}</CartProvider>
    </Provider>
  );
}
