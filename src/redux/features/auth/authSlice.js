import { auth } from '../../../firebase';
import { createSlice } from '@reduxjs/toolkit';

const user = async () => await auth.currentUser;

const initialState = {
    user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

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
    }
});

export const { reset, setUser } = authSlice.actions;

export default authSlice.reducer;