// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../Context/Authproviders";
// import { Home, List, User, LogOut, LogIn, UserPlus } from "lucide-react";

// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         // Sign-out successful.
//       })
//       .catch((error) => {
//         console.error("Logout error:", error);
//       });
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "16px 32px",
//         backgroundColor: "#FFFFFF",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//       }}
//     >
//       {/* Logo */}
//       <div
//         style={{
//           fontSize: "24px",
//           fontWeight: "bold",
//           color: "#3B82F6",
//           cursor: "pointer",
//         }}
//       >
//         <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//           Task Manager
//         </Link>
//       </div>

//       {/* Navigation Links */}
//       <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
//         <Link
//           to="/"
//           style={{
//             textDecoration: "none",
//             color: "#4B5563",
//             fontWeight: "500",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             transition: "color 0.3s ease",
//           }}
//           className="hover:text-blue-500"
//         >
//           <Home size={20} />
//           Home
//         </Link>
//         <Link
//           to="/task"
//           style={{
//             textDecoration: "none",
//             color: "#4B5563",
//             fontWeight: "500",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             transition: "color 0.3s ease",
//           }}
//           className="hover:text-blue-500"
//         >
//           <List size={20} />
//           Tasks
//         </Link>
//         <Link
//           to="/dashboard"
//           style={{
//             textDecoration: "none",
//             color: "#4B5563",
//             fontWeight: "500",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             transition: "color 0.3s ease",
//           }}
//           className="hover:text-blue-500"
//         >
//           <User size={20} />
//           Profile
//         </Link>
//       </div>

//       {/* User Profile Section */}
//       <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//         {user ? (
//           <>
//             {/* User Avatar with Dropdown */}
//             <div style={{ position: "relative" }}>
//               <img
//                 src={user?.photoURL}
//                 alt={user?.displayName || "User"}
//                 title={user?.displayName}
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   border: "2px solid #10B981",
//                   cursor: "pointer",
//                 }}
//                 onClick={toggleDropdown}
//               />
//               {/* Dropdown Menu */}
//               {isDropdownOpen && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "48px",
//                     right: "0",
//                     backgroundColor: "#FFFFFF",
//                     borderRadius: "8px",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     padding: "8px 0",
//                     minWidth: "160px",
//                     zIndex: 1000,
//                   }}
//                 >
//                   <div
//                     style={{
//                       padding: "8px 16px",
//                       color: "#4B5563",
//                       fontWeight: "500",
//                       cursor: "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "8px",
//                       transition: "background-color 0.3s ease",
//                     }}
//                     className="hover:bg-gray-100"
//                   >
//                     <User size={16} />
//                     Profile
//                   </div>
//                   <div
//                     onClick={handleLogout}
//                     style={{
//                       padding: "8px 16px",
//                       color: "#4B5563",
//                       fontWeight: "500",
//                       cursor: "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "8px",
//                       transition: "background-color 0.3s ease",
//                     }}
//                     className="hover:bg-gray-100"
//                   >
//                     <LogOut size={16} />
//                     Logout
//                   </div>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           <>
//             {/* Login and Register Buttons */}
//             <Link
//               to="/login"
//               style={{
//                 textDecoration: "none",
//                 color: "#FFFFFF",
//                 backgroundColor: "#3B82F6",
//                 padding: "8px 16px",
//                 borderRadius: "8px",
//                 fontWeight: "500",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 transition: "background-color 0.3s ease",
//               }}
//               className="hover:bg-blue-600"
//             >
//               <LogIn size={16} />
//               Login
//             </Link>
//             <Link
//               to="/register"
//               style={{
//                 textDecoration: "none",
//                 color: "#3B82F6",
//                 backgroundColor: "#EFF6FF",
//                 padding: "8px 16px",
//                 borderRadius: "8px",
//                 fontWeight: "500",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 transition: "background-color 0.3s ease",
//               }}
//               className="hover:bg-blue-50"
//             >
//               <UserPlus size={16} />
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Authproviders";
import { Home, List, User, LogOut, LogIn, UserPlus, Menu } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-5 py-3 md:px-10 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        Task Manager
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <NavLink to="/" icon={<Home size={20} />} text="Home" />
        <NavLink to="/task" icon={<List size={20} />} text="Tasks" />
        <NavLink to="/dashboard" icon={<User size={20} />} text="Profile" />
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-green-500 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                <DropdownItem
                  to="/dashboard"
                  icon={<User size={16} />}
                  text="Profile"
                />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex gap-4">
            <ButtonLink
              to="/login"
              icon={<LogIn size={16} />}
              text="Login"
              bgColor="bg-blue-500"
            />
            <ButtonLink
              to="/register"
              icon={<UserPlus size={16} />}
              text="Register"
              bgColor="bg-gray-100"
            />
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <NavLink to="/" icon={<Home size={20} />} text="Home" />
          <NavLink to="/task" icon={<List size={20} />} text="Tasks" />
          <NavLink to="/dashboard" icon={<User size={20} />} text="Profile" />
          {!user && (
            <>
              <ButtonLink
                to="/login"
                icon={<LogIn size={16} />}
                text="Login"
                bgColor="bg-blue-500"
              />
              <ButtonLink
                to="/register"
                icon={<UserPlus size={16} />}
                text="Register"
                bgColor="bg-gray-100"
              />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

// Nav Link Component
const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
  >
    {icon}
    {text}
  </Link>
);

// Dropdown Item Component
const DropdownItem = ({ to, icon, text }) => (
  <Link
    to={to}
    className="block px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
  >
    {icon}
    {text}
  </Link>
);

// Button Link Component
const ButtonLink = ({ to, icon, text, bgColor }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white ${bgColor} hover:opacity-90 transition`}
  >
    {icon}
    {text}
  </Link>
);

export default Navbar;
