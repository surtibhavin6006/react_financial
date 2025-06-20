import {Navigate, Outlet, useLocation} from "react-router-dom";
import {ROUTES} from "../router.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "../modules/authSlice.js";

const NonAuthLayout = ({ children }) => {

    const dispatch = useDispatch();
    const location = useLocation()

    const [defaultPageLoading, setDefaultPageLoading] = useState(true);

    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAuth());
        if (loading){
            setDefaultPageLoading(false);
        }
    }, [location, defaultPageLoading, isAuthenticated, loading]);

    if(defaultPageLoading){
        return '<>Checking...<>';
    }

    if(!defaultPageLoading && !isAuthenticated){
        return (<>{ children }</>);
    }

    if(!defaultPageLoading && isAuthenticated){
        return  <Navigate to={ROUTES.DASHBOARD} replace={true} />
    }
}
export default NonAuthLayout