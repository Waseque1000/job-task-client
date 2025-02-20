import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "../Context/Authproviders";
import { Link } from "react-router-dom";

// SVG Icons as components
const Icons = {
  ArrowRight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  ),
  CheckCircle: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Layout: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  Clock: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Users: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Github: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
};

// const { user } = useContext(AuthContext);
const googleprovider = new GoogleAuthProvider();
const loginwithGoogle = () => {
  signInWithPopup(auth, googleprovider)
    .then((result) => {
      console.log("User has been signed in", result.user);
    })
    .catch((err) => {
      console.error("Error signing in with Google", err);
    });
};

const WelcomePage = () => {
  const [step, setStep] = useState("welcome"); // "welcome" or "login"

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {step === "welcome" ? (
        <WelcomeScreen onGetStarted={() => setStep("login")} />
      ) : (
        <LoginScreen onBack={() => setStep("welcome")} />
      )}
    </div>
  );
};

const WelcomeScreen = ({ onGetStarted }) => (
  <div className="container mx-auto px-4">
    <main className="py-20">
      <div className="max-w-[85rem] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 xl:gap-20 items-center">
          {/* Content */}
          <div>
            <div className="relative mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                  New Feature
                </span>
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                  AI-Powered
                </span>
              </div>
            </div>

            <h1 className="block text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">
              Manage tasks with
              <span className="text-indigo-600"> intelligence</span>
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Experience the future of task management. Streamline your
              workflow, collaborate seamlessly, and achieve more with our
              intuitive platform.
            </p>

            <div className="mt-8 grid gap-3 w-full sm:inline-flex">
              <button
                onClick={onGetStarted}
                className="inline-flex justify-center items-center gap-x-3 text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg hover:shadow-lg px-6 py-3"
              >
                <Link to="/register">Get started</Link>
                <Icons.ArrowRight />
              </button>
              <button className="inline-flex justify-center items-center gap-x-3 text-center border hover:border-gray-300 shadow-sm text-sm font-medium rounded-lg px-6 py-3">
                Take the tour
              </button>
            </div>

            <div className="mt-6 lg:mt-10 grid grid-cols-2 gap-x-5">
              <div className="py-5">
                <div className="flex items-center gap-x-3">
                  <div className="text-green-500">
                    <Icons.CheckCircle />
                  </div>
                  <p className="text-gray-500">No credit card required</p>
                </div>
              </div>
              <div className="py-5">
                <div className="flex items-center gap-x-3">
                  <div className="text-green-500">
                    <Icons.CheckCircle />
                  </div>
                  <p className="text-gray-500">Cancel anytime</p>
                </div>
              </div>
            </div>
          </div>
          {/* End Content */}

          {/* Features Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="flex flex-col gap-4 md:gap-8">
                <FeatureCard
                  title="Real-time Collaboration"
                  description="Work together with your team in real-time"
                  icon={
                    <div className="text-indigo-600">
                      <Icons.Users />
                    </div>
                  }
                  delay="delay-0"
                />
                <FeatureCard
                  title="Smart Automation"
                  description="Automate repetitive tasks and save time"
                  icon={
                    <div className="text-purple-600">
                      <Icons.Clock />
                    </div>
                  }
                  delay="delay-150"
                />
              </div>
              <div className="flex flex-col gap-4 md:gap-8 mt-10">
                <FeatureCard
                  title="Drag & Drop"
                  description="Intuitive task organization and management"
                  icon={
                    <div className="text-blue-600">
                      <Icons.Layout />
                    </div>
                  }
                  delay="delay-300"
                />
                <FeatureCard
                  title="Analytics"
                  description="Track progress with detailed insights"
                  icon={
                    <div className="text-teal-600">
                      <Icons.ChevronRight />
                    </div>
                  }
                  delay="delay-450"
                />
              </div>
            </div>
          </div>
          {/* End Features Grid */}
        </div>
      </div>
    </main>
  </div>
);

const FeatureCard = ({ title, description, icon, delay }) => (
  <div
    className={`group p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-sm hover:bg-white/80 transition duration-300 ${delay}`}
  >
    <div className="flex items-center gap-4">
      <div className="rounded-lg p-3 bg-white shadow-sm">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

export default WelcomePage;
