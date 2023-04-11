import { AppState } from "../store";
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import { create_order } from "../action/create_order";
import { getStorageLocal, setStorageLocal } from "../../../utils/storage";


export interface Order{
    data: {
        payment_method: string;
        tax_price: any;
        shipping_price: any;
        total_price: any;
        shipping_address:{
            street_address: string;
            city: string;
            state: string;
            zip_code: string;
        }
        order_items:any
    },
    status: 'idle' | 'loading' | 'failed';
    error?: {} | any;
}

const initialState: Order = {
    data: {
        payment_method: '',
        tax_price: 0.00,
        shipping_price: 0.00,
        total_price: 0.00,
        shipping_address: getStorageLocal('shipping_address') ||{
            street_address: '',
            city: '',
            state: '',
            zip_code: ''
        },
        order_items:[]
    },
    status: 'idle',
    error: null
}

export const createOrder = createAsyncThunk(
    'action/create_order',
    async( { data }:{ 
        data: 
        { payment_method: string, tax_price: any, shipping_price: any, total_price: any,
        shipping_address:{street_address: string, city: string, state: string, zip_code: string},
        order_items:any
    } 
    }, {rejectWithValue})=> {
        console.log(data)
        try{
            const response = await create_order({data})
            console.log(response);
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