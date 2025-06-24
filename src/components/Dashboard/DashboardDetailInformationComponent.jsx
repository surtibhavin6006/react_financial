import {useEffect} from "react";
import PriceFormatComponent from "../PriceFormatComponent.jsx";

const DashboardDetailInformationComponent = ({ header,data }) => {

    return (
        <>
            <div className="overflow-x-auto" key={header}>
                <h2>{header}</h2>
                <table className="min-w-full divide-y divide-gray-200 border rounded-xl shadow">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
                        {
                            data.some(item => 'declaredAmt' in item) &&
                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Declared
                                Amount</th>
                        }
                        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Amount</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {
                        data && data.map((itm) => (
                            <tr className="hover:bg-gray-50" key={itm.id}>
                                <td className="px-4 py-2 text-sm text-gray-600">{itm.name}</td>
                                {
                                    itm.declaredAmt &&
                                    <td className="px-4 py-2 text-right text-sm font-semibold text-gray-700"><PriceFormatComponent amount={itm.declaredAmt} /></td>
                                }
                                <td className="px-4 py-2 text-sm text-right text-red-500 font-medium"><PriceFormatComponent amount={itm.amount} /></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboardDetailInformationComponent;