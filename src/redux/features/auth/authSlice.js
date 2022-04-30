import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authAPI';

//  Get user data from localstorage
const user = JSON.parse(String(localStorage.getItem('user')));

const initialState = {
    user: user || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const login = createAction('auth/login', async (user, thunkAPI) => {
    try {
        console.log('login');
        return authAPI.login(user);
    } catch (err) {
        console.log('err');
        const message = err.response?.data.errors[0].message ||
            (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authAPI.logout();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, payload) => {
            console.log(state, payload);
        },
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
});

export const { reset, register } = authSlice.actions;

export default authSlice.reducer;