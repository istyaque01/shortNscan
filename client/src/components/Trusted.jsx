import React from "react";
import svg1 from "../assets/icon_paying-customers.svg";
import svg2 from "../assets/icon_codes-links-created.svg";
import svg3 from "../assets/icon_connections-monthly.svg";

const Trusted = () => {
  return (
    <div className="px-4 py-10">
      <h3 className="text-center text-4xl md:text-5xl font-bold text-zinc-900">
        From startups to giants adopted and adored by millions.
      </h3>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center items-center mt-10">
        <div className="single bg-stone-300 px-6 py-5 w-100 h-80 text-center mt-6 flex flex-col space-y-6 rounded-2xl">
          <img src={svg1} alt="" className="h-20" />
          <p className="text-5xl font-bold">500K+</p>
          <p className="text-2xl mt-4">Global paying customers</p>
        </div>
        <div className="single bg-stone-300 px-6 py-5 w-100 h-80 text-center mt-6 flex flex-col space-y-6 rounded-2xl">
          <img src={svg2} alt="" className="h-20" />

          <p className="text-5xl font-bold">256M</p>
          <p className="text-2xl mt-4">Links & QR Code create monthly</p>
        </div>
        <div className="single bg-stone-300 px-6 py-5 w-100 h-80 text-center mt-6 flex flex-col space-y-6 rounded-2xl">
          <img src={svg3} alt="" className="h-20" />

          <p className="text-5xl font-bold">10B</p>
          <p className="text-2xl mt-4">Connections - clicks & scans monthly</p>
        </div>
      </div>
    </div>
  );
};

export default Trusted;
