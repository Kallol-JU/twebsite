import { ExternalLink, BookOpen } from "lucide-react";

const CatalogueCard = () => {
  // Placeholder data - will be fetched from GET /api/catalogue later
  const catalogue = {
    month: "September",
    year: 2026,
    title: "Oriflame e-Catalogue September 2026",
    description:
      "Explore this month’s exclusive product launches, skincare routines, and special discount offers directly from Oriflame India.",
    catalogueUrl: "https://in.oriflame.com",
  };

  return (
    <div className="p-6 border border-gray-200 hover:border-gray-400 transition-colors group bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          <BookOpen className="w-4 h-4 text-gray-700" />
          <span>
            {catalogue.month} {catalogue.year} Edition
          </span>
        </div>
        <a
          href={catalogue.catalogueUrl}
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 group-hover:text-gray-900 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {catalogue.title}
      </h3>
      <p className="text-sm text-gray-600 mb-6">{catalogue.description}</p>

      <a
        href={catalogue.catalogueUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block text-xs border-b border-gray-900 pb-0.5 font-semibold text-gray-900 hover:text-gray-600 transition-colors"
      >
        View Digital Catalogue →
      </a>
    </div>
  );
};

export default CatalogueCard;
