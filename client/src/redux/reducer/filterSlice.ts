import { AppState } from '../store';
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';


import { filter } from '../action/filter';
import { getProduct } from '../action/getProduct';
import { playerquery } from '../action/playerquery';
import { create_review } from '../action/create_review';
import { get_avg_review } from '../action/get_avg_rating';
import { ProductSearch } from '../action/filter_search';

export interface FilterState{
    filter_type: string;
    team_type: string;
    player_first_name: string;
    player_last_name: string;
    club: string;
    error?: {} | any;
    status: 'idle' | 'loading' | 'failed'
    filter_data_general: [] | any
    filter_data_player: [] | any
    filter_product:  any
    avg_review_rating: any
    search: any
    
}

const initialState: FilterState = {
    filter_type: '',
    team_type: '',
    club: '',
    status: 'idle',
    player_first_name: '',
    player_last_name:  '',
    error: null,
    filter_data_general: null,
    filter_data_player: null,
    filter_product: null,
    avg_review_rating: null,
    search: ''
   
    
}

export const Search = createAsyncThunk(
    'action/filter_search',
    async({searchterm}:{searchterm: string }, {rejectWithValue})=> {
        try{
            const response = await ProductSearch({searchterm})
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    }
)

export const filterMethod = createAsyncThunk(
    'action/filter',
    async({filter_type, team_type, club}:{filter_type: string, team_type: string, club: string}, {rejectWithValue})=> {
        try{
            const response = await filter({filter_type,team_type,club})
            console.log(response);
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

export const filterPlayerQuery = createAsyncThunk(
    'action/playerquery',
    async({filter_type, player_first_name, player_last_name }:{filter_type: string, player_first_name: string, player_last_name: string }, {rejectWithValue})=> {
        try{
            const response = await playerquery({filter_type, player_first_name, player_last_name})
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    }
)

export const createReview = createAsyncThunk(
    'action/create_review',
    async({filter_type, product_id, data }:{filter_type: string, product_id: any, data: { rating: any, comment: any, name: any} }, {rejectWithValue})=> {
        try{
            const response = await create_review({filter_type, product_id, data})
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    }
)

export const getAvgReview = createAsyncThunk(
    'action/get_avg_rating',
    async({filter_type, product_id }:{filter_type: string, product_id: any}, {rejectWithValue})=> {
        try{
            const response = await get_avg_review({filter_type, product_id })
            console.log(response);
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
            .addCase(filterMethod.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(filterMethodPlayer.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(filterMethodPlayer.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.filter_data_player = action.payload
            })
            .addCase(filterMethodPlayer.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(filterProductMethod.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(filterProductMethod.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.filter_product = action.payload
            })
            .addCase(filterProductMethod.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(filterPlayerQuery.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(filterPlayerQuery.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.filter_data_player = action.payload
            })
            .addCase(filterPlayerQuery.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getAvgReview.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(getAvgReview.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.avg_review_rating = action.payload
            })
            .addCase(getAvgReview.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(Search.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(Search.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.search = action.payload
            })
            .addCase(Search.rejected, (state, action) => {
                state.error = action.payload
            })
   
    }
})

export const filterValue = (state: AppState) => state.filter.filter_data_general
export const filterPlayer =(state: AppState) => state.filter.filter_data_player
export const filterSearch =(state: AppState) => state.filter.search
export const filterProduct = (state: AppState) => state.filter.filter_product
export const avgReview = (state: AppState) => state.filter.avg_review_rating
export const error = (state: AppState) => state.filter.error
export default filterSlice.reducer