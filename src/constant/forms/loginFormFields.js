import {randomTimestampPrefix} from "../../helpers/common.js";

export const loginFormFields = [
    {
        name: "login_name",
        id: randomTimestampPrefix("login_name"),
        label: "Email",
        type: "text",
        placeholder: "e.g. example@example.com",
        validation: {
            required: true,
            email: true,
        },
        validationMessage: {
            required: "Please enter email",
            email: "Please enter email in proper format",
        }
    },
    {
        name: "login_password",
        id: randomTimestampPrefix("login_password"),
        label: "Password",
        type: "password",
        placeholder: "******",
        validation: {
            required: true,
        },
        validationMessage: {
            required: "Please enter password",
        }
    }
];


