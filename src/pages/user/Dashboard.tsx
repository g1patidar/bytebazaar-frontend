
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <p>This is a placeholder for the user's account information.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Purchases</h2>
          <p>This is a placeholder for the user's recent purchases.</p>
          <div className="mt-4">
            <Link to="/purchases" className="text-blue-500 hover:text-blue-700">
              View All Purchases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
