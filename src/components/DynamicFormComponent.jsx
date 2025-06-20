import {useEffect, useState} from "react";
import {isInteger, maxLength, minLength, validateEmail, validateMatch} from "../helpers/common.js";
import {resetTransactionForm} from "../modules/transactionSlice.js";
import {useDispatch} from "react-redux";

const DynamicFormComponent = ({ formFields, onSubmit, onCancel, serverError, isFormSubmitted, setting, resetForm = false, updateData=false }) => {

    const dispatch = useDispatch();

    const defaultSetting = {
        submitButton: {
            text: 'Submit',
            textLoading: "Submitting...",
        },
        cancelButton: {
            text: 'Cancel',
        }
    }

    const finalSetting = {...defaultSetting, ... setting};

    useEffect(() => {
        if((!isFormSubmitted && serverError === false) || updateData) {
            setFormData(prev =>
                Object.fromEntries(
                    Object.entries(prev).map(([key]) => [
                        key,
                        {
                            //value: (prev[key].value && !isFormUpdated) ? prev[key].value : updateData[key] ?? '',
                            //value: isFormUpdated ? '' : prev[key].value ?? updateData[key] ?? '',
                            value: resetForm ? '' : prev[key].value !== '' ? prev[key].value : updateData[key] ?? '',
                            //value: updateData[key] ?? '',
                            errorMsg: ''
                        }
                    ])
                )
            );
        }
    }, [updateData, isFormSubmitted, serverError, resetForm]);

    const [formData, setFormData] = useState(() =>
        Object.fromEntries(formFields.map((field) => [field.name, {
            errorMsg: '',
            value:  ''
        }]))
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        const errMsg = getValidationMessage(name, value);
        setFormData((prev) => ({ ...prev, [name]: {
                value: value,
                errorMsg: errMsg
        }}));
    };

    const getValidationMessage = (name, value) => {
        let finalMessage = '';
        if(name) {

            let formFieldsTemp = [...formFields];
            formFieldsTemp = formFieldsTemp.filter((field) => {
                return field.name === name
            });

            if(!formFieldsTemp[0]){
                return finalMessage;
            }
            let formFieldsTmp = formFieldsTemp[0];

            const {
                required: isRequired = null,
                numeric: isNumeric = null,
                max = null,
                min = null,
                email = null,
                matchField = null
            } = formFieldsTmp.validation ? formFieldsTmp.validation : {};

            if(!value && isRequired) {
                finalMessage = formFieldsTmp.label + ' is required';
            }
            if(isNumeric && value && isInteger(value)) {
                finalMessage = formFieldsTmp.label + ' must be number';
            }
            if(max && value && maxLength(value,max)) {
                finalMessage = formFieldsTmp.label + ' max length must be less than ' + max;
            }
            if(min && value && minLength(value,min)) {
                finalMessage = formFieldsTmp.label + ' min length must be greater than ' + min;
            }
            if(value && email && validateEmail(value,min)) {
                finalMessage = formFieldsTmp.label + ' must be proper email address';
            }
            if(value && matchField && validateMatch(value,formData[matchField].value)) {
                let formFieldsTemp = [...formFields];
                formFieldsTemp = formFieldsTemp.filter((field) => {
                    return field.name === matchField
                });
                finalMessage = formFieldsTmp.label + ' must be matched with ' + formFieldsTemp[0].label;
            }
        }
        return finalMessage;
    }

    const applyValidation = () => {

        return new Promise((resolve) => {
            resolve(
                Object.fromEntries(
                    Object.entries(formData).map(([key, fieldData]) => [
                        key,
                        {
                            ...fieldData,
                            errorMsg: getValidationMessage(key, fieldData.value),
                        }
                    ])
                )
            );
        });
    }

    const makeFinalData = (newFormData) => {
        return new Promise((resolve) => {
            resolve(
                Object.fromEntries(
                    Object.entries(newFormData).map(([key, fieldData]) => [
                        key,
                        fieldData.value
                    ])
                )
            );
        })
    }

    const formCanSubmit = (newFormData) => {
        return new Promise((resolve) => {
            resolve(
                !(Object.values(newFormData).filter(field => field.errorMsg !== '').length > 0)
            );
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newFormData = await applyValidation();
        let isFormCanSubmit = await formCanSubmit(newFormData);
        console.log(updateData,isFormCanSubmit);
        if(isFormCanSubmit) {
            const finalDataToSubmit = await makeFinalData(newFormData);
            if(updateData['id']) {
                finalDataToSubmit['id'] = updateData['id'];
            }
            onSubmit(finalDataToSubmit);
        }else {
            setFormData(newFormData)
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        dispatch(resetTransactionForm());
        onCancel();
    };

    return (
        <>
            {
                serverError && serverError.message && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                        <p className="font-semibold">Error</p>
                        <p>{serverError.message}</p>
                    </div>
                )
            }

            <form onSubmit={handleSubmit} className="space-y-4 mb-2">
                {formFields.map((field) => (
                    <div key={field.id} className="flex flex-col">
                        <label htmlFor={field.id} className="mb-1 font-medium text-sm text-gray-700">
                            {field.label}
                        </label>

                        {field.type === "select" ? (
                            <select
                                id={field.id}
                                name={field.name}
                                value={formData[field.name].value}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Select {field.label}</option>
                                {field.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id={field.id}
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name].value}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2"
                            />
                        )}


                        {
                            formData && formData[field.name].errorMsg ?
                                <label
                                    className="mb-1 font-medium text-sm text-red-700">{formData[field.name].errorMsg}</label> : ''
                        }
                    </div>
                ))}

                <div className="flex flex-row gap-2">

                    <button
                        type="submit"
                        className="flex-1 max-w-[150px] bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        { !isFormSubmitted ? finalSetting.submitButton.text  : finalSetting.submitButton.textLoading }
                    </button>

                    {
                        onCancel && (<button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 max-w-[150px] bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Cancel
                        </button>)
                    }

                </div>
            </form>
        </>
    );
}
export default DynamicFormComponent;