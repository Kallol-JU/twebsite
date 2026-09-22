import { useState, useEffect } from "react";
import { Loader2, PlayCircle } from "lucide-react";

const ProductGrid = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/product-knowledge")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch from backend");
        return res.json();
      })
      .then((data) => {
        // Safety net: Ensures we are definitely working with an array
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data && Array.isArray(data.data)) {
          setPosts(data.data); // Just in case your backend wraps the data
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  // 1. MUST render loading state BEFORE doing any filtering to prevent crashes
  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // 2. Now it is completely safe to filter the data
  const filteredPosts = posts.filter(
    (post) => activeCategory === "All" || post.category === activeCategory,
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* The Category Dropdown */}
      <div className="flex justify-end border-b border-gray-200 pb-4">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="border border-gray-200 text-sm font-mono p-2 outline-none focus:border-gray-900 bg-white cursor-pointer hover:border-gray-400 transition-colors"
        >
          <option value="All">All Categories</option>
          <option value="Skincare">Skincare</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Haircare">Haircare</option>
        </select>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-10 border border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500 font-mono">
            No videos found for {activeCategory}.
          </p>
        </div>
      )}

      {/* The Clean Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        {filteredPosts.map((post) => (
          <a
            key={post._id}
            href={post.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="group block cursor-pointer"
          >
            <div className="relative aspect-video bg-gray-100 overflow-hidden border border-gray-200 mb-3">
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="w-12 h-12 text-white drop-shadow-md" />
              </div>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-gray-600 transition-colors">
              {post.title}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
