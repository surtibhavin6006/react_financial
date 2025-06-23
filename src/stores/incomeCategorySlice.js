import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BACKEND_ROUTES} from "../router.jsx";
import axiosInstance from "../app/axios.js";

export const getIncomeCategory = createAsyncThunk(
    'incomeCategory/get',
    async (params,  { rejectWithValue } ) => {
        try{
            const res = await axiosInstance.get(BACKEND_ROUTES.incomeCategory.get);
            return res.data;
        }catch(err){
            if(err.response){
                return rejectWithValue(err.response.data);
            }
        }
    }
)

const initialState = {
    items: false,
    get: {
        error: false,
        loading: false,
    }
};

const incomeCategorySlice = createSlice({
    name: "incomeCategory",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getIncomeCategory.pending, (state) => {
                state.get.loading = true;
                state.get.error = false;
                state.items = null;
            })
            .addCase(getIncomeCategory.fulfilled, (state, action) => {
                state.get.error = false;
                state.get.loading = false;
                if(Object.keys(action.payload.data).length > 0){
                    state.items = action.payload.data;
                } else {
                    state.items = null;
                }
            })
            .addCase(getIncomeCategory.rejected, (state, action) => {
                state.items = null;
                state.get.loading = false;
                state.get.error = action.payload || action.error.message;
            })
    }
})

export default incomeCategorySlice.reducer;