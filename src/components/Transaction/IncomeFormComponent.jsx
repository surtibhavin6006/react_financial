import DynamicFormComponent from "../DynamicFormComponent.jsx";
import {incomeFormFields} from "../../constant/forms/incomeFormFields.js";
import {useDispatch, useSelector} from "react-redux";
import {createTransaction} from "../../stores/transactionSlice.js";
import {useEffect, useState} from "react";

const IncomeFormComponent = () => {

    const dispatch = useDispatch();
    const { items: incomeCategoriesList } = useSelector((state) => state.incomeCategory);
    const { isSubmitted, error, resetForm } = useSelector((state) => state.transactionsData.create);

    const [finalFormFields, setFinalFormFields] = useState([...incomeFormFields]);

    useEffect(() => {
        if(incomeCategoriesList && incomeCategoriesList.length > 0 ) {
            setFinalFormFields((prevState) => prevState.map((prv) => {
                if (prv.name === "category") {
                    return {
                        ...prv,
                        options: incomeCategoriesList.map((incomeCategoryList) => ({
                            label: incomeCategoryList.name,
                            value: incomeCategoryList.id,
                        }))
                    }
                }
                return prv;
            }));
        }
    }, [incomeCategoriesList]);

    const handleSubmit = (postData) => {
        postData.type = "debit";
        dispatch(createTransaction(postData));
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

export default IncomeFormComponent