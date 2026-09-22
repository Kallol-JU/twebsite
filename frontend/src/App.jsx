import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CataloguePage from "./pages/OffersPage.";
import KnowledgePage from "./pages/KnowledgePage";
import ProductsPage from "./pages/ProductsPage"; // Add this
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-900 font-mono selection:bg-gray-200">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/products" element={<ProductsPage />} />{" "}
            {/* Add this */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
