
import { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer } from 'recharts';
import { fetchData } from './AdminDashboard';
import { Link } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AddProjectForm } from '@/components/adminComponent/AddNewProject';

const AdminProjects = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('week');
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false);

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
    <>
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button onClick={()=>setIsOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Project
        </button>
      </div>

      <div className="w-full">

        {/* Porject Content */}
        <main >
          <div className="bg-white rounded-lg shadow p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-400">Loading project data...</div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(6)].map((_, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">Project {i + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{['Web Dev', 'Mobile App', 'UI/UX', 'Data Analysis'][i % 4]}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Client {i + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${i % 3 === 0 ? 'bg-green-100 text-green-800' :
                                i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'}`}>
                              {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Planning'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">${(Math.floor(Math.random() * 10000) + 1000).toLocaleString()}</td>
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
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="projects" fill="#82ca9d" name="Projects" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
















    </div>
    {isOpen &&<AddProjectForm setIsOpen={setIsOpen}/>}
    </>
  );
};

export default AdminProjects;
