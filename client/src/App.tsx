import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import { Apps, NewApp } from "./components/apps";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute children={<Dashboard />} />}
      >
        <Route path="apps" element={<Apps />} />
        <Route path="apps/new" element={<NewApp />} />
      </Route>
    </Routes>
  );
};

export default App;
