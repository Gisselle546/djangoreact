"use client";

import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  Reducer,
} from "react";

enum ActionType {
  ADDCART = "ADDCART",
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  REMOVE = "REMOVE",
  CLEAR = "CLEAR",
}

function safeLoadCart(): any[] {
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
  cart: any[];
}
interface Action {
  type: ActionType;
  payload?: any;
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.ADDCART: {
      const updated = [...state.cart];
      const existing = updated.find(
        (c: any) =>
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
          (item: any) =>
            !(
              item.data.id === action.payload.data.id &&
              item.data.size.id === action.payload.data.size.id
            )
        ),
      };
    case ActionType.INCREMENT:
      return {
        ...state,
        cart: state.cart.map((item: any) =>
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
          .map((item: any) =>
            item.data.id === action.payload.data.id &&
            item.data.size.id === action.payload.data.size.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((i: any) => i.quantity > 0),
      };
    case ActionType.CLEAR:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: State;
  addCart: (item: any) => void;
  increment: (item: any) => void;
  decrement: (item: any) => void;
  remove: (item: any) => void;
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
  // Lazy init so we only read localStorage on client
  const [state, dispatch] = useReducer(reducer, { cart: [] }, () => ({
    cart: safeLoadCart(),
  }));

  // Persist after any change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addCart = (item: any) =>
    dispatch({ type: ActionType.ADDCART, payload: item });
  const increment = (item: any) =>
    dispatch({ type: ActionType.INCREMENT, payload: item });
  const decrement = (item: any) =>
    dispatch({ type: ActionType.DECREMENT, payload: item });
  const remove = (item: any) =>
    dispatch({ type: ActionType.REMOVE, payload: item });
  const clearAll = () => {
    localStorage.removeItem("cart");
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
