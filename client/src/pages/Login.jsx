import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/mainLogo1.png";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "https://shortnscan-backend.onrender.com/sNs/login",
        formData
      );
      const data = res.data;

      if (data.status === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.username);
        localStorage.setItem("email", data.email);
        toast.success("Logged In");
        navigate("/");
      }
    } catch (err) {
      console.log("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex justify-between items-center gap-4 center p-4 w-[70vw] mx-auto">
        <div className="w-full">
          <h3 className="text-3xl font-bold text-center mb-6">Login</h3>

          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* Terms */}
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 
                       dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 
                       dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="terms"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                   focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Switch to Register */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block md:w-full">
          <img
            src={logo}
            alt="auth banner"
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
