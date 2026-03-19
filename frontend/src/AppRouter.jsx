import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import GuestRoute from "./features/auth/components/GuestRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Auth pages — logged-in users get redirected to home */}
      <Route
        path="/auth/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/auth/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* Protected pages — unauthenticated users get redirected to login */}
      <Route
        path="/"
        element={
          <Protected>
            <h1>Home</h1>
          </Protected>
        }
      />

      {/* Catch-all → redirect to home (Protected will handle from there) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;