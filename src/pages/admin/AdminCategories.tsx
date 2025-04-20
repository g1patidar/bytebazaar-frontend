import { useState } from 'react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const categoryData = [
  { name: 'Web Development', value: 35 },
  { name: 'Mobile Apps', value: 25 },
  { name: 'UI/UX Design', value: 20 },
  { name: 'Data Analysis', value: 15 },
  { name: 'Other', value: 5 }
];
// COLORS for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminCategories = () => {

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Category
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Loading category data...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-md font-semibold mb-3">Category List</h3>
              <ul className="space-y-2">
                {categoryData.map((category, index) => (
                  <li key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-4 w-4 mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span>{category.name}</span>
                    </div>
                    <span className="font-medium">{category.value} projects</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
