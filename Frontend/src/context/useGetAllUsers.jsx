import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt"); // Get the token from cookies
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/allusers`, // Ensure the correct base URL
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the headers
            },
          }
        );
        console.log(response);
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []); // Empty dependency array to run only once on mount

  return [allUsers, loading];
}

export default useGetAllUsers;
