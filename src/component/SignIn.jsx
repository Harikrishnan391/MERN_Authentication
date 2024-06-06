import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { BASE_URL } from "../../config";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData, "formData");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log(result, "result");
      if (!res.ok) {
        throw new Error(result.message);
      }
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      

      setTimeout(() => {
        toast.success("Login Successful!");
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error.message, {});
    }
  };

  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80")',
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <h1 className="mb-2 text-2xl">Sign In</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form onSubmit={submitHandler}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 text-lg text-white text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
