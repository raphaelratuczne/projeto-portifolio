import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Preloader from "./components/Pre";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { ExportsContexts } from "./contexts/exportsContext";
import "./style.css";
const About = lazy(() => import("./pages/About/About"));
const Home = lazy(() => import("./pages/Home/Home"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Resume = lazy(() => import("./pages/Resume/ResumeNew"));
const Login = lazy(() => import("./pages/Login/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard/Dashboard"));
const ProjectsAdmin = lazy(() => import("./pages/admin/Projects/Projects"));

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ExportsContexts>
      <Router>
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Preloader load={true} />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/project"
              element={
                <Suspense fallback={<Preloader load={true} />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<Preloader load={true} />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/resume"
              element={
                <Suspense fallback={<Preloader load={true} />}>
                  <Resume />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<Preloader load={true} />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Preloader load={true} />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects-adm"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Preloader load={true} />}>
                    <ProjectsAdmin />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ExportsContexts>
  );
}

export default App;
