import NoRecordFoundInfoComponent from "../NoRecordFoundInfoComponent.jsx";

const BudgetBlockLoaderComponent = ({showLoaderOrNot}) => {

    if(showLoaderOrNot === null) {
        return (
            <div
                className="mx-auto w-full rounded-xl shadow-md border-l-4 bg-gray-50 border-gray-500 text-gray-50 p-4 animate-pulse">
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                        <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200"></div>
                    <div className="h-2 rounded bg-gray-200"></div>
                    <div className="h-2 rounded bg-gray-200"></div>
                </div>
            </div>
        )
    }

    if(showLoaderOrNot === false) {
        return (
            <NoRecordFoundInfoComponent/>
        )
    }
}

export default BudgetBlockLoaderComponent;