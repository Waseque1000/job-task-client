// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { BsGoogle } from "react-icons/bs";
// import { Github } from "lucide-react";
// import { FaEye } from "react-icons/fa";
// import { ImCross } from "react-icons/im";
// import { AuthContext } from "../Context/Authproviders";
// // import { AuthContext } from "../Provider/Authproviders";

// const Registar = () => {
//   const { register, user, setUser, updateUserProfile, googleLogin } =
//     useContext(AuthContext);
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState("");

//   const handleGoogle = () => {
//     googleLogin()
//       .then((result) => {
//         const user = result.user;
//         setUser(user);
//         navigate("/");
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     const name = form.name.value;
//     const photo = form.photo.value;

//     const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

//     if (!passwordValidationRegex.test(password)) {
//       setPasswordError(
//         "Password must include at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
//       );
//       return;
//     }

//     setPasswordError("");
//     register(email, password)
//       .then((result) => {
//         const user = result.user;
//         setUser(user);
//         // toast("Registration Success", {
//         //   position: "top-right",
//         //   autoClose: 2000,
//         //   hideProgressBar: false,
//         //   closeOnClick: true,
//         //   pauseOnHover: true,
//         //   draggable: true,
//         //   progress: undefined,
//         //   theme: "light",
//         // });
//         updateUserProfile({ displayName: name, photoURL: photo })
//           .then(() => {
//             navigate("/");
//           })
//           .catch((err) => console.log(err));
//         form.reset();
//       })
//       .catch((err) => {
//         // toast(err.message, {
//         //   position: "top-right",
//         //   autoClose: 2000,
//         //   hideProgressBar: false,
//         //   closeOnClick: true,
//         //   pauseOnHover: true,
//         //   draggable: true,
//         //   progress: undefined,
//         //   theme: "light",
//         // });
//       });
//   };

//   return (
//     <div className="hero bg-gray-100 dark:bg-gray-900 min-h-screen">
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className="text-center lg:text-left">
//           <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200">
//             Register now!
//           </h1>
//           <p className="py-6 text-gray-700 dark:text-gray-300">
//             Join us today and embark on an amazing journey of learning!
//           </p>
//         </div>
//         <div className="card bg-white dark:bg-gray-800 w-full max-w-sm shrink-0 shadow-2xl">
//           <form onSubmit={handleLogin} className="card-body">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-gray-800 dark:text-gray-200">
//                   Name
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="name"
//                 name="name"
//                 className="input input-bordered bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
//                 required
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-gray-800 dark:text-gray-200">
//                   Photo URL
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="photo"
//                 name="photo"
//                 className="input input-bordered bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
//                 required
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-gray-800 dark:text-gray-200">
//                   Email
//                 </span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="email"
//                 name="email"
//                 className="input input-bordered bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
//                 required
//               />
//             </div>
//             <div className="form-control relative">
//               <label className="label">
//                 <span className="label-text text-gray-800 dark:text-gray-200">
//                   Password
//                 </span>
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="password"
//                 name="password"
//                 className="input input-bordered bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-10 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500"
//               >
//                 {showPassword ? (
//                   <ImCross className="mt-3 text-1xl" />
//                 ) : (
//                   <FaEye className="mt-3 text-1xl"></FaEye>
//                 )}
//               </button>
//               {passwordError && (
//                 <p className="text-red-600 dark:text-red-400 mt-2 text-sm">
//                   {passwordError}
//                 </p>
//               )}
//             </div>
//             <label className="label">
//               <Link
//                 to="/login"
//                 className="label-text-alt link link-hover text-red-500 dark:text-red-400"
//               >
//                 Already have an account?
//               </Link>
//             </label>
//             <div className="form-control mt-6">
//               <button
//                 type="submit"
//                 className="btn btn-primary bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400"
//               >
//                 Register
//               </button>
//             </div>
//             <div className="flex flex-row justify-evenly form-control mt-6">
//               <button
//                 onClick={handleGoogle}
//                 className="text-red-800 hover:text-green-600 dark:text-red-500 dark:hover:text-green-400"
//               >
//                 <BsGoogle size={24} />
//               </button>
//               <button className="text-gray-800 ml-4 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
//                 <Github size={24} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registar;
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsGoogle } from "react-icons/bs";
import { Github } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { AuthContext } from "../Context/Authproviders";

const Registar = () => {
  const { register, user, setUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

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
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.log(err));
        form.reset();
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section - Illustration and Welcome Message */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-8 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4">Join Us!</h1>
          <p className="text-lg text-center mb-8">
            Create an account and start your journey with us today.
          </p>
          <img
            src="https://illustrations.popsy.co/amber/sign-up.svg"
            alt="Sign Up Illustration"
            className="w-64 h-64"
          />
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Register
          </h2>
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter your photo URL"
                name="photo"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <ImCross className="text-lg" />
                ) : (
                  <FaEye className="text-lg" />
                )}
              </button>
              {passwordError && (
                <p className="text-red-600 dark:text-red-400 mt-2 text-sm">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Register
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                OR
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGoogle}
                className="flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-300"
              >
                <BsGoogle className="text-xl" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition duration-300">
                <Github className="text-xl" />
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registar;
