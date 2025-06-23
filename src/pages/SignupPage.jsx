import LoginFormComponent from "../components/LoginFormComponent.jsx";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../router.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "../stores/authSlice.js";
import SignUpFormComponent from "../components/SignUpFormComponent.jsx";

const LoginPage = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAuth())
    }, [dispatch]);

    //return !isAuthenticated ? <div className="m-auto max-w-md"><SignUpFormComponent/></div> : <Navigate to={ROUTES.DASHBOARD} replace={true} />
    return !isAuthenticated ? <div className="m-auto max-w-md"><SignUpFormComponent/></div> : 'ss'
}

export default LoginPage;