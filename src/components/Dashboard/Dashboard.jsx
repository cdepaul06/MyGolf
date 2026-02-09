import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useApiCall } from "../../api/apiCall";

const Dashboard = ({ user, onLogout, ...props }) => {
  const displayName = user?.name || user?.nickname || user?.email || "User";
  const apiCall = useApiCall();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiCall("users/me", { method: "GET" });
        const data = await res.json();
        console.log("API response:", data);
      } catch (e) {
        console.error("API call failed:", e);
      }
    };

    fetchData();
  }, [apiCall]);

  return (
    <div className='bg-green-50 min-w-screen min-h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-green-600 font-bold text-4xl mb-4'>Dashboard</h1>
      <p className='text-lg mb-6'>Welcome, {displayName}!</p>
      <Button variant='contained' color='secondary' onClick={onLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Dashboard;
