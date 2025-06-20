import {useDispatch} from "react-redux";
import {deleteTransaction} from "../../modules/transactionSlice.js";
import {NavLink} from "react-router-dom";
import NoRecordFoundInfoComponent from "../NoRecordFoundInfoComponent.jsx";
import PriceFormatComponent from "../PriceFormatComponent.jsx";

const TransactionListComponent = ({ transactions }) => {

    const dispatch = useDispatch();

    const handleDeleteTransaction = (id) => {
        dispatch(deleteTransaction({id}));
    }

    return (
        <>
            {
                transactions ?
                    Object.entries(transactions).map(([date, txns]) => (
                        <div key={date}>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">{date}</h3>

                            <div className="space-y-3">
                                {txns.map((txn) => (
                                    <div
                                        key={txn.id}
                                        className={`
                                    relative rounded-xl shadow-md
                                    ${
                                            txn.amount < 0
                                                ? 'bg-red-50 border-l-4 border-red-400'
                                                : 'bg-green-50 border-l-4 border-green-400'
                                        }
                                `}
                                    >
                                        <button
                                            className="absolute -top-3 -right-1 text-red-300 hover:text-red-600 font-bold text-lg"
                                            onClick={() => handleDeleteTransaction(txn.id)}
                                        >
                                            ×
                                        </button>

                                        <div className="p-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h4 className="text-md font-semibold text-gray-800">
                                                        {txn.income ? txn.income.name : txn.budget ? txn.budget.name : ''}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">{txn.description}</p>
                                                </div>
                                                <div
                                                    className={`text-lg font-bold ${txn.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                    <PriceFormatComponent amount={txn.amount} />
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">{txn.note}</p>
                                            <p className="text-xs text-gray-400">{txn.updated_at}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : (<NoRecordFoundInfoComponent/>)
            }
        </>
    )
}

export default TransactionListComponent;