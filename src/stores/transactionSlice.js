import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from "../app/axios.js";
import {BACKEND_ROUTES} from "../router.jsx";


export const createTransaction = createAsyncThunk(
    'transaction/create',
    async (bodyPayload,{ rejectWithValue }) => {
        try {
            let createTransactionURL;

            if(bodyPayload['transaction_type'] === 'debit') {
                bodyPayload['amount'] = bodyPayload['amount'] * -1;
                createTransactionURL = BACKEND_ROUTES.transactions.create.debit;
            } else {
                createTransactionURL = BACKEND_ROUTES.transactions.create.credit;
            }
            createTransactionURL = createTransactionURL.replace('{:categoryId}', bodyPayload['category']);

            const res = await axiosInstance.post(createTransactionURL, bodyPayload);
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const getTransaction = createAsyncThunk(
    'transaction/get',
    async (params,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(BACKEND_ROUTES.transactions.get, { params });
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transaction/delete',
    async (params,{ rejectWithValue }) => {
        try {
            let deleteTransactionURL = BACKEND_ROUTES.transactions.delete.replace('{:transactionId}', params['id']);
            const res = await axiosInstance.delete(deleteTransactionURL, {});
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const getDashboard = createAsyncThunk(
    'transaction/dashboard',
    async (params,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(BACKEND_ROUTES.dashboard, { params });
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);


const initialState = {
    items: null,
    create: {
        loading: false,
        isSubmitted: false,
        error: false,
        resetForm: false,
    },
    delete: {
        loading: false,
        isSubmitted: false,
        error: false,
    },
    get: {
        loading: false,
        error: false,
    },
    dashboard: {
        loading: false,
        data: false,
        error: false,
    }
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        resetTransactionForm(state) {
            state.create = {
                loading: false,
                isSubmitted: false,
                error: false,
                resetForm: true,
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransaction.pending, (state) => {
                state.get = {
                    loading: true,
                    error: false
                }
                state.items = null;
            })
            .addCase(getTransaction.fulfilled, (state, action) => {
                state.get = {
                    loading: false,
                    error: false
                }
                if(action.payload.data && Object.keys(action.payload.data).length > 0){
                    state.items = action.payload.data;
                } else {
                    state.items = false;
                }
            })
            .addCase(getTransaction.rejected, (state, action) => {
                state.items = null;
                state.get.loading = false;
                state.get = {
                    loading: false,
                    error: action.payload || action.error.message
                }

            })

            .addCase(createTransaction.pending, (state) => {
                state.create = {
                    loading: true,
                    isSubmitted: true,
                    error: false,
                    resetForm: false,
                }
            })
            .addCase(createTransaction.fulfilled, (state, action) => {

                const { transaction_date } = action.payload.data;
                if(!state.items){
                    state.items = {};
                }
                if(!state.items[transaction_date]){
                    state.items[transaction_date] = [];
                }
                state.items[transaction_date].push(action.payload.data);
                state.items = Object.fromEntries(
                    Object.entries(state.items).sort(([a], [b]) => new Date(b) - new Date(a))
                );

                state.create = {
                    loading: false,
                    isSubmitted: false,
                    error: false,
                    resetForm: true,
                }
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.create = {
                    loading: false,
                    isSubmitted: false,
                    error: action.payload || action.error.message,
                    resetForm: false,
                }
            })

            .addCase(getDashboard.pending, (state) => {
                state.dashboard = {
                    loading: null,
                    error: false,
                    data: false
                }
            })
            .addCase(getDashboard.fulfilled, (state, action) => {
                state.dashboard = {
                    loading: false,
                    error: false,
                    data: action.payload.data
                }
            })
            .addCase(getDashboard.rejected, (state, action) => {
                state.dashboard = {
                    loading: false,
                    error: action.payload || action.error.message
                }
            })


            .addCase(deleteTransaction.pending, (state) => {
                state.delete = {
                    loading: true,
                    error: false,
                    isSubmitted: true
                }
            })
            .addCase(deleteTransaction.fulfilled, (state,action) => {
                state.delete = {
                    loading: false,
                    error: false,
                    isSubmitted: false
                }

                const { id: deletedId } = action.payload.data;
                state.items = Object.entries(state.items).reduce((newItems,[date,txns]) => {
                    const filteredTxns = txns.filter(txn => txn.id !== deletedId);
                    if( filteredTxns.length > 0 ) {
                        newItems[date] = filteredTxns;
                    }
                    return newItems;
                }, {});

                state.items = Object.fromEntries(
                    Object.entries(state.items).sort(([a], [b]) => new Date(b) - new Date(a))
                );
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.delete = {
                    loading: false,
                    error: action.payload || action.error.message,
                    isSubmitted: false
                }
            })
    }
});

export const { resetTransactionForm } = transactionSlice.actions;

export default transactionSlice.reducer;