import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";

function App() {
  const [page, setPage] = useState("Home");

  const renderPage = () => {
    switch (page) {
      case "Home":     return <Home setPage={setPage} />;
      case "About":    return <About />;
      case "Services": return <Services />;
      case "Contact":  return <Contact />;
      case "Donate":   return <Donate />;
      default:         return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      <Header />
      <Navbar page={page} setPage={setPage} />
      <div className="container">
        {renderPage()}
        <Footer />
      </div>
    </>
  );
}

export default App;