import ProductGrid from "../components/ProductGrid";

const KnowledgePage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Product Knowledge
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Curated tutorials, skincare routines, and wellness tips.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
};

export default KnowledgePage;
