import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center border-b border-gray-100 mb-12">
      <Link
        to="/"
        className="text-sm font-semibold tracking-tight hover:text-gray-600 transition-colors"
      >
        tanusree.
      </Link>
      <div className="flex gap-6 text-sm text-gray-500 font-mono">
        <Link to="/offers" className="hover:text-gray-900 transition-colors">
          e-catalogue
        </Link>
        <Link to="/knowledge" className="hover:text-gray-900 transition-colors">
          product-knowledge
        </Link>
        <Link to="/products" className="hover:text-gray-900 transition-colors">
          available-products
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
