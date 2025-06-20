import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getDashboard} from "../modules/transactionSlice.js";
import DashboardCartListComponent from "../components/Dashboard/DashboardCartListComponent.jsx";
import DashboardLoaderComponent from "../components/Dashboard/DashboardLoaderComponent.jsx";

const DashboardPage = () => {

    const dispatch = useDispatch();

    const { loading,data } = useSelector((state) => state.transactionsData.dashboard);

    useEffect(() => {
        dispatch(getDashboard())
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    data  ?
                        <DashboardCartListComponent totalExpense={data.totalExpense ?? 0} totalIncome={data.totalIncome ?? 0}  /> :
                        <DashboardLoaderComponent showLoaderOrNot={loading} />
                }
            </div>
        </>
    )
}

export default DashboardPage