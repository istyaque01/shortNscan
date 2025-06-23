import React from "react";
import {
  FaFacebookF,
  FaDiscord,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";
import logo from "../assets/newLogo.png";
import logo2 from "../assets/mainLogo2.png";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="text-white bg-gray-900">
    <div className="flex flex-col md:flex-row justify-between items-center mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="mb-6 md:mb-0">
        <img src={logo2} className="h-25 me-3" alt="shortNscan" />
      </div>

      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          ShortNScan™
        </a>
        . All Rights Reserved.
      </span>

      <div className="flex mt-4 sm:justify-center sm:mt-0 gap-5">
        <a
          href="#"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <FaFacebookF className="w-4 h-4" aria-label="Facebook" />
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <FaDiscord className="w-4 h-4" aria-label="Discord" />
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <FaTwitter className="w-4 h-4" aria-label="Twitter" />
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <FaGithub className="w-4 h-4" aria-label="GitHub" />
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <FaDribbble className="w-4 h-4" aria-label="Dribbble" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
