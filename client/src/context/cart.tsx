import React, {createContext, useReducer, useEffect, useContext, Reducer } from 'react';

enum ActionType {
    ADDCART = "ADDCART",
    INCREMENT='INCREMENT',
    DECREMENT='DECREMENT',
    REMOVE='REMOVE'
}

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")!) || []
}

interface Action {
    type: ActionType,
    payload?: any
}

interface State{
    cart: any
}


const reducer: Reducer<State, Action> = (state: State, action: Action) =>{
    
    switch(action.type){
        case ActionType.ADDCART:
            const existingItem = state.cart.find((item: any) => item.id === action.payload.id);
            if (existingItem) {
                return {
                ...state,
                cart: state.cart.map((item: any) =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                };
            } else {
                return {
                ...state,
                cart: [...state.cart, { ...action.payload }],
                };
            }
        
        case ActionType.REMOVE:
            return {
                ...state,
                cart: state.cart.filter((item: any) => item.id !== action.payload.id),
            };
        case ActionType.INCREMENT:
            return {
                ...state,
                cart: state.cart.map((item: any) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
            };
        case ActionType.DECREMENT:
            return {
                ...state,
                cart: state.cart.map((item: any) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
            };
            default:
            return state;
        }

}

const CartContext = createContext<{
  state: State
  addCart:(items:any)=>void
  increment:(items:any)=>void
  decrement:(items:any)=>void
  remove:(items:any)=>void
}>({
    state:initialState,
    addCart:()=>{},
    increment:()=>{},
    decrement:()=>{},
    remove:()=>{}
});

export const CartProvider = (props: {children: React.ReactNode;}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem(
          "cart",
          JSON.stringify(state.cart)
        );
        
      });

    const addCart = (items:any)=>{
        dispatch({
            type:ActionType.ADDCART,
            payload:items!
        })
      }

      const increment = (items:any)=>{
        dispatch({
            type:ActionType.INCREMENT,
            payload:items!
        })
      }
    
      const decrement = (items:any)=>{
        dispatch({
            type:ActionType.DECREMENT,
            payload:items!
        })
      }
    
      const remove=(items:any)=>{
          dispatch({
              type:ActionType.REMOVE,
              payload:items!
          })
      }

    return(
        <CartContext.Provider value={{state,addCart,increment,decrement,remove}}>
            {props.children}
        </CartContext.Provider>
    )
};

export const useStore = () => useContext(CartContext);