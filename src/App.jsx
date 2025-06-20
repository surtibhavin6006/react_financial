import './App.css'
import MainLayout from "./layouts/MainLayout.jsx";

function App() {
    return (
        <MainLayout>
            <form
              className="bg-white shadow-md p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
                <h2 className="text-lg font-semibold mb-6 text-gray-700">
                  💰 Budget Entry Form
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                      Expense Name
                  </label>
                  <input
                      type="text"
                      placeholder="e.g. Rent, Groceries"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1 text-gray-600">
                      Amount (₹)
                  </label>
                  <input
                      type="number"
                      placeholder="e.g. 2500"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-200"
                >
                  Submit
                </button>
            </form>
        </MainLayout>
    )
}

export default App
