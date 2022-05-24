import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from './authAPI';

//  Get user data from localstorage
const user = JSON.parse(String(localStorage.getItem('user')));

const initialState = {
    user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const signOut = createAsyncThunk('auth/logout', async () => await logout());

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(signOut.fulfilled, (state) => {
            state.user = null;
        });
    }
});

export const { reset, setUser } = authSlice.actions;

export default authSlice.reducer;