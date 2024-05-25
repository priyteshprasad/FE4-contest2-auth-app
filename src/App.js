import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { NotFound } from "./components/NotFound";
import "./auth-app.scss";
const App = () => {
  const [theme, setTheme] = useState("light"); // "light" | "dark"
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const container = "container " + (theme === "dark" ? "dark-container" : "");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className={container}>
              <Login />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className={container}>
              <Profile />
            </div>
          }
        />
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
