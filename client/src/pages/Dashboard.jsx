import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const token = localStorage.getItem("token");

  const getAllUrl = async () => {
    const res = await axios.get(
      "https://shortnscan-backend.onrender.com/sNs/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    setUrls(data.urls);
  };
  const handleCopy = (text) => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported");
      return;
    }
    navigator.clipboard.writeText(text).then(() => toast.success("Copied!"));
  };

  useEffect(() => {
    getAllUrl();
  }, []);

  return (
    <div className="pt-20">
      <div className="center w-full bg-blue-950 py-6 min-h-screen">
        <h3 className="font-bold font-nunito text-3xl text-center text-stone-300 md:text-4xl">
          Dashboard
        </h3>

        <div className="md:hidden container mx-auto mt-6 space-y-4 px-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search your links"
              className="w-full p-4 mt-6 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400 bg-stone-100 placeholder:text-gray-900"
            />
          </div>

          <div className="p-5 text-xl font-semibold text-left rtl:text-right text-stone-300">
            Your Links
            <p className="mt-1 text-sm font-normal text-stone-300">
              Manage and track your shortened links
            </p>
          </div>

          {urls?.map((itm, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between rounded-xl bg-white shadow dark:bg-gray-800 p-4"
            >
              <div className="basis-[70%] mr-2 space-y-1 overflow-hidden">
                <p
                  className="font-semibold text-gray-900 dark:text-gray-100 truncate break-all cursor-pointer"
                  title="Click to copy"
                  onClick={() => handleCopy(itm.url)}
                >
                  {itm.url}
                </p>

                <p
                  className="text-sm text-gray-500 dark:text-gray-400 truncate break-all cursor-pointer"
                  title="Click to copy"
                  onClick={() => handleCopy(itm.shortId)}
                >
                  {itm.shortId}
                </p>
              </div>

              <div className="basis-[30%] text-right shrink-0 pl-2">
                <p className="font-bold text-orange-500 dark:text-orange-400">
                  {itm.clicks}
                </p>
                <p className="text-xs font-normal text-gray-400">clicks</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-x-auto sm:rounded-lg hidden md:block mt-6">
          <div className="w-[70vw] mx-auto mb-4">
            <input
              type="text"
              placeholder="Search your links"
              className="w-full p-4 mt-6 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400 bg-stone-100 placeholder:text-gray-900"
            />
          </div>

          <table className="w-[70vw] mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white rounded-2xl">
            <caption className="p-5 text-xl font-semibold text-left rtl:text-right text-stone-100">
              Your Links
              <p className="mt-1 text-sm font-normal text-stone-100">
                Manage and track your shortened links
              </p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Original Url
                </th>
                <th scope="col" className="px-6 py-3">
                  Short Url
                </th>
                <th scope="col" className="px-6 py-3">
                  Clicks
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {urls?.map((itm) => (
                <tr className=" dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {itm.url}
                  </th>
                  <td className="px-6 py-4"> {itm.shortUrl}</td>
                  <td className="px-6 py-4"> {itm.clicks}</td>
                  <td className="px-6 py-4">
                    {new Date(itm.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
