import {render,screen} from "@testing-library/react";
import LoginPage from "../pages/LoginPage.jsx";
import {Provider} from "react-redux";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import { vi } from "vitest";
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../stores/authSlice.js";
import {ROUTES} from "../router.jsx";


vi.mock('../stores/authSlice', async () => {
    const actual = await vi.importActual('../stores/authSlice');
    return {
        ...actual,
        getAuth: () => () => ({ type: 'auth/getAuth/fulfilled', payload: true })
    };
});


function createTestStore(slice,preLoadState) {
    return configureStore({
        reducer: slice,
        preloadedState: preLoadState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: true, serializableCheck: false }),
    });
}

describe('Login Page', () => {
    it('renders when user is not authenticated', () => {

        const store = createTestStore({ auth: authSlice }, { auth: { isAuthenticated : false } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(
            screen.getByText(/Email/i) &&
            screen.getByText(/Password/i)
        ).toBeInTheDocument();
    })

    it('Render to dashboard if authenticated', () => {

        const store = createTestStore({ auth: authSlice }, { auth: { isAuthenticated : true } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path={ROUTES.DASHBOARD} element={<div>Dashboard Page</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
    })
})