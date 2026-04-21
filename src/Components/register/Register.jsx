import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsGoogle } from "react-icons/bs";
import { CheckCircle2, Eye, EyeOff, X } from "lucide-react";
import { AuthContext } from "../Context/Authproviders";

const Registar = () => {
  const { register, setUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogle = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photo = form.photo.value;

    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordValidationRegex.test(password)) {
      setPasswordError(
        "Password must include at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      setIsLoading(false);
      return;
    }

    setPasswordError("");
    register(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
        form.reset();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#FCFAF5] font-sans flex items-center justify-center p-4">
      {/* Container */}
      <div className="relative w-full max-w-[460px] bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-10 border border-[#F0EBE3]/50">
        
        {/* Close Button */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-6 right-6 text-[#A8A09B] hover:text-[#433B36] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-[52px] h-[52px] rounded-[14px] bg-[#DF8D61] flex items-center justify-center shadow-sm">
            <CheckCircle2 size={30} className="text-white fill-white stroke-[#DF8D61]" />
          </div>
        </div>

        {/* Header Strings */}
        <h2 className="text-center text-[26px] font-bold text-[#332D28] mb-2 tracking-tight">
          Start planning
        </h2>
        <p className="text-center text-[#8E8681] text-[15px] mb-8 font-medium">
          Create your account to organize your day
        </p>

        {/* Social Auth */}
        <button 
          onClick={handleGoogle} 
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-[#F0EBE3] hover:bg-[#F9F7F4] transition-colors text-[#332D28] font-semibold text-[15px] shadow-sm mb-7 cursor-pointer"
        >
          <BsGoogle className="text-[#EA4335] text-lg" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-7">
          <div className="flex-1 h-px bg-[#EBE7E0]"></div>
          <span className="text-[#A8A09B] text-sm">or</span>
          <div className="flex-1 h-px bg-[#EBE7E0]"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-semibold text-[#332D28] mb-2">First/Last name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-3.5 rounded-2xl border border-[#F0EBE3] bg-white text-[#332D28] placeholder-[#B0A8A3] focus:outline-none focus:ring-2 focus:ring-[#DF8D61]/20 focus:border-[#DF8D61] transition-all text-[15px]"
                required
              />
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#332D28] mb-2">Profile Photo</label>
              <input
                type="url"
                name="photo"
                placeholder="Image URL"
                className="w-full px-4 py-3.5 rounded-2xl border border-[#F0EBE3] bg-white text-[#332D28] placeholder-[#B0A8A3] focus:outline-none focus:ring-2 focus:ring-[#DF8D61]/20 focus:border-[#DF8D61] transition-all text-[15px]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-[#332D28] mb-2">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3.5 rounded-2xl border border-[#F0EBE3] bg-white text-[#332D28] placeholder-[#B0A8A3] focus:outline-none focus:ring-2 focus:ring-[#DF8D61]/20 focus:border-[#DF8D61] transition-all text-[15px]"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-[14px] font-semibold text-[#332D28] mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              className="w-full pl-4 pr-12 py-3.5 rounded-2xl border border-[#F0EBE3] bg-white text-[#332D28] placeholder-[#B0A8A3] focus:outline-none focus:ring-2 focus:ring-[#DF8D61]/20 focus:border-[#DF8D61] transition-all text-[15px]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-[#A8A09B] hover:text-[#433B36] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {passwordError && (
              <p className="text-[#E14336] mt-2 text-sm font-medium">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#DF8D61] hover:bg-[#D47D4E] text-white py-[15px] rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_-4px_rgba(225,141,96,0.4)] hover:shadow-[0_6px_16px_-4px_rgba(225,141,96,0.6)] mt-2"
          >
            {isLoading ? "Creating Account..." : "Continue"} 
            {!isLoading && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-[15px] text-[#8E8681]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#DF8D61] hover:text-[#D47D4E] font-medium transition-colors">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Registar;
