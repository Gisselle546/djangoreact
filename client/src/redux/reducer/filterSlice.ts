import { AppState } from '../store';
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';


import { filter } from '../action/filter';
import { getProduct } from '../action/getProduct';

export interface FilterState{
    filter_type: string;
    team_type: string;
    club: string;
    error?: null | any;
    status: 'idle' | 'loading' | 'failed'
    filter_data_general: [] | any
    filter_data_player: [] | any
    filter_product:  any
}

const initialState: FilterState = {
    filter_type: '',
    team_type: '',
    club: '',
    status: 'idle',
    error: null,
    filter_data_general: null,
    filter_data_player: null,
    filter_product: null
    
}

export const filterMethod = createAsyncThunk(
    'action/filter',
    async({filter_type, team_type, club}:{filter_type: string, team_type: string, club: string}, {rejectWithValue})=> {
        try{
            const response = await filter({filter_type,team_type,club})
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    }
)

export const filterMethodPlayer = createAsyncThunk(
    'action/filterplayer',
    async({filter_type, team_type, club}:{filter_type: string, team_type: string, club: string}, {rejectWithValue})=> {
        try{
            const response = await filter({filter_type,team_type,club})
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    }
)

export const filterProductMethod = createAsyncThunk(
    'action/getProduct',
    async({filter_type, product_id }:{filter_type: string, product_id: any }, {rejectWithValue})=> {
        try{
            const response = await getProduct({filter_type, product_id})
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    }
)


export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(filterMethod.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(filterMethod.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.filter_data_general = action.payload
            })
        builder
            .addCase(filterMethodPlayer.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(filterMethodPlayer.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.filter_data_player = action.payload
            })
        builder
            .addCase(filterProductMethod.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(filterProductMethod.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.filter_product = action.payload
            })
    }
})

export const filterValue = (state: AppState) => state.filter.filter_data_general
export const filterPlayer =(state: AppState) => state.filter.filter_data_player
export const filterProduct = (state: AppState) => state.filter.filter_product
export default filterSlice.reducer