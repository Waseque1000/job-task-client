import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsGoogle } from "react-icons/bs";
import { Github } from "lucide-react";
import { ImCross } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../Context/Authproviders";
// import { AuthContext } from "../Provider/Authproviders";

const Login = () => {
  const { login, user, setUser, setLoading, googleLogin, forgetpass } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const emailref = useRef();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Google login handler
  const handleGoogle = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // Login handler
  const handlelogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        navigate(location?.state ? location?.state : "/", { replace: true });
        toast("Login Success", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        form.reset();
      })
      .catch((error) => {
        toast.error("Login failed. Please try again.", {
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

  const handleForgetPass = () => {
    const email = emailref.current.value;
    if (!email) {
      toast.error("Please enter your email address.");
    } else {
      forgetpass(email)
        .then(() => {
          toast.success("Password reset email sent successfully.");
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="hero bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:justify-between w-full max-w-6xl">
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
            Login now!
          </h1>
          <p className="py-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
            Log in to access exclusive features and continue your journey.
          </p>
        </div>
        <div className="card bg-white dark:bg-gray-800 w-full max-w-sm shadow-2xl lg:w-1/3">
          <form onSubmit={handlelogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-gray-200">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="email"
                ref={emailref}
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
              <label className="label">
                <button
                  onClick={handleForgetPass}
                  className="label-text-alt link link-hover text-blue-600 dark:text-blue-300"
                >
                  Forgot password?
                </button>
              </label>
              <p className="text-red-600 dark:text-red-400">
                <Link to="/register" className="t">
                  New User
                </Link>
              </p>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400">
                Login
              </button>
            </div>
            <div className="flex flex-row text-center justify-evenly form-control mt-6">
              <button
                onClick={handleGoogle}
                className="text-red-800 hover:text-green-600 dark:text-red-500 dark:hover:text-green-400"
              >
                <BsGoogle size={24} />
              </button>
              <button className="text-red-800 ml-4 hover:text-green-600 dark:text-red-500 dark:hover:text-green-400">
                <Github size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
