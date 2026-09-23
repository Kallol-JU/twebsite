import { useState, useEffect } from "react";
import { Loader2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const MonthlyOffersBook = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/offer-hero`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setOffers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setOffers([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-12 border border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-500 font-mono">
          No active offers listed for this month.
        </p>
      </div>
    );
  }

  const activeOffer = offers[currentPage];

  const handleNext = () => {
    if (currentPage < offers.length - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="bg-white border border-gray-200 shadow-sm flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4 bg-gray-50/50">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            {activeOffer.offerPeriod}
          </span>
          <span className="text-xs font-mono text-gray-400 bg-white px-2 py-1 border border-gray-200">
            Page {currentPage + 1} of {offers.length}
          </span>
        </div>

        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          <div className="w-full bg-gray-50 border border-gray-100 overflow-hidden mb-8 flex justify-center">
            <img
              src={activeOffer.imageUrl}
              alt={activeOffer.title}
              loading="lazy"
              className="w-full h-auto object-contain max-h-[600px]"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-xl">
              {activeOffer.title}
            </h3>

            {activeOffer.details && (
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap pt-2">
                {activeOffer.details}
              </p>
            )}

            {activeOffer.linkUrl && (
              <div className="pt-4">
                <a
                  href={activeOffer.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-gray-900 bg-white border border-gray-200 px-4 py-2 hover:border-gray-900 transition-colors"
                >
                  View T&C Details{" "}
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-gray-200 divide-x divide-gray-200 mt-auto bg-gray-50/30">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="flex items-center justify-center gap-2 py-4 text-sm font-mono text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage === offers.length - 1}
            className="flex items-center justify-center gap-2 py-4 text-sm font-mono text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyOffersBook;
