import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { BsGoogle } from "react-icons/bs";
import { Github } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { AuthContext } from "../Context/Authproviders";
// import { AuthContext } from "../Provider/Authproviders";

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

  const handleLogin = (e) => {
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
        // toast("Registration Success", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.log(err));
        form.reset();
      })
      .catch((err) => {
        // toast(err.message, {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      });
  };

  return (
    <div className="hero bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200">
            Register now!
          </h1>
          <p className="py-6 text-gray-700 dark:text-gray-300">
            Join us today and embark on an amazing journey of learning!
          </p>
        </div>
        <div className="card bg-white dark:bg-gray-800 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-gray-200">
                  Name
                </span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-gray-200">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                placeholder="photo"
                name="photo"
                className="input input-bordered bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-gray-200">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-gray-200">
                  Password
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input input-bordered bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500"
              >
                {showPassword ? (
                  <ImCross className="mt-3 text-1xl" />
                ) : (
                  <FaEye className="mt-3 text-1xl"></FaEye>
                )}
              </button>
              {passwordError && (
                <p className="text-red-600 dark:text-red-400 mt-2 text-sm">
                  {passwordError}
                </p>
              )}
            </div>
            <label className="label">
              <Link
                to="/login"
                className="label-text-alt link link-hover text-red-500 dark:text-red-400"
              >
                Already have an account?
              </Link>
            </label>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400"
              >
                Register
              </button>
            </div>
            <div className="flex flex-row justify-evenly form-control mt-6">
              <button
                onClick={handleGoogle}
                className="text-red-800 hover:text-green-600 dark:text-red-500 dark:hover:text-green-400"
              >
                <BsGoogle size={24} />
              </button>
              <button className="text-gray-800 ml-4 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                <Github size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registar;
