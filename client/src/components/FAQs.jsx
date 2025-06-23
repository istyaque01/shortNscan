import React, { useState } from "react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: "What is ShortNScan?",
      content:
        "ShortNScan is an all-in-one tool that helps you shorten long URLs and generate QR codes instantly. Whether you're sharing links online or offline, it makes the process simple and efficient.",
    },
    {
      title: "How do I create a short link?",
      content:
        "Just paste your long URL into the input box and click 'Shorten.' Your custom short link will be generated instantly and ready to share or track.",
    },
    {
      title: "How do I generate a QR code?",
      content:
        "Enter a URL or text, and click 'Generate QR.' You’ll get a downloadable, scannable QR code perfect for print, promotions, or sharing offline.",
    },
    {
      title: "Is sign-in required to use ShortNScan?",
      content:
        "Yes, sign-in is required to access link history, manage your shortened URLs, and track QR code analytics. It helps keep your data secure and organized.",
    },
  ];

  return (
    <div className="w-full bg-stone-100">
      <div
        id="accordion-collapse"
        className="w-full max-w-2xl mx-auto my-10 px-4 py-6 "
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Frequently Asked Questions
        </h1>

        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded mb-3"
            >
              <h2>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 gap-3"
                >
                  <span>{item.title}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      d="M9 5 5 1 1 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </h2>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-96 opacity-100 p-5" : "max-h-0 opacity-0 p-0"
                } dark:bg-gray-900`}
              >
                <p className="text-gray-600 dark:text-gray-400">
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
