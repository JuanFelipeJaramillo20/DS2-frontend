import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Loader from "../components/Loader/Index";
import Login from "../pages/Login/Index";

const Register = lazy(() => import("../pages/Register/Index"));
const Dashboard = lazy(() => import("../pages/Dashboard/Index"));

export const RoutesConfiguration = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<div>404 not found</div>} />
        <Route path="/" element={<Login />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader fullScreen />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loader fullScreen />}>
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};
