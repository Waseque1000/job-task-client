import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Components/Context/Authproviders";
// import { AuthContext } from "../../Provider/Authproviders";
// import Lottie from "lottie-react";
// import img from "../../../assets/Animation - 1733628357825.json";

const PrivateRouts = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner text-error"></span>;
    // return <Lottie animationData={img} />;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRouts;
