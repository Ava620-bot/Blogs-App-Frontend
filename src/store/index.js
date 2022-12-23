import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false },
    reducers:{
        signup(state){
          state.isSignUp = true
        },
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            localStorage.removeItem('userId');
            state.isLoggedIn = false
        },
    },
});

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer
});