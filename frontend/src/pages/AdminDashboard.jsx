import { useState, useEffect } from "react";
import {
  LogOut,
  BookOpen,
  Video,
  Package,
  Loader2,
  Pencil,
  Trash2,
  X,
  Play,
  Tag,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [activeTab, setActiveTab] = useState("offers"); // Default tab set to offers
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data Lists
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [recentList, setRecentList] = useState([]);
  const [offerList, setOfferList] = useState([]);

  // Editing States
  const [editingKnowledgeId, setEditingKnowledgeId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingRecentId, setEditingRecentId] = useState(null);
  const [editingOfferId, setEditingOfferId] = useState(null);

  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [catalogueData, setCatalogueData] = useState({
    month: "September",
    year: 2026,
    flipbookEmbedUrl: "",
    originalPdfLink: "",
  });

  const emptyKnowledge = {
    title: "",
    sourceUrl: "",
    platform: "YouTube",
    thumbnailUrl: "",
    category: "Skincare",
  };
  const [knowledgeData, setKnowledgeData] = useState(emptyKnowledge);

  const emptyProduct = {
    name: "",
    description: "",
    imageUrl: "",
    category: "Skincare",
    isOnSale: false,
    saleText: "",
  };
  const [productData, setProductData] = useState(emptyProduct);

  const emptyRecent = { title: "", sourceUrl: "", thumbnailUrl: "" };
  const [recentData, setRecentData] = useState(emptyRecent);

  const emptyOffer = {
    title: "",
    offerPeriod: "1st Sept – 30th Sept 2026",
    imageUrl: "",
    details: "",
    linkUrl: "",
  };
  const [offerData, setOfferData] = useState(emptyOffer);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const fetchExistingData = async () => {
    try {
      const [knowledgeRes, productRes, recentRes, offerRes] = await Promise.all(
        [
          fetch(`${import.meta.env.VITE_API_URL}/api/product-knowledge`),
          fetch(`${import.meta.env.VITE_API_URL}/api/products`),
          fetch(`${import.meta.env.VITE_API_URL}/api/recent-videos`),
          fetch(`${import.meta.env.VITE_API_URL}/api/offer-hero`), // Fetch OfferHero
        ],
      );
      const kData = await knowledgeRes.json();
      const pData = await productRes.json();
      const rData = await recentRes.json();
      const oData = await offerRes.json();

      setKnowledgeList(Array.isArray(kData) ? kData : []);
      setProductList(Array.isArray(pData) ? pData : []);
      setRecentList(Array.isArray(rData) ? rData : []);
      setOfferList(Array.isArray(oData) ? oData : []);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    if (token) fetchExistingData();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
      } else showMessage(data.message, "error");
    } catch (err) {
      showMessage("Server error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  // --- CATALOGUE CRUD ---
  const submitCatalogue = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/catalogue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(catalogueData),
      });
      if (res.ok) {
        showMessage("Catalogue updated!", "success");
        setCatalogueData({
          ...catalogueData,
          flipbookEmbedUrl: "",
          originalPdfLink: "",
        });
      } else showMessage("Update failed", "error");
    } catch (err) {
      showMessage("Server error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- KNOWLEDGE CRUD ---
  const submitKnowledge = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingKnowledgeId ? "PUT" : "POST";
    const url = editingKnowledgeId
      ? `${import.meta.env.VITE_API_URL}/api/product-knowledge/${editingKnowledgeId}`
      : `${import.meta.env.VITE_API_URL}/api/product-knowledge`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(knowledgeData),
      });
      if (res.ok) {
        showMessage(
          editingKnowledgeId ? "Post updated!" : "Post added!",
          "success",
        );
        setKnowledgeData(emptyKnowledge);
        setEditingKnowledgeId(null);
        fetchExistingData();
      } else showMessage("Failed to save", "error");
    } catch (err) {
      showMessage("Server error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteKnowledge = async (id) => {
    if (!window.confirm("Delete this video post?")) return;
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/product-knowledge/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      showMessage("Deleted successfully", "success");
      fetchExistingData();
    } catch (err) {
      showMessage("Delete failed", "error");
    }
  };

  const editKnowledge = (post) => {
    setKnowledgeData({
      title: post.title,
      sourceUrl: post.sourceUrl,
      platform: post.platform,
      thumbnailUrl: post.thumbnailUrl,
      category: post.category,
    });
    setEditingKnowledgeId(post._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- PRODUCT CRUD ---
  const submitProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingProductId ? "PUT" : "POST";
    const url = editingProductId
      ? `${import.meta.env.VITE_API_URL}/api/products/${editingProductId}`
      : `${import.meta.env.VITE_API_URL}/api/products`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        showMessage(
          editingProductId ? "Product updated!" : "Product added!",
          "success",
        );
        setProductData(emptyProduct);
        setEditingProductId(null);
        fetchExistingData();
      } else showMessage("Failed to save", "error");
    } catch (err) {
      showMessage("Server error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Remove this product?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      showMessage("Deleted successfully", "success");
      fetchExistingData();
    } catch (err) {
      showMessage("Delete failed", "error");
    }
  };

  const editProduct = (prod) => {
    setProductData({
      name: prod.name,
      description: prod.description,
      imageUrl: prod.imageUrl,
      category: prod.category || "Skincare",
      isOnSale: prod.isOnSale || false,
      saleText: prod.saleText || "",
    });
    setEditingProductId(prod._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- RECENT VIDEOS CRUD ---
  const submitRecent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingRecentId ? "PUT" : "POST";
    const url = editingRecentId
      ? `${import.meta.env.VITE_API_URL}/api/recent-videos/${editingRecentId}`
      : `${import.meta.env.VITE_API_URL}/api/recent-videos`;
    try {
      const dataToSubmit = editingRecentId
        ? recentData
        : { ...recentData, order: recentList.length };
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });
      if (res.ok) {
        showMessage(
          editingRecentId ? "Recent video updated!" : "Recent video added!",
          "success",
        );
        setRecentData(emptyRecent);
        setEditingRecentId(null);
        fetchExistingData();
      } else showMessage("Failed to save", "error");
    } catch (err) {
      showMessage("Server error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteRecent = async (id) => {
    if (!window.confirm("Remove this video from Home?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/recent-videos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      showMessage("Deleted successfully", "success");
      fetchExistingData();
    } catch (err) {
      showMessage("Delete failed", "error");
    }
  };

  const editRecent = (vid) => {
    setRecentData({
      title: vid.title,
      sourceUrl: vid.sourceUrl,
      thumbnailUrl: vid.thumbnailUrl,
    });
    setEditingRecentId(vid._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveVideo = async (index, direction) => {
    const newList = [...recentList];
    if (direction === "up" && index > 0) {
      [newList[index - 1], newList[index]] = [
        newList[index],
        newList[index - 1],
      ];
    } else if (direction === "down" && index < newList.length - 1) {
      [newList[index + 1], newList[index]] = [
        newList[index],
        newList[index + 1],
      ];
    } else return;

    setRecentList(newList);
    try {
      const orderedIds = newList.map((vid) => vid._id);
      await fetch(`${import.meta.env.VITE_API_URL}/api/recent-videos/reorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderedIds }),
      });
    } catch (err) {
      showMessage("Failed to save new order", "error");
      fetchExistingData();
    }
  };

  // --- OFFER HERO (MONTHLY OFFERS) CRUD & REORDER ---
  const submitOffer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingOfferId ? "PUT" : "POST";
    const url = editingOfferId
      ? `${import.meta.env.VITE_API_URL}/api/offer-hero/${editingOfferId}`
      : `${import.meta.env.VITE_API_URL}/api/offer-hero`;

    const dataToSubmit = editingOfferId
      ? offerData
      : { ...offerData, order: offerList.length };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit), // Fixed parameter
      });
      if (res.ok) {
        showMessage(
          editingOfferId ? "Offer updated!" : "Offer added!",
          "success",
        );
        setOfferData(emptyOffer);
        setEditingOfferId(null);
        fetchExistingData();
      } else showMessage("Failed to save offer", "error");
    } catch (err) {
      showMessage("Server error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteOffer = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/offer-hero/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      showMessage("Offer deleted successfully", "success");
      fetchExistingData();
    } catch (err) {
      showMessage("Delete failed", "error");
    }
  };

  const editOffer = (offer) => {
    setOfferData({
      title: offer.title,
      offerPeriod: offer.offerPeriod,
      imageUrl: offer.imageUrl,
      details: offer.details || "",
      linkUrl: offer.linkUrl || "",
    });
    setEditingOfferId(offer._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveOffer = async (index, direction) => {
    const newList = [...offerList];
    if (direction === "up" && index > 0) {
      [newList[index - 1], newList[index]] = [
        newList[index],
        newList[index - 1],
      ];
    } else if (direction === "down" && index < newList.length - 1) {
      [newList[index + 1], newList[index]] = [
        newList[index],
        newList[index + 1],
      ];
    } else return;

    setOfferList(newList);
    try {
      const orderedIds = newList.map((offer) => offer._id);
      await fetch(`${import.meta.env.VITE_API_URL}/api/offer-hero/reorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderedIds }),
      });
    } catch (err) {
      showMessage("Failed to save new order", "error");
      fetchExistingData();
    }
  };

  if (!token) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-8 border border-gray-200 bg-white">
        <h1 className="text-xl font-bold tracking-tight mb-6">Admin Login</h1>
        {message.text && (
          <div className="mb-4 text-xs font-mono text-red-600 bg-red-50 p-2 border border-red-100">
            {message.text}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-mono">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-gray-900"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-mono">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 p-2 text-sm outline-none focus:border-gray-900"
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center bg-gray-900 text-white p-2 text-sm font-semibold hover:bg-gray-800 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage site content securely.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-900"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {message.text && (
        <div
          className={`p-3 text-sm font-mono border ${message.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("offers")}
          className={`pb-2 text-sm font-mono flex items-center gap-2 whitespace-nowrap ${activeTab === "offers" ? "border-b-2 border-gray-900 text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}`}
        >
          <Tag className="w-4 h-4" /> Monthly Offers
        </button>
        <button
          onClick={() => setActiveTab("catalogue")}
          className={`pb-2 text-sm font-mono flex items-center gap-2 whitespace-nowrap ${activeTab === "catalogue" ? "border-b-2 border-gray-900 text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}`}
        >
          <BookOpen className="w-4 h-4" /> E-Catalogue
        </button>
        <button
          onClick={() => setActiveTab("knowledge")}
          className={`pb-2 text-sm font-mono flex items-center gap-2 whitespace-nowrap ${activeTab === "knowledge" ? "border-b-2 border-gray-900 text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}`}
        >
          <Video className="w-4 h-4" /> Knowledge
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-2 text-sm font-mono flex items-center gap-2 whitespace-nowrap ${activeTab === "products" ? "border-b-2 border-gray-900 text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}`}
        >
          <Package className="w-4 h-4" /> Inventory
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={`pb-2 text-sm font-mono flex items-center gap-2 whitespace-nowrap ${activeTab === "recent" ? "border-b-2 border-gray-900 text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}`}
        >
          <Play className="w-4 h-4" /> Home Videos
        </button>
      </div>

      <div className="bg-gray-50 p-6 border border-gray-200">
        {/* MONTHLY OFFERS TAB */}
        {activeTab === "offers" && (
          <div className="space-y-10">
            <form
              onSubmit={submitOffer}
              className="space-y-4 bg-white p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">
                  {editingOfferId ? "Edit Offer" : "Add Monthly Offer"}
                </h3>
                {editingOfferId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingOfferId(null);
                      setOfferData(emptyOffer);
                    }}
                    className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-900"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1">
                    Offer Title
                  </label>
                  <input
                    type="text"
                    value={offerData.title}
                    onChange={(e) =>
                      setOfferData({ ...offerData, title: e.target.value })
                    }
                    placeholder="e.g. Plenty Program"
                    className="w-full border border-gray-200 p-2 text-sm"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1">
                    Offer Period
                  </label>
                  <input
                    type="text"
                    value={offerData.offerPeriod}
                    onChange={(e) =>
                      setOfferData({
                        ...offerData,
                        offerPeriod: e.target.value,
                      })
                    }
                    placeholder="e.g. 1st Sept – 30th Sept"
                    className="w-full border border-gray-200 p-2 text-sm"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Offer Banner Image URL
                </label>
                <input
                  type="url"
                  value={offerData.imageUrl}
                  onChange={(e) =>
                    setOfferData({ ...offerData, imageUrl: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Details & Conditions (Optional)
                </label>
                <textarea
                  value={offerData.details}
                  onChange={(e) =>
                    setOfferData({ ...offerData, details: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 text-sm min-h-[60px]"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  External Link (Optional)
                </label>
                <input
                  type="url"
                  value={offerData.linkUrl}
                  onChange={(e) =>
                    setOfferData({ ...offerData, linkUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full border border-gray-200 p-2 text-sm"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white px-4 py-2 text-sm font-semibold"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingOfferId
                    ? "Update Offer"
                    : "Add Offer Banner"}
              </button>
            </form>

            <div>
              <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">
                Active Monthly Offers (Pages)
              </h3>
              <div className="space-y-3">
                {offerList.map((offer, index) => (
                  <div
                    key={offer._id}
                    className="flex justify-between items-center bg-white p-3 border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      {/* REORDER BUTTONS */}
                      <div className="flex flex-col border-r border-gray-200 pr-3">
                        <button
                          onClick={() => moveOffer(index, "up")}
                          disabled={index === 0}
                          className="p-0.5 text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveOffer(index, "down")}
                          disabled={index === offerList.length - 1}
                          className="p-0.5 text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>

                      <img
                        src={offer.imageUrl}
                        alt={offer.title}
                        className="w-12 h-12 object-cover border border-gray-100"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {offer.title}
                        </p>
                        <p className="text-xs font-mono text-gray-500">
                          {offer.offerPeriod}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 pl-3 border-l border-gray-200">
                      <button
                        onClick={() => editOffer(offer)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteOffer(offer._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATALOGUE TAB */}
        {activeTab === "catalogue" && (
          <form onSubmit={submitCatalogue} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Month
                </label>
                <input
                  type="text"
                  value={catalogueData.month}
                  onChange={(e) =>
                    setCatalogueData({
                      ...catalogueData,
                      month: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={catalogueData.year}
                  onChange={(e) =>
                    setCatalogueData({ ...catalogueData, year: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-500 mb-1">
                Flipbook Embed URL
              </label>
              <input
                type="url"
                value={catalogueData.flipbookEmbedUrl}
                onChange={(e) =>
                  setCatalogueData({
                    ...catalogueData,
                    flipbookEmbedUrl: e.target.value,
                  })
                }
                className="w-full border border-gray-200 p-2 text-sm"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-500 mb-1">
                Original PDF Link
              </label>
              <input
                type="url"
                value={catalogueData.originalPdfLink}
                onChange={(e) =>
                  setCatalogueData({
                    ...catalogueData,
                    originalPdfLink: e.target.value,
                  })
                }
                className="w-full border border-gray-200 p-2 text-sm"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-900 text-white px-4 py-2 text-sm font-semibold"
            >
              {isSubmitting ? "Updating..." : "Set Active Catalogue"}
            </button>
          </form>
        )}

        {/* KNOWLEDGE TAB */}
        {activeTab === "knowledge" && (
          <div className="space-y-10">
            <form
              onSubmit={submitKnowledge}
              className="space-y-4 bg-white p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">
                  {editingKnowledgeId ? "Edit Video Post" : "Add New Video"}
                </h3>
                {editingKnowledgeId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingKnowledgeId(null);
                      setKnowledgeData(emptyKnowledge);
                    }}
                    className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-900"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                )}
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={knowledgeData.title}
                  onChange={(e) =>
                    setKnowledgeData({
                      ...knowledgeData,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1">
                    Platform
                  </label>
                  <select
                    value={knowledgeData.platform}
                    onChange={(e) =>
                      setKnowledgeData({
                        ...knowledgeData,
                        platform: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 p-2 text-sm"
                    disabled={isSubmitting}
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1">
                    Category
                  </label>
                  <select
                    value={knowledgeData.category}
                    onChange={(e) =>
                      setKnowledgeData({
                        ...knowledgeData,
                        category: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 p-2 text-sm"
                    disabled={isSubmitting}
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Haircare">Haircare</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Source URL
                </label>
                <input
                  type="url"
                  value={knowledgeData.sourceUrl}
                  onChange={(e) =>
                    setKnowledgeData({
                      ...knowledgeData,
                      sourceUrl: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={knowledgeData.thumbnailUrl}
                  onChange={(e) =>
                    setKnowledgeData({
                      ...knowledgeData,
                      thumbnailUrl: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white px-4 py-2 text-sm font-semibold"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingKnowledgeId
                    ? "Update Video"
                    : "Publish Video"}
              </button>
            </form>

            <div>
              <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">
                Existing Videos
              </h3>
              <div className="space-y-3">
                {knowledgeList.map((post) => (
                  <div
                    key={post._id}
                    className="flex justify-between items-center bg-white p-3 border border-gray-200"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {post.title}
                      </p>
                      <p className="text-xs font-mono text-gray-500">
                        {post.category} • {post.platform}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editKnowledge(post)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteKnowledge(post._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="space-y-10">
            <form
              onSubmit={submitProduct}
              className="space-y-4 bg-white p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">
                  {editingProductId ? "Edit Product" : "Add New Product"}
                </h3>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProductId(null);
                      setProductData(emptyProduct);
                    }}
                    className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-900"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={productData.name}
                    onChange={(e) =>
                      setProductData({ ...productData, name: e.target.value })
                    }
                    className="w-full border border-gray-200 p-2 text-sm"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1">
                    Category
                  </label>
                  <select
                    value={productData.category}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        category: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 p-2 text-sm"
                    disabled={isSubmitting}
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Oriflame Special Edition Accessories">
                      Oriflame Special Edition Accessories
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Description
                </label>
                <textarea
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 p-2 text-sm min-h-[80px]"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={productData.imageUrl}
                  onChange={(e) =>
                    setProductData({ ...productData, imageUrl: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* SALE OPTIONS */}
              <div className="p-4 bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="saleStatus"
                    checked={productData.isOnSale}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        isOnSale: e.target.checked,
                      })
                    }
                    className="w-4 h-4 cursor-pointer"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="saleStatus"
                    className="text-sm font-semibold text-gray-900 cursor-pointer"
                  >
                    Put this product on sale
                  </label>
                </div>

                {productData.isOnSale && (
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-1">
                      Sale Details / Price Text
                    </label>
                    <input
                      type="text"
                      value={productData.saleText}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          saleText: e.target.value,
                        })
                      }
                      placeholder="e.g. 50% Off or Rs 999"
                      className="w-full border border-gray-200 p-2 text-sm"
                      required={productData.isOnSale}
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white px-4 py-2 text-sm font-semibold"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingProductId
                    ? "Update Product"
                    : "Add Product"}
              </button>
            </form>

            <div>
              <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">
                Current Inventory
              </h3>
              <div className="space-y-3">
                {productList.map((prod) => (
                  <div
                    key={prod._id}
                    className="flex justify-between items-center bg-white p-3 border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 border border-gray-100 p-1">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {prod.name}
                        </p>
                        <p className="text-xs font-mono text-gray-500">
                          {prod.category} {prod.isOnSale ? " • (ON SALE)" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editProduct(prod)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HOME VIDEOS TAB */}
        {activeTab === "recent" && (
          <div className="space-y-10">
            <form
              onSubmit={submitRecent}
              className="space-y-4 bg-white p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">
                  {editingRecentId ? "Edit Home Video" : "Add Home Video"}
                </h3>
                {editingRecentId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingRecentId(null);
                      setRecentData(emptyRecent);
                    }}
                    className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-900"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                )}
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={recentData.title}
                  onChange={(e) =>
                    setRecentData({ ...recentData, title: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Source URL (YouTube link)
                </label>
                <input
                  type="url"
                  value={recentData.sourceUrl}
                  onChange={(e) =>
                    setRecentData({ ...recentData, sourceUrl: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={recentData.thumbnailUrl}
                  onChange={(e) =>
                    setRecentData({
                      ...recentData,
                      thumbnailUrl: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 p-2 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white px-4 py-2 text-sm font-semibold"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingRecentId
                    ? "Update Video"
                    : "Pin to Homepage"}
              </button>
            </form>

            <div>
              <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">
                Currently on Homepage
              </h3>
              <div className="space-y-3">
                {recentList.map((vid, index) => (
                  <div
                    key={vid._id}
                    className="flex justify-between items-center bg-white p-3 border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col border-r border-gray-200 pr-3">
                        <button
                          onClick={() => moveVideo(index, "up")}
                          disabled={index === 0}
                          className="p-0.5 text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveVideo(index, "down")}
                          disabled={index === recentList.length - 1}
                          className="p-0.5 text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {vid.title}
                      </p>
                    </div>

                    <div className="flex gap-2 pl-3 border-l border-gray-200">
                      <button
                        onClick={() => editRecent(vid)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRecent(vid._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
