const DashboardDetailInformationComponent = ({ header,data }) => {
    return (
        <>
            {
                data && data.map((data,key) => (
                    <div className="overflow-x-auto" key={key}>
                        <h2>{header}</h2>
                        <table className="min-w-full divide-y divide-gray-200 border rounded-xl shadow">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
                                {data.declaredAmt ? (
                                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Declared
                                        Amount</th>) : ''}
                                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Amount</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-600">{data.name}</td>
                                {data.declaredAmt ? (
                                    <th className="px-4 py-2 text-sm text-right text-green-500 font-medium">{data.declaredAmt}</th>) : ''}
                                <td className="px-4 py-2 text-sm text-right text-red-500 font-medium">{data.amount}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            }

        </>
    )
}

export default DashboardDetailInformationComponent;