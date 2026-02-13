import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import LandingPage from "./pages/LandingPage";
import AppShell from "./components/layout/AppShell";
import ProtectedRoute from "./routing/ProtectedRoute";

import DashboardPage from "./pages/DashboardPage";
import ClubsPage from "./pages/ClubsPage";
import RoundsPage from "./pages/RoundsPage";
import CoursesPage from "./pages/CoursesPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import AccountPage from "./pages/AccountPage";

import "./App.css";

const App = ({}) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/app' element={<ProtectedRoute component={AppShell} />}>
          <Route index element={<Navigate to='dashboard' replace />} />
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='clubs' element={<ClubsPage />} />
          <Route path='rounds' element={<RoundsPage />} />
          <Route path='courses' element={<CoursesPage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='account' element={<AccountPage />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
