import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getDashboard} from "../stores/transactionSlice.js";
import DashboardCartListComponent from "../components/Dashboard/DashboardCartListComponent.jsx";
import DashboardLoaderComponent from "../components/Dashboard/DashboardLoaderComponent.jsx";
import DashboardDetailInformationComponent from "../components/Dashboard/DashboardDetailInformationComponent.jsx";

const DashboardPage = () => {

    const dispatch = useDispatch();

    const { loading,data } = useSelector((state) => state.transactionsData.dashboard);

    useEffect(() => {
        dispatch(getDashboard())
    }, [dispatch]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    data ?
                        <DashboardCartListComponent totalExpense={data.totalExpense ?? 0}
                                                    totalIncome={data.totalIncome ?? 0}/> :
                        <DashboardLoaderComponent showLoaderOrNot={loading}/>
                }
            </div>

            <div className="mt-15 grid grid-cols-1  gap-4">
                {
                    data && data.incomeDashboardOverview ?
                        <DashboardDetailInformationComponent header="Income Information" data={data.incomeDashboardOverview}/> :
                        <DashboardLoaderComponent showLoaderOrNot={loading}/>
                }
            </div>

            <div className="mt-15 grid grid-cols-1  gap-4">
                {
                    data && data.expenseDashboardOverview ?
                        <DashboardDetailInformationComponent header="Expense Information" data={data.expenseDashboardOverview}/> :
                        <DashboardLoaderComponent showLoaderOrNot={loading}/>
                }
            </div>
        </>
    )
}

export default DashboardPage