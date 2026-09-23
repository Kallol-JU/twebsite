import { useState, useEffect } from "react";
import { Loader2, PlayCircle, ArrowUpRight } from "lucide-react";

const RecentVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const youtubeChannelUrl = "https://www.youtube.com/@taanusree1653/videos";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recent-videos`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          setVideos([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setVideos([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (videos.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* 1. Clean Section Header matching the inspiration */}
      <div className="flex justify-between items-baseline border-b border-gray-200 pb-2 mb-6">
        <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Recent Videos
        </h2>
        <a
          href={youtubeChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-mono text-gray-500 hover:text-gray-900 transition-colors"
        >
          all &rarr;
        </a>
      </div>

      {/* 2. Inspiration-Style Padded Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <a
            key={video._id}
            href={video.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col bg-white border border-gray-200 p-6 hover:border-gray-400 transition-colors h-full"
          >
            {/* Top: Title & External Link Arrow */}
            <div className="flex justify-between items-start gap-4 mb-5">
              <h3 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-gray-600 transition-colors">
                {video.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-gray-900 transition-colors" />
            </div>

            {/* Middle: The Thumbnail framed securely inside the padding */}
            <div className="relative aspect-video w-full mb-6 bg-gray-50 border border-gray-100 overflow-hidden">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="w-10 h-10 text-white drop-shadow-md" />
              </div>
            </div>

            {/* Bottom: Domain text anchored to the bottom */}
            <div className="mt-auto">
              <span className="text-xs font-mono text-gray-400">
                youtube.com
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecentVideos;
