import BudgetFormComponent from "../components/Budget/BudgetFormComponent.jsx";
import {FaPlus} from "react-icons/fa";
import {useEffect, useState} from "react";
import BudgetListComponent from "../components/Budget/BudgetListComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import BudgetBlockLoaderComponent from "../components/Budget/BudgetBlockLoaderComponent.jsx";
import BudgetModelPopup from "../components/Budget/BudgetModelPopup.jsx";
import {resetBudgetForm} from "../modules/budgetSlice.js";
const BudgetPage = () => {

    const dispatch = useDispatch();
    const [budgetAction, setBudgetAction] = useState(false);

    const { items,item } = useSelector((state) => state.budget);

    /*useEffect(() => {
        console.log("budet page",item);
        if (item) {
            setBudgetAction(true);
        }
    }, [item]);*/

    useEffect(() => {
        setBudgetAction(false);
        dispatch(resetBudgetForm());
    }, [dispatch]);

    const handlePageChange = (open=false) => {
        setBudgetAction(open);
        dispatch(resetBudgetForm());
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Budget Management</h2>
                <button
                    className="bg-blue-600 text-white text-lg w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-700 transition"
                    aria-label="Add Budget"
                    onClick={() => { handlePageChange(true) }}
                >
                    <FaPlus/>
                </button>
            </div>



            {
                items  ?
                    <BudgetListComponent budgets={items} /> :
                    <BudgetBlockLoaderComponent showLoaderOrNot={items} />
            }

            <BudgetModelPopup isModalOpen={budgetAction} onClose={() => setBudgetAction(false)}  />
        </>
    )
}

export default BudgetPage;