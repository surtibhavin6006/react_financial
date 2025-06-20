import {createBrowserRouter, Outlet} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import TransactionPage from "./pages/TransactionPage.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import NonAuthLayout from "./layouts/NonAuthLayout.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Logout from "./pages/Logout.jsx";

export const ROUTES = {
    LOGIN: "/login",
    SIGNUP: "/signup",
    LOGOUT: "/logout",
    DASHBOARD: "/",
    TRANSACTIONS: "/transactions",
    BUDGETS: "/budgets",
}

const router = createBrowserRouter([
    {
        path: ROUTES.DASHBOARD,
        element: <MainLayout />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: <NonAuthLayout ><LoginPage/></NonAuthLayout>,
            },
            {
                path: ROUTES.SIGNUP,
                element: <NonAuthLayout ><SignupPage/></NonAuthLayout>,
            },
            {
                element: <AuthLayout/>,
                children: [
                    {
                        path: ROUTES.DASHBOARD,
                        element: <DashboardPage/>
                    },
                    {
                        path: ROUTES.TRANSACTIONS,
                        element: <TransactionPage/>
                    },
                    {
                        path: ROUTES.BUDGETS,
                        element: <BudgetPage/>
                    },
                    {
                        path: ROUTES.LOGOUT,
                        element: <Logout/>
                    }
                ]
            },
        ]
    }
]);

export default router;

export const BACKEND_ROUTES = {
    auth: {
        login: "auth/login",
        profile: "auth/me",
        logout: "auth/logout",
        signup: "auth/signup",
    },
    budget: {
        get: "budgets",
        save: "budgets",
        update: "budgets/{:id}",
    },
    transactions: {
        create: {
            credit: "transactions/{:categoryId}/credit",
            debit: "transactions/{:categoryId}/debit"
        },
        get: "transactions",
        delete: "transactions/{:transactionId}"
    },
    dashboard: "transactions/dashboard",
    incomeCategory: {
        get: "income-categories"
    },
}