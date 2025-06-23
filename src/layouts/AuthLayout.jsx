import {Navigate, Outlet, useLocation} from "react-router-dom";
import {ROUTES} from "../router.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "../stores/authSlice.js";
import {getBudgets} from "../stores/budgetSlice.js";
import {getIncomeCategory} from "../stores/incomeCategorySlice.js";

const AuthLayout = () => {

    const dispatch = useDispatch();

    const [defaultPageLoading, setDefaultPageLoading] = useState(true);

    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
       dispatch(getAuth());
       if (loading){
           setDefaultPageLoading(false);
           dispatch(getBudgets());
           dispatch(getIncomeCategory());
       }
    }, [dispatch, defaultPageLoading, isAuthenticated, loading]);

    if(defaultPageLoading){
        return '<>Checking...<>';
    }

    if(!defaultPageLoading && isAuthenticated){
        return <Outlet />;
    }

    if(!defaultPageLoading && !isAuthenticated){
        return  <Navigate to={ROUTES.LOGIN} replace={true} />
    }

}
export default AuthLayout