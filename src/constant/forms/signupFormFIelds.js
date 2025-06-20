import {randomTimestampPrefix} from "../../helpers/common.js";

export const singUpFormFields = [
    {
        name: "name",
        id: randomTimestampPrefix("name"),
        label: "Name",
        type: "text",
        placeholder: "e.g. example@example.com",
        validation: {
            required: true,
            max:50,
            min:6,
        }
    },
    {
        name: "email",
        id: randomTimestampPrefix("email"),
        label: "Email",
        type: "text",
        placeholder: "email@example.com",
        validation: {
            required: true,
            email: true,
            max: 50
        }
    },
    {
        name: "password",
        id: randomTimestampPrefix("password"),
        label: "Password",
        type: "password",
        placeholder: "******",
        validation: {
            required: true,
            matchField: "password_confirmation",
            max: 50,
            min:6,
        }
    },
    {
        name: "password_confirmation",
        id: randomTimestampPrefix("password_confirmation"),
        label: "Password Confirmation",
        type: "password",
        placeholder: "******",
        validation: {
            required: true,
            matchField: "password",
        }
    }
];


