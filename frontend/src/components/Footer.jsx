import { useLocation } from "react-router-dom";

// Bulletproof Native SVG Icons
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 7.1C2.6 5 4.3 3.3 6.4 3.1 8.3 2.9 12 2.9 12 2.9s3.7 0 5.6.2c2.1.2 3.8 1.9 3.9 4 .2 1.6.2 4.9.2 4.9s0 3.3-.2 4.9c-.1 2.1-1.8 3.8-3.9 4-1.9.2-5.6.2-5.6.2s-3.7 0-5.6-.2c-2.1-.2-3.8-1.9-3.9-4-.2-1.6-.2-4.9-.2-4.9s0-3.3.2-4.9z" />
    <path d="M9.8 15.5l6.4-3.5-6.4-3.5v7z" />
  </svg>
);

const Footer = () => {
  const location = useLocation();

  // Hide the footer completely if the user is on the admin dashboard
  if (location.pathname === "/admin") {
    return null;
  }

  return (
    <footer className="max-w-4xl mx-auto px-6 py-8 mt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Left Side: Social Icons */}
      <div className="w-full md:w-1/3 flex items-center justify-center md:justify-start gap-6 text-gray-400">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-900 transition-colors"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-900 transition-colors"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-900 transition-colors"
          aria-label="YouTube"
        >
          <YoutubeIcon />
        </a>
      </div>

      {/* Middle: Developer Credit */}
      <div className="w-full md:w-1/3 text-center text-xs font-mono text-gray-400">
        built and maintained by{" "}
        <a
          href="https://portfolio-kallol-ju.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors underline decoration-gray-300 hover:decoration-gray-900 underline-offset-4"
        >
          Kallol
        </a>
      </div>

      {/* Right Side: Copyright */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-end text-xs font-mono text-gray-400">
        &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
