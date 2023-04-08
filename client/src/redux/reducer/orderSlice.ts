import { AppState } from "../store";
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import { create_order } from "../action/create_order";
import { getStorageLocal, setStorageLocal } from "../../../utils/storage";

interface Product {
    quantity: any;
    product_variant: {
         id: any
         name: string;
         price: any
         stock: any
    }
}

export interface Order{
    data: {
        payment_method: string;
        tax_price: any;
        shipping_price: any;
        total_price: any;
        order_id?: string;
        shipping_address:{
            street_address: string;
            city: string;
            state: string;
            zip_code: string;
        }
        order_items:[Product]  
    },
    status: 'idle' | 'loading' | 'failed';
    error?: {} | any;
}

const initialState: Order = {
    data: {
        payment_method: '',
        tax_price: '',
        shipping_price: '',
        total_price: 0.00,
        order_id: '',
        shipping_address: getStorageLocal('shipping_address') ||{
            street_address: '',
            city: '',
            state: '',
            zip_code: ''
        },
        order_items:[{
            quantity: 0,
            product_variant:{
                id:0,
                name: '',
                price: 0.00,
                stock:0
            }
        }]  
    },
    status: 'idle',
    error: null
}

export const createOrder = createAsyncThunk(
    'action/create_order',
    async( data:any, {rejectWithValue})=> {
        try{
            const response = await create_order(data)
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        shippingdetails: (state, action) =>{
            state.data.shipping_address = action.payload;
            setStorageLocal('shipping_address', action.payload)
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(createOrder.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.data = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const { shippingdetails } = orderSlice.actions

export const error = (state: AppState) => state.order.error
export const orderValue = (state: AppState) => state.order.data
export const shippingValue = (state: AppState) => state.order.data.shipping_address
export default orderSlice.reducer