import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const HeaderComponent = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        return (
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-screen-lg mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-blue-700">FinanceApp</h1>
                    <nav className="space-x-6">
                        <NavLink
                            to="/"
                            className= {({ isActive }) =>
                                `transition-colors duration-200 hover:text-blue-600 ${
                                    isActive ? "text-blue-700" : "text-gray-700"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/transactions"
                            className= {({ isActive }) =>
                                `transition-colors duration-200 hover:text-blue-600 ${
                                    isActive ? "text-blue-700" : "text-gray-700"
                                }`
                            }
                        >
                            Transaction
                        </NavLink>
                        <NavLink
                            to="/budgets"
                            className= {({ isActive }) =>
                                `transition-colors duration-200 hover:text-blue-600 ${
                                    isActive ? "text-blue-700" : "text-gray-700"
                                }`
                            }
                        >
                            Budgets
                        </NavLink>
                        <NavLink
                            to="/logout"
                            className= {({ isActive }) =>
                                `transition-colors duration-200 hover:text-blue-600 ${
                                    isActive ? "text-blue-700" : "text-gray-700"
                                }`
                            }
                        >
                            Logout
                        </NavLink>
                    </nav>
                </div>
            </header>
        );
    } else {
        return (
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-screen-lg mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-blue-700">FinanceApp</h1>
                    <nav className="space-x-6"></nav>
                </div>
            </header>
        );
    }


}
export default HeaderComponent;