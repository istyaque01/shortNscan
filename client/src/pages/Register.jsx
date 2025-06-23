import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/mainLogo1.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://shortnscan-backend.onrender.com/sNs/signup",
        {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          confirmpassword: formData.confirmpassword,
        }
      );
      toast.success("Signed Up");
    } catch (err) {
      console.log("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center mt-10">
      <div className="flex justify-between gap-4 p-4 w-[70vw] mx-auto">
        <div className="w-full">
          <h3 className="text-3xl font-bold text-center">
            Create your account
          </h3>

          <form
            className="flex flex-col gap-2 max-w-sm mx-auto mt-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex items-start my-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I agree to the&nbsp;
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                         disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register New Account"}
            </button>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block md:w-full">
          <img
            src={logo}
            alt="register art"
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
