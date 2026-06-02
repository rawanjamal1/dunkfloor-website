import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";

// DOM Manipulation: changes document.title on every route change
function TitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const titles = {
      "/":        "DunkFloor — Home",
      "/about":   "DunkFloor — About",
      "/services":"DunkFloor — Services",
      "/contact": "DunkFloor — Contact",
      "/donate":  "DunkFloor — Donate",
    };
    // Direct DOM manipulation
    document.title = titles[location.pathname] || "DunkFloor";
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return null;
}

function AppLayout() {
  return (
    <>
      <TitleUpdater />
      <Header />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/donate"   element={<Donate />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;