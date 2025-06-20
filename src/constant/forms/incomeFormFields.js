import {randomTimestampPrefix} from "../../helpers/common.js";

export const incomeFormFields = [
    {
        name: "amount",
        id: randomTimestampPrefix("amount"),
        label: "Amount",
        type: "number",
        placeholder: "e.g. 1000",
        validation: {
            required: true,
            numeric: true,
        },
        validationMessage: {
            required: "Please enter Amount",
            numeric: "Please enter numeric value",
        }
    },
    {
        name: "description",
        id: randomTimestampPrefix("description"),
        label: "Description",
        type: "text",
        placeholder: "Enter Description",
        validation: {
            required: true,
            min: 3,
            max: 20
        }
    },
    {
        name: "category",
        id: randomTimestampPrefix("category"),
        label: "Category",
        type: "select",
        options: [
            { label: "Salary", value: "salary" },
            { label: "Bonus", value: "bonus" },
            { label: "Interest", value: "interest" },
        ],
        validation: {
            required: true,
        }
    },
    {
        name: "transaction_date",
        id: randomTimestampPrefix("transaction_date"),
        label: "Date",
        type: "date",
        validation: {
            required: true,
        }
    },
    {
        name: "note",
        id: randomTimestampPrefix("note"),
        label: "Note (Optional)",
        type: "text",
        placeholder: "Add a note",
        validation: {
            min: 3,
            max: 20
        }
    },
];