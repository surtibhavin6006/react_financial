import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import { vi } from "vitest";
import {configureStore} from "@reduxjs/toolkit";

import transactionSlice from "../stores/transactionSlice.js";
import DashboardPage from "../pages/DashboardPage.jsx";
import {formatCurrency} from "../helpers/common.js";


vi.mock('../stores/transactionSlice', async () => {
    const actual = await vi.importActual('../stores/transactionSlice');
    return {
        ...actual,
        getDashboard: () => () => ({ type: 'transaction/dashboard/fake'})
    };
});


/*function createTestStore(slice,preLoadState) {
    return configureStore({
        reducer: slice,
        preloadedState: preLoadState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: true, serializableCheck: false }),
    });
}*/


const renderWithStore = (state) => {
    const store = configureStore({
        reducer: {
            transactionsData: () => ({
                dashboard: state,
            }),
        },
    });

    return render(
        <Provider store={store}>
            <DashboardPage />
        </Provider>
    );
};

describe('Dashboard Page', () => {
    it('when there data is loading...', () => {

        renderWithStore({
            loading: null,
            data: false,
        });

        const loader = document.querySelector('.animate-pulse');
        expect(loader).toBeInTheDocument();
    })

    it('when there data is loaded but null', () => {

        renderWithStore({
            loading: false,
            data: false
        });

        const loader = document.querySelector('.no-data-found');
        expect(loader).toBeInTheDocument();
    })

    it('when there data is loaded', () => {

        renderWithStore({
            loading: false,
            data: {
                totalExpense: 300,
                totalIncome: 1200,
            }
        });

        const totalIncome = formatCurrency(1200);
        const totalExpense = formatCurrency(300);

        expect(screen.getByText(totalIncome)).toBeInTheDocument();
        expect(screen.getByText(totalExpense)).toBeInTheDocument();

    })



})