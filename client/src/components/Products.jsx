import React from "react";
import urlIcon from "../assets/url-icon.svg";
import qrIcon from "../assets/qr-codes-icon.svg";
import { HiOutlineCheckBadge } from "react-icons/hi2";

const Products = () => {
  return (
    <div className="products px-2 py-10">
      <h3 className="font-bold text-4xl md:text-6xl text-center text-zinc-800">
        Our Poroducts
      </h3>

      <div className="flex flex-col md:flex-row md:w-[90vw] lg:w-[80vw] xl:w-[60vw] mx-auto space-x-4 mt-6">
        <div className="items flex flex-col mt-8 bg-white py-8 px-16 w-100 mx-auto rounded-2xl shadow-xl">
          <div className="flex space-x-3">
            <img src={urlIcon} alt="" />
            <h3 className="text-3xl font-bold text-zinc-800">URL shortner</h3>
          </div>
          <p className="text-center mt-6">
            This tool converts long links into short, shareable URLs with fast
            redirection and simple link management—perfect for social media,
            emails, and more.
          </p>

          <p className="font-bold text-xl mt-6 text-zinc-800">Our URL shortner Features:</p>
          <div className="mt-6 flex flex-col space-y-3 font-semibold text-zinc-800">
            <div className="flex space-x-2 text-left">
              <span className="text-orange-400 text-2xl">
                <HiOutlineCheckBadge />
              </span>
              <p>Shorten long URLs into clean, shareable links.</p>
            </div>
            <div className="flex space-x-2 text-left">
              <span className="text-orange-400 text-2xl">
                <HiOutlineCheckBadge />
              </span>
              <p>Track the number of clicks on each link.</p>
            </div>
            <div className="flex space-x-2 text-left">
              <span className="text-orange-400 text-2xl">
                <HiOutlineCheckBadge />
              </span>
              <p>Create custom short links with your own alias.</p>
            </div>
            <div className="flex space-x-2 text-left">
              <span className="text-orange-400 text-2xl">
                <HiOutlineCheckBadge />
              </span>
              <p>Set expiration dates to auto-disable links.</p>
            </div>
          </div>
        </div>
        <div className="items flex flex-col mt-8 bg-white py-8 px-16 w-100 mx-auto rounded-2xl shadow-xl">
          <div className="flex space-x-3 justify-center">
            <img src={qrIcon} alt="" />
            <h3 className="text-3xl font-bold text-zinc-800">QR Codes</h3>
          </div>
          <p className="text-center mt-6">
            Generate QR codes instantly for any URL or text. Scannable on any
            device, ideal for print or offline sharing. Fast, reliable, and easy
            to use.
          </p>

          <p className="font-bold text-xl mt-6 text-zinc-800">Our URL shortner Features:</p>
          <div className="mt-6 flex flex-col space-y-3 font-semibold text-zinc-800">
            <div className="flex space-x-2 text-left">
              <span className="text-orange-400 text-2xl">
                <HiOutlineCheckBadge />
              </span>
              <p>Create QR codes for URLs, text, or contact info.</p>
            </div>
            <div className="flex space-x-2 text-left">
              <span className="text-orange-400 text-2xl">
                <HiOutlineCheckBadge />
              </span>
              <p>Download QR codes in high-quality image format.</p>
            </div>
            <div className="flex space-x-2 text-left">
              <span className="text-orange-400 text-2xl">
                <HiOutlineCheckBadge />
              </span>
              <p>Mobile-friendly and instantly scannable.</p>
            </div>
            <div className="flex space-x-2 text-left">
              <span className="text-orange-400 text-2xl">
                <HiOutlineCheckBadge />
              </span>
              <p>Customize QR code size and style for your needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
