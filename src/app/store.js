// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../stores/budgetSlice';
import authReducer from '../stores/authSlice.js';
import transactionReducer from '../stores/transactionSlice.js';
import incomeCategorySlice from "../stores/incomeCategorySlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        budget: budgetReducer,
        transactionsData: transactionReducer,
        incomeCategory: incomeCategorySlice
    },
});