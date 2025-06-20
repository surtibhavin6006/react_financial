import {FaPen} from "react-icons/fa";
import PriceFormatComponent from "../PriceFormatComponent.jsx";
import {useEffect, useState} from "react";

const DashboardCartListComponent = ({ totalExpense, totalIncome }) => {

    const [currentBalance, setCurrentBalance] = useState(0);
    useEffect(() => {
        setCurrentBalance(totalIncome + totalExpense);
    }, [totalExpense, totalIncome]);

    return (
        <>
            <div
                className="bg-green-100 border-l-4 border-green-500 rounded-xl p-4 flex justify-between">
                <div>
                    <h3 className="text-green-700 font-bold text-lg">Total Income</h3>
                    <p className="text-gray-700"><PriceFormatComponent amount={totalIncome} /></p>
                </div>
            </div>
            <div
                className="bg-red-100 border-l-4 border-red-500 rounded-xl p-4 flex justify-between">
                <div>
                    <h3 className="text-red-700 font-bold text-lg">Total Expense</h3>
                    <p className="text-red-700"><PriceFormatComponent amount={totalExpense} /></p>
                </div>
            </div>
            <div
                className="bg-blue-100 border-l-4 border-blue-500 rounded-xl p-4 flex justify-between">
                <div>
                    <h3 className="text-blue-700 font-bold text-lg">Current Balance</h3>
                    <p className="text-gray-700"><PriceFormatComponent amount={currentBalance} /></p>
                </div>
            </div>
        </>
    )
}

export default DashboardCartListComponent