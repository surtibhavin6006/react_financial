import NoRecordFoundInfoComponent from "../NoRecordFoundInfoComponent.jsx";

const TransactionBlockLoaderComponent = ( { showLoaderOrNot }) => {

    if(showLoaderOrNot === null) {
        return (
            <div
                className="grid grid-cols-1 animate-pulse">
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

    if (showLoaderOrNot === false) {
        return <NoRecordFoundInfoComponent/>
    }

}

export default TransactionBlockLoaderComponent;