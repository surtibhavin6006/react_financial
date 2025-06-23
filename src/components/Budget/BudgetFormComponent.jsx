import {budgetFormFields} from "../../constant/forms/budgetFormFields.js";
import DynamicFormComponent from "../DynamicFormComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createBudget, updateBudget} from "../../stores/budgetSlice.js";

const BudgetFormComponent = () => {

    const commonSetting = {
        submitButton: {
            text: 'Save',
            textLoading: "Saving...",
        }
    }

    const dispatch = useDispatch();
    const { isSubmitted, error, resetForm  } = useSelector((state) => state.budget.create );
    const { item } = useSelector((state) => state.budget);
    const handleSubmit = (data) => {
        if(data['id']){
            dispatch(updateBudget(data));
        } else{
            dispatch(createBudget(data));
        }
    }

    return (
        <div className="m-auto max-w-md">
            <DynamicFormComponent
                formFields={budgetFormFields}
                onSubmit={handleSubmit}
                isFormSubmitted={isSubmitted}
                serverError={error}
                setting={commonSetting}
                updateData={item}
                resetForm={resetForm}
            />
        </div>
    )
}

export default BudgetFormComponent;