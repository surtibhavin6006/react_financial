import { useEffect } from "react";
import {useDispatch} from "react-redux";
import {logout} from "../stores/authSlice.js";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    return <p>Logging you out...</p>;
};

export default Logout;