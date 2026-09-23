import { useState, useEffect } from "react";
import { Loader2, X, MessageCircle } from "lucide-react";

const categories = [
  "All",
  "Skincare",
  "Healthcare",
  "Haircare",
  "Oriflame Special Edition Accessories",
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // TODO: Replace with your Aunt's WhatsApp number (include country code, no + or spaces)
  const PHONE_NUMBER = "919876543210";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleEnquire = (product) => {
    const message = `Hi Tanusree! I'm interested in the Oriflame product: *${product.name}*. Is it available?`;
    const whatsappUrl = `https://wa.me/${919883683307}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Available Products
        </h1>
        <p className="text-sm text-gray-500 mt-2 font-mono">
          Current inventory in my personal collection.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-100">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
              selectedCategory === category
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500 font-mono">
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => setSelectedProduct(product)}
              className="border border-gray-200 bg-white group hover:border-gray-400 transition-colors flex flex-col pb-2 cursor-pointer"
            >
              <div className="relative w-full aspect-square bg-gray-50 border-b border-gray-100 p-6 flex justify-center items-center">
                {product.isOnSale && (
                  <div className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 shadow-sm">
                    SALE
                  </div>
                )}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 flex flex-col">
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {product.isOnSale ? (
                  <p className="text-xs font-mono text-gray-900 font-semibold mt-1">
                    {product.saleText}
                  </p>
                ) : (
                  <p className="text-xs font-mono text-emerald-600 mt-1">
                    Lower than the market
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal Overlay */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white border border-gray-200 shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">
                {selectedProduct.name}
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="relative w-full bg-gray-50 border border-gray-100 p-6 flex justify-center items-center mb-6">
                {selectedProduct.isOnSale && (
                  <div className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 shadow-sm">
                    SALE
                  </div>
                )}
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-48 h-48 object-contain mix-blend-multiply"
                />
              </div>

              <div className="mb-6">
                {selectedProduct.isOnSale ? (
                  <p className="text-sm font-mono text-gray-900 font-semibold mb-3">
                    Price: {selectedProduct.saleText}
                  </p>
                ) : (
                  <p className="text-sm font-mono text-emerald-600 mb-3">
                    Price: Lower than the market
                  </p>
                )}

                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                  Description
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleEnquire(selectedProduct)}
                className="w-full flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Enquire Now via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
