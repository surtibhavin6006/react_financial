import DynamicFormComponent from "./DynamicFormComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../stores/authSlice.js";
import {singUpFormFields} from "../constant/forms/signupFormFIelds.js";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const SignUpFormComponent = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const commonSetting = {
        submitButton: {
            text: 'Sign Up',
            textLoading: "Signing up...",
        }
    }

    const { isSubmitted, error, signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log(error,isSubmitted);
    }, [isSubmitted,error]);

    const handSubmit = (loginData) => {
        dispatch(signup(loginData));
    }

    const handCancel = () => {
        navigate('/login');
    }

    return (
        <>

            {
                signupData && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
                        <p className="font-semibold">Success</p>
                        <NavLink to='/login' className="font-semibold text-blue-700">Please click here to login</NavLink>
                    </div>
                )
            }

            <DynamicFormComponent
                formFields={singUpFormFields}
                onSubmit={handSubmit}
                isFormSubmitted={isSubmitted}
                serverError={error}
                setting={commonSetting}
                onCancel={handCancel}
            />
        </>
    )

}

export default SignUpFormComponent;