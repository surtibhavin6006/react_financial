import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from "../app/axios.js";
import {BACKEND_ROUTES} from "../router.jsx";

export const getBudgets = createAsyncThunk(
    'budget/get',
    async (params,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(BACKEND_ROUTES.budget.get, { params });
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const createBudget = createAsyncThunk(
    'budget/create',
    async (params,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(BACKEND_ROUTES.budget.get, {
                name: params.budget_name,
                amount: params.budget_val
            });
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const updateBudget = createAsyncThunk(
    'budget/update',
    async (params,{ rejectWithValue }) => {
        try {
            let updateURL = BACKEND_ROUTES.budget.update.replace('{:id}', params['id']);
            const res = await axiosInstance.patch(updateURL, {
                name: params.budget_name,
                amount: params.budget_val,
            });
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

const initialState = {
    items: false,
    list: {
        loading: false,
        error: false,
    },
    create: {
        loading: false,
        isSubmitted: false,
        error: false,
        resetForm: false
    },
    item: false,
};

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        editItem(state, action) {
            const { name, amount="0", id } = action.payload;
            state.item = {
                budget_name: name,
                budget_val: parseInt(amount),
                id: id,
            }
        },
        resetForm(state) {
            state.create ={
                loading: false,
                isSubmitted: false,
                error: false,
                resetForm: false
            }

            state.item = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBudgets.pending, (state) => {
                state.list = {
                    loading: true,
                    error: false
                }
                state.items = null;
            })
            .addCase(getBudgets.fulfilled, (state, action) => {
                state.list = {
                    loading: true,
                    error: false
                }
                if (action.payload.data.length > 0) {
                    state.items = action.payload.data;
                } else {
                    state.items = false;
                }
            })
            .addCase(getBudgets.rejected, (state, action) => {
                state.items = null;
                state.list = {
                    loading: true,
                    error: action.payload || action.error.message
                }
            })

            .addCase(createBudget.pending, (state) => {
                state.create = {
                    loading: true,
                    error: false,
                    isSubmitted: true,
                    resetForm: false
                }
            })
            .addCase(createBudget.fulfilled, (state, action) => {
                state.items.push(action.payload.data);
                state.create = {
                    loading: false,
                    error: false,
                    isSubmitted: false,
                    resetForm: true
                }
            })
            .addCase(createBudget.rejected, (state, action) => {
                state.create = {
                    loading: false,
                    error: action.payload || action.error.message,
                    isSubmitted: false,
                    resetForm: false
                }
            })

            .addCase(updateBudget.pending, (state) => {
                state.create = {
                    loading: true,
                    error: false,
                    isSubmitted: true,
                    resetForm: false
                }
            })
            .addCase(updateBudget.fulfilled, (state, action) => {
                state.create = {
                    loading: false,
                    error: false,
                    isSubmitted: false,
                    resetForm: true
                }
                state.item = false;

                const { data } = action.payload;
                state.items = state.items.map(item  => {
                    return item.id === data.id ? { ...item, ...data } : item
                });

            })
            .addCase(updateBudget.rejected, (state, action) => {
                state.create = {
                    loading: false,
                    error: action.payload || action.error.message,
                    isSubmitted: false,
                    resetForm: false
                }
            })



    }
});

export const { editItem: editBudgetItem, resetForm: resetBudgetForm } = budgetSlice.actions;
export default budgetSlice.reducer;
