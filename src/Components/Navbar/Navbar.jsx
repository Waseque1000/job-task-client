import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Authproviders";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3B82F6" }}>
        <Link to="/">Task Manager</Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#4B5563",
            fontWeight: "500",
          }}
        >
          Home
        </Link>
        <Link
          to="/task"
          style={{
            textDecoration: "none",
            color: "#4B5563",
            fontWeight: "500",
          }}
        >
          Tasks
        </Link>
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "#4B5563",
            fontWeight: "500",
          }}
        >
          Profile
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="navbar-end flex items-center space-x-3">
        {/* Theme Toggle Button */}

        {user ? (
          <>
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full border-2 border-green-500 cursor-pointer"
                src={user?.photoURL}
                alt={user?.displayName || "User"}
                title={user?.displayName}
              />
            </div>
            <button
              onClick={handleLogout}
              className="btn bg-blue-400 px-2 py-2 rounded-2xl text-white hover:bg-blue-500"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
            <Link className="btn btn-secondary" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
