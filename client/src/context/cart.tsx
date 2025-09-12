"use client";

import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  Reducer,
  useRef,
} from "react";

enum ActionType {
  INIT = "INIT",
  ADDCART = "ADDCART",
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  REMOVE = "REMOVE",
  CLEAR = "CLEAR",
}

type CartItem = {
  data: {
    id: string | number;
    name: string;
    price: number;
    size: { id: string | number; label: string };
    image?: string;
    variantId?: string | number;
  };
  quantity: number;
};

function safeLoadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

interface State {
  cart: CartItem[];
}
interface Action {
  type: ActionType;
  payload?: any;
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.INIT: {
      const items = Array.isArray(action.payload) ? action.payload : [];
      return { ...state, cart: items };
    }
    case ActionType.ADDCART: {
      const updated = [...state.cart];
      const existing = updated.find(
        (c: CartItem) =>
          c.data.id === action.payload.data.id &&
          c.data.size.id === action.payload.data.size.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        updated.push(action.payload);
      }
      return { ...state, cart: updated };
    }
    case ActionType.REMOVE:
      return {
        ...state,
        cart: state.cart.filter(
          (item: CartItem) =>
            !(
              item.data.id === action.payload.data.id &&
              item.data.size.id === action.payload.data.size.id
            )
        ),
      };
    case ActionType.INCREMENT:
      return {
        ...state,
        cart: state.cart.map((item: CartItem) =>
          item.data.id === action.payload.data.id &&
          item.data.size.id === action.payload.data.size.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case ActionType.DECREMENT:
      return {
        ...state,
        cart: state.cart
          .map((item: CartItem) =>
            item.data.id === action.payload.data.id &&
            item.data.size.id === action.payload.data.size.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((i: CartItem) => i.quantity > 0),
      };
    case ActionType.CLEAR:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: State;
  addCart: (item: CartItem) => void;
  increment: (item: CartItem) => void;
  decrement: (item: CartItem) => void;
  remove: (item: CartItem) => void;
  clearAll: () => void;
}>({
  state: { cart: [] },
  addCart: () => {},
  increment: () => {},
  decrement: () => {},
  remove: () => {},
  clearAll: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { cart: [] }, () => ({
    cart: safeLoadCart(),
  }));

  const didHydrateRef = useRef(false);
  useEffect(() => {
    if (!didHydrateRef.current) {
      didHydrateRef.current = true;
      return;
    }
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } catch {}
  }, [state.cart]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cart") {
        dispatch({ type: ActionType.INIT, payload: safeLoadCart() });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addCart = (item: CartItem) =>
    dispatch({ type: ActionType.ADDCART, payload: item });
  const increment = (item: CartItem) =>
    dispatch({ type: ActionType.INCREMENT, payload: item });
  const decrement = (item: CartItem) =>
    dispatch({ type: ActionType.DECREMENT, payload: item });
  const remove = (item: CartItem) =>
    dispatch({ type: ActionType.REMOVE, payload: item });
  const clearAll = () => {
    try {
      localStorage.removeItem("cart");
    } catch {}
    dispatch({ type: ActionType.CLEAR });
  };

  return (
    <CartContext.Provider
      value={{ state, addCart, increment, decrement, remove, clearAll }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useStore = () => useContext(CartContext);
