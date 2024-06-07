"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { userApi } from "./features/user/userApi";
import authSlice from "./auth/authSlice";

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
       auth: authSlice,
    }, 
    devTools:false,
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware)
});

const intializeApp = async ()=>{

    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch:true}));
    // await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch:true}));
   await store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}));

};

intializeApp();