import React, { useState, useRef, useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import QRCodeStyling from "qr-code-styling";
import { HiBadgeCheck } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";

/**
 * This version is tuned for **mobile‑first** responsiveness.
 * ➜ Anything below 350 px keeps small defaults.
 * ➜ At **min‑width 350 px** we scale up paddings, fonts, etc.
 *    We use Tailwind arbitrary breakpoints like `min-[350px]:text-4xl`.
 * ➜ Higher Tailwind breakpoints (sm, md, lg) remain unchanged.
 */
const HomeTabs = () => {
  const [activeTab, setActiveTab] = useState("shortener");
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const qrRef = useRef(null);
  const qrCode = useRef(null);
  const [qrReady, setQrReady] = useState(false);

  const [dotStyle, setDotStyle] = useState("square");
  const [dotColor, setDotColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logoDataURL, setLogoDataURL] = useState("");

  const token = localStorage.getItem("token");
  const urlRegex =
    /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i;

  /**
   * Initialize & update QR every time deps change
   */
  useEffect(() => {
    if (activeTab !== "qr") return;

    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 240,
        height: 240,
        data: "",
        image: "",
        dotsOptions: { type: dotStyle, color: dotColor },
        backgroundOptions: { color: bgColor },
        imageOptions: { crossOrigin: "anonymous", margin: 4 },
      });
      qrCode.current.append(qrRef.current);
    }

    qrCode.current.update({
      data: input || " ",
      image: logoDataURL || "",
      dotsOptions: { type: dotStyle, color: dotColor },
      backgroundOptions: { color: bgColor },
    });
    setQrReady(!!input);
  }, [input, dotStyle, dotColor, bgColor, logoDataURL, activeTab]);

  /** UTILITIES */
  const clearAll = () => {
    setInput("");
    setShortUrl("");
    setQrReady(false);
    setLogoDataURL("");
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  /** API */
  const handleShorten = async () => {
    if (!input || !urlRegex.test(input)) {
      toast.warn("Enter a valid URL");
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://shortnscan-backend.onrender.com/sNs",
        { url: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShortUrl(data.url);
      toast.success("Short URL ready!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadQr = () => {
    if (!token) {
      toast.warn("Please sign in to download QR codes");
      return;
    }
    qrReady && qrCode.current.download({ name: "qr", extension: "png" });
  };

  const handleTabClick = (id) => {
    if (id === "qr" && !token) {
      toast.warn("Please sign in to generate QR codes");
      setActiveTab("shortener");
      return;
    }
    clearAll();
    setActiveTab(id);
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-[url('./assets/new-logo.png')] bg-cover bg-center min-h-screen flex flex-col items-center gap-6 min-[350px]:gap-8 px-3 min-[350px]:px-5 md:px-8 py-10 min-[350px]:py-12 pt-24">
        {/* Title */}
        <h1 className="text-stone-200 text-2xl min-[350px]:text-3xl sm:text-5xl font-bold text-center leading-tight">
          Shorten • Style • Share
        </h1>
        {/* Subtitle */}
        <p className="text-gray-400 text-center max-w-lg min-[350px]:max-w-xl px-1">
          Create sleek short URLs or on‑brand QR codes in seconds.
        </p>

        {/* Tab Buttons */}
        <div className="flex gap-2 min-[350px]:gap-4 bg-stone-800 p-1 rounded-full shadow-lg">
          {[
            { id: "shortener", label: "Link Shortener" },
            { id: "qr", label: "QR‑Code Generator" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`px-4 min-[350px]:px-6 py-2 text-xs min-[350px]:text-sm font-semibold rounded-full ${
                activeTab === id
                  ? "bg-orange-500 text-white"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            activeTab === "shortener" ? "Paste a valid URL" : "Text or URL for QR"
          }
          className="w-full max-w-sm min-[350px]:max-w-md sm:max-w-2xl bg-stone-200 border rounded-xl py-3 min-[350px]:py-4 px-4 min-[350px]:px-6 focus:outline-orange-400"
        />

        {/* --- SHORTENER TAB --- */}
        {activeTab === "shortener" && (
          <>
            {/* Shorten Button */}
            <button
              onClick={handleShorten}
              disabled={!input}
              className={`$${"!input ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-400'"} text-white py-3 min-[350px]:py-4 px-6 min-[350px]:px-8 rounded-2xl`}
            >
              Shorten It
            </button>

            {isLoading && <span className="loader" />}

            {/* Result */}
            {shortUrl && (
              <div className="bg-stone-200 p-3 min-[350px]:p-4 rounded-lg text-green-600 flex flex-col gap-3 min-[350px]:gap-4 w-full max-w-sm min-[350px]:max-w-md sm:max-w-2xl">
                <p className="break-words text-center text-sm min-[350px]:text-base">
                  {shortUrl}
                </p>
                <button
                  className="bg-cyan-500 hover:bg-cyan-400 text-white py-2 px-4 rounded-xl mx-auto text-sm min-[350px]:text-base"
                  onClick={() => handleCopy(shortUrl)}
                >
                  Copy
                </button>
              </div>
            )}
          </>
        )}

        {/* --- QR TAB --- */}
        {activeTab === "qr" && (
          <>
            {/* Controls */}
            <div className="flex flex-wrap gap-3 min-[350px]:gap-4 justify-center items-center mt-4">
              {/* Shape */}
              <label className="flex items-center gap-1 min-[350px]:gap-2 text-xs min-[350px]:text-sm text-stone-300">
                Shape:
                <select
                  value={dotStyle}
                  onChange={(e) => setDotStyle(e.target.value)}
                  className="text-gray-900 bg-white rounded-md px-2 py-1"
                >
                  <option value="square">Square</option>
                  <option value="dots">Dots</option>
                  <option value="rounded">Rounded</option>
                  <option value="classy">Classy</option>
                  <option value="classy-rounded">Classy Rounded</option>
                </select>
              </label>
              {/* Dot Color */}
              <label className="flex items-center gap-1 min-[350px]:gap-2 text-xs min-[350px]:text-sm text-stone-300">
                Dot&nbsp;Color:
                <input
                  type="color"
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                  className="cursor-pointer h-8 w-8 min-[350px]:h-10 min-[350px]:w-10 border-0 rounded-full"
                />
              </label>
              {/* BG Color */}
              <label className="flex items-center gap-1 min-[350px]:gap-2 text-xs min-[350px]:text-sm text-stone-300">
                BG&nbsp;Color:
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="cursor-pointer h-8 w-8 min-[350px]:h-10 min-[350px]:w-10 border-0 rounded-full"
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-3 min-[350px]:gap-4 mt-6 items-center">
              <button
                onClick={handleDownloadQr}
                disabled={!qrReady}
                className={`$${"!qrReady ? 'bg-stone-500' : 'bg-cyan-500 hover:bg-cyan-400'"} text-white py-3 min-[350px]:py-4 px-6 min-[350px]:px-8 rounded-2xl`}
              >
                Download PNG
              </button>
            </div>

            <div
              ref={qrRef}
              className={`${qrReady ? "block" : "hidden"} mt-4 min-[350px]:mt-6 bg-white p-4 min-[350px]:p-6 rounded-xl shadow-lg`}
            />
          </>
        )}

        {/* --- Free Plan Notice --- */}
        {!token && (
          <div className="mt-8 min-[350px]:mt-10 text-center text-stone-300 flex flex-col gap-3 min-[350px]:gap-4">
            <p className="text-lg min-[350px]:text-xl font-bold">
              Sign up for free – plan includes:
            </p>
            <div className="flex flex-col md:flex-row gap-2 min-[350px]:gap-4 mx-auto text-xs min-[350px]:text-sm">
              {[
                "5 short links / month",
                "3 custom links / month",
                "3 styled QR codes / month",
                "Unlimited link clicks",
              ].map((txt) => (
                <div key={txt} className="flex items-center gap-1 min-[350px]:gap-2">
                  <span className="text-orange-500">
                    <HiBadgeCheck />
                  </span>
                  <p>{txt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toasts */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick={false}
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
};

export default HomeTabs;
