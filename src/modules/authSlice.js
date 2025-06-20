import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from "../app/axios.js";
import {deleteCookie, getCookie, setCookie} from "../helpers/common.js";
import {BACKEND_ROUTES} from "../router.jsx";

export const login = createAsyncThunk(
    'login',
    async (params,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(BACKEND_ROUTES.auth.login, {
                email: params.login_name,
                password: params.login_password,
            });
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const signup = createAsyncThunk(
    'signup',
    async (params,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(BACKEND_ROUTES.auth.signup, params);
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const myself = createAsyncThunk(
    'me',
    async (params,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(BACKEND_ROUTES.auth.profile);
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const logout = createAsyncThunk(
    'logout',
    async (params,{ rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(BACKEND_ROUTES.auth.logout, { params });
            deleteCookie("isAuthenticated");
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
        }
    }
);

export const getAuth = createAsyncThunk('auth/getAuth', async () => {
    const isAuthenticated = getCookie('isAuthenticated');
    return isAuthenticated === 'true';
});

export const applyAuth = (state, isAuthenticated, ttlForAuth = 600) => {
    state.isAuthenticated = isAuthenticated;
    state.authenticatedTTL = ttlForAuth;
    setCookie('isAuthenticated', isAuthenticated, ttlForAuth);
};

const initialState = {
    isSubmitted: false,
    error: false,
    isAuthenticated: false,
    loading: false,
    signupData: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, isAuthenticated = false) => {
            applyAuth(state,isAuthenticated)
        },
        getAuth: (state) => {
            console.log(state);
            const isAuthenticated = getCookie('isAuthenticated');
            state.isAuthenticated = isAuthenticated === 'true';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isSubmitted = true;
                state.error = false;
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state) => {
                state.isSubmitted = false;
                state.error = false;
                applyAuth(state,true);
            })
            .addCase(login.rejected, (state, action) => {
                applyAuth(state,false)
                state.isSubmitted = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(myself.pending, (state) => {
                state.isSubmitted = true;
                state.error = false;
                state.isAuthenticated = false;
            })
            .addCase(myself.fulfilled, (state) => {
                state.isSubmitted = false;
                state.error = false;
                state.isAuthenticated = true;
            })
            .addCase(myself.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.isSubmitted = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(getAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAuth.fulfilled, (state,action) => {
                state.loading = true;
                state.isAuthenticated = action.payload;
            })
            .addCase(getAuth.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
            })

            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.isSubmitted = true;
                state.error = false;
            })
            .addCase(signup.fulfilled, (state,action) => {
                state.loading = true;
                state.isSubmitted = false;
                state.signupData = action.payload.success;
                state.error = false;
            })
            .addCase(signup.rejected, (state,action) => {
                state.loading = false;
                state.isSubmitted = false;
                state.error = action.payload || action.error.message;
            })
    }
});

export default authSlice.reducer;