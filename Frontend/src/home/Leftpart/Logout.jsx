import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/logout`);
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error("Error logging out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <BiLogOutCircle
        className={`text-2xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={!loading ? handleLogout : undefined}
      />
    </div>
  );
}

export default Logout;
