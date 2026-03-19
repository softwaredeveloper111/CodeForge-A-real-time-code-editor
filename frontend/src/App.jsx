import React, { useEffect } from "react";
import AppRouter from "./AppRouter";
import useAuth from "./features/auth/hooks/useAuth";

const App = () => {
  const { handleGetme } = useAuth();

  useEffect(() => {
    handleGetme();
  }, []);

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
};

export default App;