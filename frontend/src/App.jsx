import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CataloguePage from "./pages/OffersPage.";
import KnowledgePage from "./pages/KnowledgePage";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-900 font-mono selection:bg-gray-200 flex flex-col justify-between">
        <div>
          <Navbar />
          {/* Changed padding here to be smaller on mobile (px-4 py-8) and normal on desktop (md:px-6 md:py-12) */}
          <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogue" element={<CataloguePage />} />
              <Route path="/knowledge" element={<KnowledgePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
