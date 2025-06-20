import {useEffect, useState} from "react";
import TransactionListComponent from "../components/Transaction/TransactionListComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {FaPlus} from "react-icons/fa";
import TransactionModelPopup from "../components/Transaction/TransactionModelPopup.jsx";
import TransactionBlockLoaderComponent from "../components/Transaction/TransactionBlockLoaderComponent.jsx";
import {getTransaction, resetTransactionForm} from "../modules/transactionSlice.js";
import {resetBudgetForm} from "../modules/budgetSlice.js";

const TransactionPage = () => {

    const dispatch = useDispatch();
    const { items: transactionItems  } = useSelector( (state) => state.transactionsData );

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getTransaction());
        dispatch(resetTransactionForm());
    }, [dispatch]);

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Transactions</h2>
                <button
                    className="bg-blue-600 text-white text-lg w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-700 transition"
                    aria-label="Add Transaction"
                    onClick={() => setModalOpen(true)}
                >
                    <FaPlus/>
                </button>
            </div>

            <div className="w-full mx-auto bg-white shadow rounded-lg p-4 space-y-6 ">
                {
                    transactionItems ?
                        <TransactionListComponent transactions={transactionItems} /> :
                        <TransactionBlockLoaderComponent showLoaderOrNot={transactionItems} />
                }
            </div>

            <TransactionModelPopup isModalOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}

export default TransactionPage;