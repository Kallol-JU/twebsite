import { useState, useEffect } from "react";
import { BookOpen, Loader2, Download } from "lucide-react";

const OffersPage = () => {
  const [activeOffer, setActiveOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false); // Tracks flipbook readiness

  useEffect(() => {
    fetch("http://localhost:5000/api/catalogue/active")
      .then((res) => {
        if (!res.ok) throw new Error("No active offers found");
        return res.json();
      })
      .then((data) => {
        setActiveOffer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!activeOffer) {
    return (
      <div className="text-center py-20 border border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-500 font-mono">
          No active offers available at the moment.
        </p>
      </div>
    );
  }

  // Safely grab the URLs whether they are named from the old schema or the new Admin Panel schema
  const embedUrl = activeOffer.flipbookEmbedUrl || activeOffer.catalogueUrl;
  const pdfLink = activeOffer.originalPdfLink || activeOffer.coverImageUrl;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Monthly Offers
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Flip through this month's exclusive Plenty Programs, Business Class
            rewards, and discounts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-gray-100 px-3 py-1.5 border border-gray-200">
          <BookOpen className="w-4 h-4 text-gray-600" />
          <span>
            {activeOffer.month} {activeOffer.year} Offers
          </span>
        </div>
      </div>

      <div className="w-full relative bg-gray-50 border border-gray-200 shadow-sm">
        <div className="aspect-[3/4] md:aspect-[16/9] w-full relative">
          {/* The Loading Overlay - Shows until iframe triggers onLoad */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3 z-10 bg-gray-50/80 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
              <span className="text-xs font-mono">
                Loading Interactive Catalogue...
              </span>
            </div>
          )}

          <iframe
            allowFullScreen
            scrolling="no"
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
            className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-700 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
            src={embedUrl}
            title={`Oriflame Offers ${activeOffer.month}`}
          ></iframe>
        </div>
      </div>

      {/* Impatient User Fallback Button */}
      {pdfLink && (
        <div className="flex justify-end">
          <a
            href={pdfLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors border-b border-gray-300 pb-0.5"
          >
            <Download className="w-3.5 h-3.5" /> Download as PDF Instead
          </a>
        </div>
      )}
    </div>
  );
};

export default OffersPage;
