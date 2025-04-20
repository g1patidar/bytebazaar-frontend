import { useState, useEffect } from 'react';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, Legend, Line, Bar, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, Package, DollarSign, TrendingUp, BarChart2, Clock } from 'lucide-react';
// Fixed import - importing PieChart icon properly
import { PieChart as PieChartIcon } from 'lucide-react';

// Dummy data generator
export const generateDummyData = (timeframe) => {
  const periods = {
    day: 24,
    week: 7,
    month: 30,
    quarter: 3,
    halfyear: 6,
    year: 12,
    all: 24
  };
  
  const period = periods[timeframe];
  const data = [];
  
  for (let i = 0; i < period; i++) {
    const users = Math.floor(Math.random() * 50) + 10;
    const projects = Math.floor(Math.random() * 30) + 5;
    const orders = Math.floor(Math.random() * 40) + 15;
    const revenue = Math.floor(Math.random() * 5000) + 1000;
    
    // Label based on timeframe
    let label;
    switch(timeframe) {
      case 'day':
        label = `${i}:00`;
        break;
      case 'week':
        label = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
        break;
      case 'month':
        label = `Day ${i+1}`;
        break;
      case 'quarter':
        label = `Month ${i+1}`;
        break;
      case 'halfyear':
        label = `Month ${i+1}`;
        break;
      case 'year':
        label = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i];
        break;
      default:
        label = `Period ${i+1}`;
    }
    
    data.push({
      name: label,
      users,
      projects,
      orders,
      revenue
    });
  }
  
  return data;
};

// Simulate API call with delay
export const fetchData = async (timeframe) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateDummyData(timeframe));
    }, 500);
  });
};
export const timeframeOptions = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'halfyear', label: '6 Months' },
  { value: 'year', label: 'This Year' },
  { value: 'all', label: 'All Time' }
];
// Dashboard component
export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState('week');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
  const totalProjects = data.reduce((sum, item) => sum + item.projects, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result: any = await fetchData(timeframe);
      setData(result);
      setLoading(false);
    };
    
    getData();
  }, [timeframe]);


  // COLORS for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const categoryData = [
    { name: 'Web Development', value: 35 },
    { name: 'Mobile Apps', value: 25 },
    { name: 'UI/UX Design', value: 20 },
    { name: 'Data Analysis', value: 15 },
    { name: 'Other', value: 5 }
  ];

  return (
    <>

        {/* Main Content */}
        <div className="w-full">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="p-4 flex justify-between items-center">
              <h1 className="text-2xl font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-gray-600" />
                <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main >
            {activeTab === 'dashboard' && (
              <>
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

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Users size={24} className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-gray-500 text-sm">Total Users</h3>
                        <p className="text-2xl font-bold">{totalUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Package size={24} className="text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-gray-500 text-sm">Total Projects</h3>
                        <p className="text-2xl font-bold">{totalProjects}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Calendar size={24} className="text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-gray-500 text-sm">Total Orders</h3>
                        <p className="text-2xl font-bold">{totalOrders}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <DollarSign size={24} className="text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                        <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Line Chart */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Trend Overview</h3>
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="text-gray-400">Loading data...</div>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" />
                          <Line type="monotone" dataKey="projects" stroke="#82ca9d" name="Projects" />
                          <Line type="monotone" dataKey="orders" stroke="#ffc658" name="Orders" />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Bar Chart */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="text-gray-400">Loading data...</div>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                          <Legend />
                          <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
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
            )}
          </main>
        </div>
      
    </>
  );
}