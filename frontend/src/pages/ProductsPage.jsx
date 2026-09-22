import { useState, useEffect } from "react";
import { Loader2, X, MessageCircle } from "lucide-react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const closeModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setSelectedProduct(null);
    }
  };

  // Replace this with your aunt's actual WhatsApp number (Country code + Number, no '+')
  const whatsappNumber = "919883683307";

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Available Products
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Current inventory in my personal collection.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 border border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500 font-mono">
            Inventory is currently empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer flex flex-col border border-gray-200 bg-white hover:border-gray-900 transition-colors p-3"
            >
              <div className="relative aspect-square mb-3 bg-gray-100 overflow-hidden border border-gray-100 p-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-gray-600">
                {product.name}
              </h3>
              <span className="text-xs font-mono text-green-700 mt-1">
                {product.priceText}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* --- REDESIGNED MODAL OVERLAY --- */}
      {selectedProduct && (
        <div
          id="modal-overlay"
          onClick={closeModal}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm animate-in fade-in duration-200"
        >
          {/* Wider, side-by-side layout for desktop */}
          <div className="bg-white max-w-3xl w-full flex flex-col md:flex-row border border-gray-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-white border border-gray-200 p-1.5 hover:bg-gray-100 transition-colors shadow-sm"
            >
              <X className="w-4 h-4 text-gray-900" />
            </button>

            {/* Left Side: Image container (keeps proportions constrained) */}
            <div className="w-full md:w-1/2 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-8 flex items-center justify-center relative min-h-[250px]">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full max-h-[300px] object-contain mix-blend-multiply"
              />
            </div>

            {/* Right Side: Text & Actions */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 pr-8 leading-tight">
                {selectedProduct.name}
              </h2>

              <div className="mb-6">
                <span className="inline-block text-xs font-mono text-green-700 bg-green-50 px-2 py-1 border border-green-200">
                  {selectedProduct.priceText}
                </span>
              </div>

              {/* Scrollable description area to prevent modal from getting too tall */}
              <div className="flex-grow overflow-y-auto max-h-[200px] md:max-h-[300px] pr-2 mb-8 custom-scrollbar">
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Dynamic WhatsApp Link Button */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Tanusree, I would like to enquire about the ${selectedProduct.name} from your collection.`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-auto flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 text-sm font-semibold hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
