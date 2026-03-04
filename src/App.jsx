import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DashboardLayout from "./dashboard/DashboadLayout.jsx";
import LoginPage from "./dashboard/LoginPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
import NavBar from "./components/NavBar.jsx";
import Event from "./pages/Event.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Project from "./pages/Project.jsx";
import Cta from "./pages/Cta.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import DashboardEvent from "./dashboard/DashboardEvent.jsx";
import DashboardProject from "./dashboard/DashboardProject.jsx";

function App() {
  const SESSION_TIMEOUT_MINUTES = 30;

  const checkAuth = () => {
    const isAuthFlag = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthFlag) return false;

    const loginAt = Number(localStorage.getItem("loginAt"));
    if (!loginAt) return false;

    const now = Date.now();
    const maxAgeMs = SESSION_TIMEOUT_MINUTES * 60 * 1000;

    if (now - loginAt > maxAgeMs) {
      localStorage.clear();
      return false;
    }

    return true;
  };

  const isAuthenticated = checkAuth();

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <Routes>

        {/* Public Pages */}
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <HomePage />
              <Event />
              <About />
              <Project />
              <Cta />
              <Footer />
            </>
          }
        />

        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        {/* Login */}
        <Route
          path="/admin/login"
          element={
            isAuthenticated ? (
              <Navigate to="/admin" />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="event" element={<DashboardEvent />} />
          <Route path="project" element={<DashboardProject />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;