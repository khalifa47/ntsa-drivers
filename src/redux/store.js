import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/users/usersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
    },
});
