import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 border-b border-gray-100 mb-8 md:mb-12">
      <Link
        to="/"
        className="text-sm font-semibold tracking-tight hover:text-gray-600 transition-colors shrink-0"
      >
        tanusree
      </Link>

      {/* Mobile-optimized swipeable navigation */}
      <div className="flex gap-5 md:gap-6 text-sm text-gray-500 font-mono overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
        <Link
          to="/catalogue"
          className="hover:text-gray-900 transition-colors whitespace-nowrap"
        >
          e-catalogue
        </Link>
        <Link
          to="/knowledge"
          className="hover:text-gray-900 transition-colors whitespace-nowrap"
        >
          product-knowledge
        </Link>
        <Link
          to="/products"
          className="hover:text-gray-900 transition-colors whitespace-nowrap"
        >
          available-products
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
