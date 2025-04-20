import { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer} from 'recharts';
import { fetchData, timeframeOptions } from './AdminDashboard';

const AdminOrders = () => {

  const [data , setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result: any = await fetchData(timeframe);
      setData(result);
      setLoading(false);
    };
    
    getData();
  }, [timeframe]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
      </div>
      {/* Time Period Selector */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-gray-700">Time Period:</span>
                    {timeframeOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setTimeframe(option.value)}
                        className={`px-3 py-1 rounded ${timeframe === option.value ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
      <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Order Management</h2>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-gray-400">Loading order data...</div>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {[...Array(6)].map((_, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">#{Math.floor(Math.random() * 90000) + 10000}</td>
                              <td className="px-6 py-4 whitespace-nowrap">Customer {i + 1}</td>
                              <td className="px-6 py-4 whitespace-nowrap">Project {Math.floor(Math.random() * 10) + 1}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${i % 4 === 0 ? 'bg-green-100 text-green-800' : 
                                  i % 4 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                                  i % 4 === 2 ? 'bg-blue-100 text-blue-800' : 
                                  'bg-red-100 text-red-800'}`}>
                                  {['Completed', 'Pending', 'Processing', 'Cancelled'][i % 4]}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">${(Math.floor(Math.random() * 5000) + 500).toLocaleString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(2024, Math.floor(Math.random() * 4), Math.floor(Math.random() * 28) + 1).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                          <Legend />
                          <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                          <Bar dataKey="orders" fill="#ffc658" name="Orders" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              </div>
    </div>
  );
};

export default AdminOrders;
