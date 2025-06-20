// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../modules/budgetSlice';
import authReducer from '../modules/authSlice.js';
import transactionReducer from '../modules/transactionSlice.js';
import incomeCategorySlice from "../modules/incomeCategorySlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        budget: budgetReducer,
        transactionsData: transactionReducer,
        incomeCategory: incomeCategorySlice
    },
});