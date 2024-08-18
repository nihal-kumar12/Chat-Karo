import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  // Debugging: Ensure `allUsers` is an array
  console.log(allUsers);

  // Display loading indicator if data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Ensure `allUsers` is an array before using `.map`
  const usersList = Array.isArray(allUsers) ? allUsers : [];

  return (
    <div>
      <h1 className="px-8 py-1.5 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div className="py-2 flex-1 overflow-auto" style={{ maxHeight: "calc(92vh - 16vh)" }}>
        {usersList.length === 0 ? (
          <p>No users found.</p>
        ) : (
          usersList.map((user, index) => (
            <User key={index} user={user} />
          ))
        )}
      </div>
    </div>
  );
}

export default Users;
