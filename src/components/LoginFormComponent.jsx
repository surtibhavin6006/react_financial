import DynamicFormComponent from "./DynamicFormComponent.jsx";
import {loginFormFields} from "../constant/forms/loginFormFields.js";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../stores/authSlice.js";
import {NavLink} from "react-router-dom";

const LoginFormComponent = () => {

    const dispatch = useDispatch();

    const commonSetting = {
        submitButton: {
            text: 'Login',
            textLoading: "Logging...",
        }
    }

    const { isSubmitted, error } = useSelector((state) => state.auth);

    const handSubmit = (loginData) => {
        dispatch(login(loginData));
    }

    return (
        <>
            <DynamicFormComponent
                formFields={loginFormFields}
                onSubmit={handSubmit}
                isFormSubmitted={isSubmitted}
                serverError={error}
                setting={commonSetting}
            />


            <div className="flex flex-row gap-2">
                <NavLink
                    to="/signup"
                    className="flex-1 max-w-[150px] bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
                >
                    Signup
                </NavLink>
            </div>
        </>
    )

}

export default LoginFormComponent;