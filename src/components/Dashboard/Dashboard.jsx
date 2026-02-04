import React, { useState } from "react";

const Dashboard = ({ user, onLogout, ...props }) => {
  const displayName = user?.name || user?.nickname || user?.email || "User";

  console.log("Dashboard user:", user);

  return (
    <div className='bg-green-50 min-w-screen min-h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-green-600 font-bold text-4xl mb-4'>Dashboard</h1>
      <p className='text-lg mb-6'>Welcome, {displayName}!</p>
      <button
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        onClick={onLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
