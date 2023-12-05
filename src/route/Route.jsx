import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Loader from "../components/Loader/Index";
import Layout from "../layout/Index";
import Login from "../pages/Login/Index";
import Dashboard from "../pages/Dashboard/Index";
import CreateService from "../pages/CreateService/Index";

const Register = lazy(() => import("../pages/Register/Index"));

export const RoutesConfiguration = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<div>404 not found</div>} />
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateService />} />
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
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <div></div>
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <div></div>
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <div></div>
            </Layout>
          }
        />
        <Route
          path="/services/:serviceID"
          element={
            <Suspense fallback={<Loader fullScreen />}>
              <Layout >
                <div>hola</div>
              </Layout>
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};
