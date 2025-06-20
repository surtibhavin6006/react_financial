import {FaPen} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {editBudgetItem} from "../../modules/budgetSlice.js";

const BudgetListComponent = ({ budgets }) => {

    const dispatch = useDispatch();

    const bgColors = [
        'red',
        'green',
        'blue',
        'yellow',
        'purple',
        'pink',
        'indigo',
        'teal',
    ];

    const handleEditBudget = (budget) => {
        dispatch(editBudgetItem(budget));
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                budgets && budgets.map((budget, index) => (

                    <div key={budget.id}
                       className={
                            `
                                border-l-4 rounded-xl p-4 flex justify-between items-start
                                bg-${bgColors[index % bgColors.length]}-100 border-${bgColors[index % bgColors.length]}-500
                            `
                       }
                    >
                        <div>
                            <h3 className="text-blue-700 font-bold text-lg">{budget.name}</h3>
                            <p className="text-gray-700">Budget: ${budget.amount}</p>
                        </div>
                        <button className="text-gray-600 cursor-pointer" onClick={() => handleEditBudget(budget) }><FaPen/></button>
                    </div>
                ))
            }

        </div>
    )

}

export default BudgetListComponent