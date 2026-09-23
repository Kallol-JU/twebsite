import { useState, useEffect } from "react";
import { Calendar, Users } from "lucide-react";
import { PopupModal } from "react-calendly";

const YoutubeIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    setRootElement(document.getElementById("root"));
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="w-36 h-36">
          <img
            src="/proflie.png"
            alt="Tanusree Avatar"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Tanusree Banerjee
          </h1>
          <p className="text-sm text-gray-500 mt-0.5 font-mono">
            Director @ Oriflame India
          </p>
        </div>
      </div>
      <div className="space-y-3 max-w-2xl">
        <p className="text-sm leading-relaxed text-gray-600 max-w-2xl">
          Sharing authentic beauty, skincare knowledge, and wellness journeys.
          Empowering individuals through Oriflame products and flexible business
          opportunities.
        </p>
        <p className="text-base font-bold text-gray-900">
          Want to join Oriflame ? Click{" "}
          <a
            href="https://shop.oriflame.com/IN-347508tanusreebandyapadhyay/csxyoy9Ua"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-2 underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-all"
          >
            here
          </a>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-1">
        <div className="flex items-center gap-4 text-gray-600">
          <a
            href="https://www.youtube.com/@taanusree1653/videos"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 transition-colors"
            title="YouTube"
          >
            <YoutubeIcon />
          </a>
          <a
            href="https://www.instagram.com/tanusreesbeautyandbusiness/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 transition-colors"
            title="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/share/1Bwb1ivHka/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 transition-colors"
            title="Facebook"
          >
            <FacebookIcon />
          </a>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-900 text-xs font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          Book Free Consultation
        </button>
      </div>

      <div className="space-y-1.5 pt-2 text-xs font-mono text-gray-500">
        <div className="flex items-center gap-2">
          <YoutubeIcon />
          <span>5K+ subscribers across YouTube & Instagram</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-gray-400" />
          <span>1K+ members managed successfully</span>
        </div>
      </div>

      {rootElement && (
        <PopupModal
          url="https://calendly.com/mukherjeekallol42/30min"
          pageSettings={{
            backgroundColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "111111",
            textColor: "111111",
          }}
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          rootElement={rootElement}
        />
      )}
    </div>
  );
};

export default Hero;
