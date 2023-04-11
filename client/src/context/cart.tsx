import React, {createContext, useReducer, useEffect, useContext, Reducer } from 'react';

enum ActionType {
    ADDCART = "ADDCART",
    INCREMENT='INCREMENT',
    DECREMENT='DECREMENT',
    REMOVE='REMOVE',
}

export function getStorageValue(key: any, defaultValue?:any) {
    // getting stored value
    if (typeof window !== 'undefined') {
  const saved = JSON.parse(localStorage.getItem(key)!);
  return saved || defaultValue;
    }
  }
  

const initialState = {
    cart: getStorageValue("cart") || [ ]
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
            const updatedCart = [...state.cart];
            const existingItem = updatedCart.find((cartItem: any) => cartItem.data.id === action.payload.data.id);
            if (existingItem && action.payload.detail!==null) {
              existingItem.quantity += action.payload.quantity;
            } else {
              updatedCart.push(action.payload);
            }
            return {
              ...state,
              cart: updatedCart,
            };
        
        case ActionType.REMOVE:
            return {
                ...state,
                cart: state.cart.filter((item: any) => item.data.id !== action.payload.data.id)
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
                cart: state.cart.map((item: any) =>
                item.data.id === action.payload.data.id &&
                item.data.size.id === action.payload.data.size.id
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
  clearAll:()=>void
}>({
    state:initialState,
    addCart:()=>{},
    increment:()=>{},
    decrement:()=>{},
    remove:()=>{},
    clearAll:()=>{}
});

export const CartProvider = (props: {children: any}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem(
          "cart",
          JSON.stringify(state.cart)
        );
        
      }, [state]);


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

      const clearAll = () =>{
         localStorage.removeItem("cart");
      }

    return(
        <CartContext.Provider value={{state,addCart,increment,decrement,remove, clearAll}}>
            {props.children}
        </CartContext.Provider>
    )
};

export const useStore = () => useContext(CartContext);