import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./dashboard/AdminPage.jsx";
import LoginPage from "./dashboard/LoginPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
import NavBar from "./components/NavBar.jsx";
import Event from "./pages/Event.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Project from "./pages/Project.jsx";
import Cta from "./pages/Cta.jsx";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for path changes
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const SESSION_TIMEOUT_MINUTES = 30;

  const checkAuth = () => {
    const isAuthFlag = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthFlag) return false;
    const loginAtRaw = localStorage.getItem("loginAt");
    const loginAt = loginAtRaw ? Number(loginAtRaw) : 0;
    if (!loginAt) return isAuthFlag;
    const now = Date.now();
    const maxAgeMs = SESSION_TIMEOUT_MINUTES * 60 * 1000;
    if (now - loginAt > maxAgeMs) {
      // Session expired
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      localStorage.removeItem("loginAt");
      // Force redirect to login
      window.location.href = "/admin/login";
      return false;
    }
    return true;
  };

  // Check authentication status directly from localStorage with timeout
  const isAuthenticated = checkAuth();

  const handleLogin = () => {
    // Authentication is already stored in localStorage by LoginPage
    // Just redirect
    window.location.href = "/admin";
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("loginAt");
    window.location.href = "/admin/login";
  };

  // Handle routing
  if (path === "/admin/login" || path === "/admin/login/") {
    // If already authenticated, redirect to admin
    if (isAuthenticated) {
      window.location.href = "/admin";
      return null;
    }
    return <LoginPage onLogin={handleLogin} />;
  }

  if (path === "/admin" || path === "/admin/") {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = "/admin/login";
      return null;
    }
    return <AdminPage onLogout={handleLogout} />;
  }

  if (path.startsWith("/events/") && path !== "/events/") {
    return <EventDetailPage />;
  }

  if (path === "/events" || path === "/events/") {
    return <EventsPage />;
  }

  return (
    <>
      <NavBar />
      <HomePage />
      <Event />
      <About />
      <Project />
      <Cta />
      <Footer />
    </>
  );
}

export default App;
