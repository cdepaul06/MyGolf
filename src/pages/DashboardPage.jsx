import React from "react";
import { useMeQuery } from "../api/queries/users.queries.jsx";

const DashboardPage = ({}) => {
  const { data, error, isLoading } = useMeQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  const user = data;

  return <div>Welcome, {user?.firstName || user?.email}!</div>;
};

export default DashboardPage;
