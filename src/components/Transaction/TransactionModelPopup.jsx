import ModalPopup from "../ModalPopup.jsx";
import {useEffect} from "react";
import useToggleComponent from "../../hooks/toggleComponentHook.js";
import IncomeFormComponent from "./IncomeFormComponent.jsx";
import ExpenseFormComponent from "./ExpenseFormComponent.jsx";
import {useDispatch} from "react-redux";
import {resetTransactionForm} from "../../stores/transactionSlice.js";

const TransactionModelPopup = ({ isModalOpen, onClose }) => {

    const dispatch = useDispatch();

    const { toggle, isActive, activeKey } = useToggleComponent('expense', ['income', 'expense']);

    useEffect(() => {
        dispatch(resetTransactionForm());
    },[dispatch,isModalOpen,activeKey]);

    return (
        <>
            <ModalPopup
                isOpen={isModalOpen}
                onClose={onClose}
                title="Transaction"
                footer="Transaction"
            >
                <div className="flex gap-4">
                    <button
                        className={
                            `
                                flex-1 py-2 rounded-md text-sm font-medium transition text-white 
                                ${isActive('expense') ? 'bg-blue-600 cursor-not-allowed' : 'bg-gray-600 cursor-pointer'}
                            `
                        }
                        onClick={() => toggle('expense')}
                    >
                        Expense
                    </button>
                    <button
                        className={
                            `
                                flex-1 py-2 rounded-md text-sm font-medium transition text-white 
                                ${isActive('income') ? 'bg-blue-600 cursor-not-allowed' : 'bg-gray-600 cursor-pointer'}
                            `
                        }
                        onClick={() => toggle('income')}
                    >
                        Income
                    </button>
                </div>

                {isActive("income") && <IncomeFormComponent />}
                {isActive("expense") && <ExpenseFormComponent />}

            </ModalPopup>
        </>
    )
}

export default TransactionModelPopup;