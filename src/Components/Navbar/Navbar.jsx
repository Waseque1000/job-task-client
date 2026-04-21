import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/Authproviders";
import { User, LogOut, Menu, X, CheckCircle2 } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect for glassy nav
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on navigation change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 font-sans ${
      scrolled 
        ? "bg-[#FCFAF5]/90 backdrop-blur-md border-b border-[#F0EBE3] shadow-sm" 
        : "bg-[#FCFAF5] border-b border-transparent"
    }`}>
      <div className="container mx-auto px-6 md:px-12 py-4">
        <div className="flex justify-between items-center h-10">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-[#DF8D61] flex items-center justify-center shadow-sm">
              {/* White circle with orange checkmark */}
              <CheckCircle2 size={20} className="text-white fill-white stroke-[#DF8D61]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#332D28]">
              Daily Planner
            </span>
          </Link>

          {/* Spacer to push items to the right */}
          <div className="flex-1"></div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
               <>
                {/* Simplified nav links when logged in */}
                <Link to="/task" className="text-[15px] font-medium text-[#8E8681] hover:text-[#433B36] transition-colors">
                  Tasks
                </Link>
                <div className="w-px h-4 bg-[#EBE7E0]"></div>
                
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 pr-3 p-1 rounded-full border border-[#F0EBE3] hover:bg-[#F5EEE6] transition-colors"
                  >
                    <img
                      src={user?.photoURL || "https://ui-avatars.com/api/?name=" + (user?.displayName || "User")}
                      alt="User"
                      className="w-8 h-8 rounded-full border border-[#DF8D61]/30 object-cover"
                    />
                    <span className="text-sm font-medium text-[#433B36] max-w-[100px] truncate">
                      {user?.displayName || "User"}
                    </span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-[#FEFDFB] border border-[#F0EBE3] shadow-lg rounded-2xl py-2 overflow-hidden transform origin-top-right transition-all">
                      <DropdownItem to="/dashboard" icon={<User size={16} />} text="Profile" />
                      <div className="h-px bg-[#F0EBE3] my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 flex items-center gap-3 text-[#E14336] hover:bg-[#FDF2F1] transition-colors text-sm font-medium"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
               </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-[15px] font-medium text-[#8E8681] hover:text-[#433B36] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-[#DF8D61] hover:bg-[#D47D4E] text-white px-5 py-2.5 rounded-[10px] font-medium text-[15px] transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button  */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              className="text-[#867666] p-2 hover:bg-[#F5EEE6] rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 absolute left-0 w-full bg-[#FEFDFB] shadow-xl ${
        isMenuOpen ? "max-h-[400px] opacity-100 border-b border-[#F0EBE3]" : "max-h-0 opacity-0"
      }`}>
        <div className="px-6 py-4 space-y-2">
          
          {user ? (
            <>
              <MobileNavLink to="/task" text="Tasks" />
              <div className="h-px bg-[#F0EBE3] my-4"></div>
              <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-[#F5EEE6] border border-[#EBE1D5]">
                <img
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=" + (user?.displayName || "User")}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border border-[#DF8D61]/30"
                />
                <div>
                  <div className="text-sm font-semibold text-[#433B36]">{user?.displayName || "User"}</div>
                  <div className="text-xs text-[#8E8681]">{user?.email}</div>
                </div>
              </div>
              <MobileNavLink to="/dashboard" text="Profile" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-[#E14336] hover:bg-[#FDF2F1] transition-colors font-medium text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-3 pt-2">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#F0EBE3] font-medium text-[#433B36] shadow-sm bg-[#F9F7F4]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#DF8D61] text-white font-medium shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Mobile Nav Link
const MobileNavLink = ({ to, text }) => (
  <Link
    to={to}
    className="block px-4 py-3 rounded-xl text-[#433B36] hover:bg-[#F5EEE6] transition-colors font-medium text-sm"
  >
    {text}
  </Link>
);

// Dropdown Item
const DropdownItem = ({ to, icon, text }) => (
  <Link
    to={to}
    className="block px-4 py-2.5 flex items-center gap-3 text-sm font-medium text-[#433B36] hover:bg-[#F5EEE6] hover:text-[#DF8D61] transition-colors"
  >
    {icon}
    {text}
  </Link>
);

export default Navbar;
