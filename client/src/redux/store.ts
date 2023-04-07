import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  userSlice  from './reducer/userSlice';
import  filterSlice  from './reducer/filterSlice';
import  orderSlice  from './reducer/orderSlice';




export function makeStore(){
    return configureStore({
        reducer: {
            auth: userSlice,
            filter: filterSlice,
            order: orderSlice
        }
        
    })
}

const store = makeStore()
export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
  >
  
  export default store
  