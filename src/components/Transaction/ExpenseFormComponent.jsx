import DynamicFormComponent from "../DynamicFormComponent.jsx";
import {expenseFormFields} from "../../constant/forms/expenseFormFields.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createTransaction} from "../../stores/transactionSlice.js";

const ExpenseFormComponent = () => {

    const dispatch = useDispatch();

    const { items:budgetItems } = useSelector((state) => state.budget );
    const { isSubmitted, error, resetForm } = useSelector((state) => state.transactionsData.create);

    const [finalFormFields, setFinalFormFields] = useState([...expenseFormFields]);


    useEffect(() => {
        if(budgetItems && budgetItems.length > 0 ) {
            setFinalFormFields((prevState) => prevState.map((prv) => {
                if (prv.name === "category") {
                    return {
                        ...prv,
                        options: budgetItems.map((budgetItem) => ({
                            label: budgetItem.name,
                            value: budgetItem.id,
                        }))
                    }
                }
                return prv;
            }));
        }
    }, [budgetItems]);



    const handleSubmit = (data) => {
        data['transaction_type'] = 'debit';
        dispatch(createTransaction(data));
    }

    return (
        <>
            <DynamicFormComponent
                formFields={finalFormFields}
                onSubmit={handleSubmit}
                serverError={error}
                isFormSubmitted={isSubmitted}
                resetForm={resetForm}
            />
        </>
    )
}

export default ExpenseFormComponent;