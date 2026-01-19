import React from "react";

function ShopDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Stats Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <span className="text-gray-500 text-sm">Total Sales</span>
            <span className="text-2xl font-bold text-gray-800">$12,345</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <span className="text-gray-500 text-sm">Orders</span>
            <span className="text-2xl font-bold text-gray-800">123</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <span className="text-gray-500 text-sm">Products</span>
            <span className="text-2xl font-bold text-gray-800">56</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <span className="text-gray-500 text-sm">Customers</span>
            <span className="text-2xl font-bold text-gray-800">78</span>
          </div>
        </div>

        {/* Products Table */}
        <div className="p-6">
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">T-Shirt</td>
                  <td className="px-6 py-4 whitespace-nowrap">Clothing</td>
                  <td className="px-6 py-4 whitespace-nowrap">$25</td>
                  <td className="px-6 py-4 whitespace-nowrap">100</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Sneakers</td>
                  <td className="px-6 py-4 whitespace-nowrap">Footwear</td>
                  <td className="px-6 py-4 whitespace-nowrap">$80</td>
                  <td className="px-6 py-4 whitespace-nowrap">50</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Jeans</td>
                  <td className="px-6 py-4 whitespace-nowrap">Clothing</td>
                  <td className="px-6 py-4 whitespace-nowrap">$45</td>
                  <td className="px-6 py-4 whitespace-nowrap">75</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDashboard;
