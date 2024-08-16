/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Extract the token from the URL parameters
        const token = new URLSearchParams(window.location.search).get("token");

        if (token) {
          console.log("Token found:", token); // Debugging log

          // Store the token in localStorage for future use
          localStorage.setItem("token", token);

          // Set the Authorization header for all axios requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Fetch the current user's information
          const response = await axios.get(
            "http://localhost:5000/api/auth/current-user"
          );

          console.log("User data:", response.data); // Debugging log

          // Save the user data in the component's state
          setUser(response.data);
        } else {
          console.log("No token found in URL"); // Debugging log
          setError("No token found in URL.");
        }
      } catch (error) {
        console.error(`Error Fetching user: ${error}`);
        setError("Error fetching user data. Please try again later."); // Set error state
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await localStorage.removeItem("token");
    navigate("/");
  };

  // Display a loading message until the user data is fetched
  if (loading) {
    return <div className="text-center mt-10">Loading.....</div>;
  }

  // Display an error message if there was an error fetching the user
  if (error) {
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  }

  // Once user data is available, display it
  return (
    <div className="relative">
      <div className="flex justify-center flex-wrap ">
        <h1 className=" m-2">
          Welcome,{" "}
          <span className="text-green-800 font-bold animate-pulse">
            {user?.name}
          </span>
        </h1>
        <div className="absolute top-0 right-0 p-2 border-1 bg-lime-900 rounded-lg hover:bg-black transition-colors flex justify-around">
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col m-5 justify-center items-center min-h-screen font-bold">
        <img src={user?.avatar} alt={user?.name} width={100} />
        <p>
          Email: <span className="text-green-800">{user?.email}</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
