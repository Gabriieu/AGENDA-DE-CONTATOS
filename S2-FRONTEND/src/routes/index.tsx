import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { Dashboard } from "../pages/dashboard";
import { RegisterPage } from "../pages/register";
import { ProtectedRoutes } from "./protected-routes";
import { Page404 } from "../pages/404";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
