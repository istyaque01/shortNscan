import React, { useState, useRef, useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import QRCodeStyling from "qr-code-styling";
import { HiBadgeCheck } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";

/**
 * This version is tuned for **mobile‑first** responsiveness.
 * ➜ Below 280px: Minimal defaults.
 * ➜ At **min-[280px]**: Slight scale up for small mobiles.
 * ➜ At **min-[350px]**: Further scale up for larger mobiles.
 * ➜ At **min-[600px]**: Adjustments for tablet/laptop views.
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

  useEffect(() => {
    if (activeTab !== "qr") return;

    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 180, // Reduced further for better scaling
        height: 180,
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
      <div className="bg-[url('./assets/new-logo.png')] bg-cover bg-center min-h-screen flex flex-col items-center gap-3 min-[280px]:gap-4 min-[350px]:gap-6 min-[600px]:gap-8 px-2 min-[280px]:px-3 min-[350px]:px-4 min-[600px]:px-8 py-6 min-[280px]:py-8 min-[350px]:py-10 min-[600px]:py-12 pt-16 min-[280px]:pt-18 min-[350px]:pt-20 min-[600px]:pt-24">
        <h1 className="text-stone-200 text-lg min-[280px]:text-xl min-[350px]:text-2xl min-[600px]:text-3xl sm:text-5xl font-bold text-center leading-tight">
          Shorten • Style • Share
        </h1>
        <p className="text-gray-400 text-center max-w-xs min-[280px]:max-w-sm min-[350px]:max-w-md min-[600px]:max-w-lg px-1">
          Create sleek short URLs or on‑brand QR codes in seconds.
        </p>

        <div className="flex gap-1 min-[280px]:gap-2 min-[350px]:gap-3 min-[600px]:gap-4 bg-stone-800 p-1 min-[280px]:p-1.5 min-[350px]:p-2 rounded-full shadow-lg">
          {[
            { id: "shortener", label: "Link Shortener" },
            { id: "qr", label: "QR‑Code Generator" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`px-2 min-[280px]:px-3 min-[350px]:px-4 min-[600px]:px-6 py-1 min-[280px]:py-1.5 min-[350px]:py-2 text-xs min-[350px]:text-sm min-[600px]:text-base font-semibold rounded-full ${
                activeTab === id
                  ? "bg-orange-500 text-white"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            activeTab === "shortener" ? "Paste a valid URL" : "Text or URL for QR"
          }
          className="w-full max-w-xs min-[280px]:max-w-sm min-[350px]:max-w-md min-[600px]:max-w-xl sm:max-w-2xl bg-stone-200 border rounded-xl py-1.5 min-[280px]:py-2 min-[350px]:py-3 px-2 min-[280px]:px-3 min-[350px]:px-4 focus:outline-orange-400 text-sm min-[280px]:text-base"
        />

        {activeTab === "shortener" && (
          <>
            <button
              onClick={handleShorten}
              disabled={!input}
              className={`${
                !input ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-400"
              } text-white py-1.5 min-[280px]:py-2 min-[350px]:py-3 px-3 min-[280px]:px-4 min-[350px]:px-6 rounded-2xl text-sm min-[280px]:text-base`}
            >
              Shorten It
            </button>

            {isLoading && <span className="loader" />}

            {shortUrl && (
              <div className="bg-stone-200 p-1.5 min-[280px]:p-2 min-[350px]:p-3 rounded-lg text-green-600 flex flex-col gap-1.5 min-[280px]:gap-2 min-[350px]:gap-3 w-full max-w-xs min-[280px]:max-w-sm min-[350px]:max-w-md min-[600px]:max-w-xl sm:max-w-2xl">
                <p className="break-words text-center text-xs min-[280px]:text-sm min-[350px]:text-base">
                  {shortUrl}
                </p>
                <button
                  className="bg-cyan-500 hover:bg-cyan-400 text-white py-1 min-[280px]:py-1.5 px-2 min-[280px]:px-3 rounded-xl mx-auto text-xs min-[280px]:text-sm min-[350px]:text-base"
                  onClick={() => handleCopy(shortUrl)}
                >
                  Copy
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === "qr" && (
          <>
            <div className="flex flex-wrap gap-1.5 min-[280px]:gap-2 min-[350px]:gap-3 justify-center items-center mt-2 min-[280px]:mt-3">
              <label className="flex items-center gap-1 min-[280px]:gap-1.5 text-xs min-[350px]:text-sm text-stone-300">
                Shape:
                <select
                  value={dotStyle}
                  onChange={(e) => setDotStyle(e.target.value)}
                  className="text-gray-900 bg-white rounded-md px-1 py-1 text-xs min-[280px]:text-sm"
                >
                  <option value="square">Square</option>
                  <option value="dots">Dots</option>
                  <option value="rounded">Rounded</option>
                  <option value="classy">Classy</option>
                  <option value="classy-rounded">Classy Rounded</option>
                </select>
              </label>
              <label className="flex items-center gap-1 min-[280px]:gap-1.5 text-xs min-[350px]:text-sm text-stone-300">
                Dot Color:
                <input
                  type="color"
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                  className="cursor-pointer h-5 w-5 min-[280px]:h-6 min-[350px]:h-8 border-0 rounded-full"
                />
              </label>
              <label className="flex items-center gap-1 min-[280px]:gap-1.5 text-xs min-[350px]:text-sm text-stone-300">
                BG Color:
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="cursor-pointer h-5 w-5 min-[280px]:h-6 min-[350px]:h-8 border-0 rounded-full"
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-1.5 min-[280px]:gap-2 min-[350px]:gap-3 mt-3 min-[280px]:mt-4 items-center">
              <button
                onClick={handleDownloadQr}
                disabled={!qrReady}
                className={`${
                  !qrReady ? "bg-stone-500" : "bg-cyan-500 hover:bg-cyan-400"
                } text-white py-1.5 min-[280px]:py-2 min-[350px]:py-3 px-3 min-[280px]:px-4 min-[350px]:px-6 rounded-2xl text-sm min-[280px]:text-base`}
              >
                Download PNG
              </button>
            </div>

            <div
              ref={qrRef}
              className={`${qrReady ? "block" : "hidden"} mt-2 min-[280px]:mt-3 min-[350px]:mt-4 bg-white p-1.5 min-[280px]:p-2 min-[350px]:p-4 rounded-xl shadow-lg`}
            />
          </>
        )}

        {!token && (
          <div className="mt-5 min-[280px]:mt-6 min-[350px]:mt-8 text-center text-stone-300 flex flex-col gap-1.5 min-[280px]:gap-2 min-[350px]:gap-3">
            <p className="text-base min-[280px]:text-lg min-[350px]:text-xl font-bold">
              Sign up for free – plan includes:
            </p>
            <div className="flex flex-col md:flex-row gap-1 min-[280px]:gap-1.5 min-[350px]:gap-2 mx-auto text-xs min-[350px]:text-sm">
              {[
                "5 short links / month",
                "3 custom links / month",
                "3 styled QR codes / month",
                "Unlimited link clicks",
              ].map((txt) => (
                <div key={txt} className="flex items-center gap-1 min-[280px]:gap-1.5">
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