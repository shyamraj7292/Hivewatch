import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./modules/layout/DashboardLayout";
import { LoginPage } from "./modules/auth/LoginPage";
import { AttackMapPage } from "./modules/map/AttackMapPage";
import { PlaybooksPage } from "./modules/playbooks/PlaybooksPage";
import { RequireRole } from "./modules/auth/RequireRole";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Navigate to="/dashboard/map" replace />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/map"
        element={
          <DashboardLayout>
            <RequireRole role="admin">
              <AttackMapPage />
            </RequireRole>
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/playbooks"
        element=
        {
          <DashboardLayout>
            <RequireRole role="admin">
              <PlaybooksPage />
            </RequireRole>
          </DashboardLayout>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}


