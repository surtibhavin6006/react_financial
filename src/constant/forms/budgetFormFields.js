import {randomTimestampPrefix} from "../../helpers/common.js";

export const budgetFormFields = [
    {
        name: "budget_name",
        id: randomTimestampPrefix("budget_name"),
        label: "Name",
        type: "text",
        placeholder: "e.g. Bills",
        validation: {
            required: true,
            min: 3,
            max: 20
        }
    },
    {
        name: "budget_val",
        id: randomTimestampPrefix("budget_val"),
        label: "Amount",
        type: "text",
        placeholder: "e.g. 200",
        validation: {
            required: true,
            numeric: true,
        }
    }
];