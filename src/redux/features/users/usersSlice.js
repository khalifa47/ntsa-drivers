import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userAPI } from './userAPI';

export const findUserById = createAsyncThunk('users/findById',
    async (uid, thunkAPI) => {
        try {
            return await userAPI.findById(uid);
        } catch (err) {
            const message = err.response?.data.errors[0].message ||
                (err.response && err.response.data && err.response.data.message) ||
                err.message || err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    users: [],
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(findUserById.pending, state => {
                state.isLoading = true;
            })
            .addCase(findUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(findUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
                state.user = null;
            });
    }
});

export default usersSlice.reducer;