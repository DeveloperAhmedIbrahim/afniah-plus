// App.js
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/users/Home";
import About from "./pages/users/About";
import Destination from "./pages/users/Destination";
import Contact from "./pages/users/Contact";
import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { LocalizationProvider } from "./contexts/LocalizationContext";
import { Toaster, toast } from "sonner";
import { CheckCircle2, Info, Sparkles, Sun, XCircle } from "lucide-react";
import Services from "./pages/users/Services";

function Layout() {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (ref.current) {
      ref.current.continuousStart();
      setTimeout(() => {
        ref.current.complete();
      }, 600);
    }
  }, [location]);

  return (
    <>
      <LoadingBar color="#A95E30" ref={ref} height={3} />
      <Toaster
        richColors
        visibleToasts={1}
        closeButton
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: '"Changa", sans-serif',
          },
        }}
        icons={{
          success: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
          warning: <Sparkles className="w-6 h-6 text-amber-500" />,
          error: <XCircle className="w-6 h-6 text-rose-500" />,
          info: <Info className="w-6 h-6 text-sky-500" />,
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <LocalizationProvider>
      <Router>
        <Layout />
      </Router>
    </LocalizationProvider>
  );
}

export default App;
