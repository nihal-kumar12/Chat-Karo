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
        const token = Cookies.get("jwt");
        const response = await axios.get(
          `/user/allusers`,
          {
            withCredentials: true, // Corrected here
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false in both success and error cases
      }
    };

    getUsers();
  }, []); // Dependency array is empty, meaning this effect runs only once after the initial render

  return [allUsers, loading];
}

export default useGetAllUsers;
