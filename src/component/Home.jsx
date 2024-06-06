import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="h-96 text-white text-center grid bg-cover bg-[url('https://images.unsplash.com/photo-1683009427540-c5bd6a32abf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop')]">
        <div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-70 w-full h-full" />
        <div className="col-start-1 row-start-1 mx-auto my-auto">
          <h1 className="font-bold text-2xl">Hello {user.name}</h1>
          <p>Welcome to your dashboard</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleLogout}
          className="rounded-3xl bg-red-500 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
