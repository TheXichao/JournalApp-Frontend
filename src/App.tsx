import "./App.css";
import NavBar from "./components/layout/NavBar";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import EntryDetailPage from "./pages/EntryDetailPage";
import JournalEntriesPage from "./pages/JournalEntriesPage";

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<string | undefined>(undefined);

  // Check if the user is logged in
  const cookies = new Cookies();

  useEffect(() => {
    setToken(cookies.get("token"));
    setUserInfo(cookies.get("userInfo"));

    if (token && userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token, userInfo]);

  return (
    <div className="App">
      <div className="routes">
        <NavBar
          isAuthenticated={isLoggedIn}
          onLogout={() => {
            cookies.remove("token");
            cookies.remove("userInfo");
            console.log(token, userInfo);
            setIsLoggedIn(false);
            setToken(undefined);
            setUserInfo(undefined);
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/entries" element={<JournalEntriesPage />} />
          <Route path="/entries/:id" element={<EntryDetailPage />} />

          <Route
            path="/profile"
            element={isLoggedIn ? <ProfilePage /> : <RedirectToLogin />}
          />
        </Routes>
      </div>
    </div>
  );
}

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Redirect after 2 seconds
  }, [navigate]);

  return <div>You are not logged in. Redirecting to login page...</div>;
}

export default App;
