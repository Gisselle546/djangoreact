import { AppState } from '../store';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { setStorageValue, getStorageValue, deleteStorageValue } from '../../../utils/storage'

import { register } from '../action/register';
import { login } from '../action/login';


export interface AuthState {
    token: string | {}
    status: 'idle' | 'loading' | 'failed'
    error?: null | any
}

const initialState: AuthState = {
    token: getStorageValue('token') || '',
    status: 'idle',
    error: null
  };

  export const registerUser = createAsyncThunk(
    'action/register',
    async (data:{email:string, password:string}, {rejectWithValue} ) => {
      try{  
        const response = await register(data);
        setStorageValue('token',response.data.token)
        return response.data
      }catch(error){
        return rejectWithValue(error)
      }
    }
  );

  export const loginUser = createAsyncThunk(
    'action/login',
    async (data:{email:string, password:string}, {rejectWithValue} ) => {
      try{  
        const response = await login(data);
        setStorageValue('token',response.data.token)
        return response.data
      }catch(error){
        return rejectWithValue(error)
      }
    }
  );


  export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
          .addCase(registerUser.pending, (state)=>{
            state.status = 'loading';
          })
          .addCase(registerUser.fulfilled, (state, action)=>{
            state.status = 'idle';
            state.token  = action.payload;
          })
          .addCase(loginUser.pending, (state)=>{
            state.status = 'loading';
          })
          .addCase(loginUser.fulfilled, (state, action)=>{
            state.status = 'idle';
            state.token  = action.payload;
          })
          
    }
  })

  export const tokenValue = (state: AppState) => state.auth.token
  export default userSlice.reducer