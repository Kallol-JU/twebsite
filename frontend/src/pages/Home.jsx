import Hero from "../components/Hero";
import MonthlyOffersBook from "../components/MonthlyOffersBook"; // Updated Import
import RecentVideos from "../components/RecentVideos";

const Home = () => {
  return (
    <div className="space-y-24">
      <section>
        <Hero />
      </section>

      {/* The New Interactive Booklet */}
      <section>
        <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-8">
          <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Current Month Offers
          </h2>
        </div>

        <MonthlyOffersBook />
      </section>

      <section>
        <RecentVideos />
      </section>
    </div>
  );
};

export default Home;
