// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaArrowAltCircleDown, FaBrain, FaCheckCircle } from "react-icons/fa";
// import { FaBraille } from "react-icons/fa";
// import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
// import { FaRegUser } from "react-icons/fa";
// import { Moon, Sun } from "lucide-react"; // For dark mode toggle icons

// const WelcomePage = () => {
//   const [step, setStep] = useState("welcome"); // "welcome" or "login"
//   const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.classList.toggle("dark", !isDarkMode);
//   };

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br ${
//         isDarkMode
//           ? "from-gray-900 via-gray-800 to-gray-900"
//           : "from-indigo-50 via-white to-purple-50"
//       }`}
//     >
//       {/* Dark Mode Toggle Button */}
//       <button
//         onClick={toggleDarkMode}
//         className="fixed top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-lg shadow-lg hover:bg-white transition-colors dark:bg-gray-800/80 dark:hover:bg-gray-700"
//       >
//         {isDarkMode ? (
//           <Sun className="text-yellow-500" size={20} />
//         ) : (
//           <Moon className="text-gray-700" size={20} />
//         )}
//       </button>

//       {step === "welcome" ? (
//         <WelcomeScreen
//           onGetStarted={() => setStep("login")}
//           isDarkMode={isDarkMode}
//         />
//       ) : (
//         <LoginScreen onBack={() => setStep("welcome")} />
//       )}
//     </div>
//   );
// };

// const WelcomeScreen = ({ onGetStarted, isDarkMode }) => (
//   <div className="container mx-auto px-4">
//     <main className="py-20">
//       <div className="max-w-[85rem] mx-auto">
//         <div className="grid md:grid-cols-2 gap-12 md:gap-16 xl:gap-20 items-center">
//           {/* Content */}
//           <div>
//             <div className="relative mb-4">
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold ${
//                     isDarkMode
//                       ? "bg-indigo-900 text-indigo-200"
//                       : "bg-indigo-100 text-indigo-800"
//                   }`}
//                 >
//                   New Feature
//                 </span>
//                 <span
//                   className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold ${
//                     isDarkMode
//                       ? "bg-purple-900 text-purple-200"
//                       : "bg-purple-100 text-purple-800"
//                   }`}
//                 >
//                   AI-Powered
//                 </span>
//               </div>
//             </div>

//             <h1
//               className={`block text-4xl font-bold ${
//                 isDarkMode ? "text-gray-200" : "text-gray-800"
//               } md:text-5xl lg:text-6xl`}
//             >
//               Manage tasks with
//               <span className="text-indigo-600"> intelligence</span>
//             </h1>

//             <p
//               className={`mt-4 text-lg ${
//                 isDarkMode ? "text-gray-400" : "text-gray-600"
//               }`}
//             >
//               Experience the future of task management. Streamline your
//               workflow, collaborate seamlessly, and achieve more with our
//               intuitive platform.
//             </p>

//             <div className="mt-8 grid gap-3 w-full sm:inline-flex">
//               <button
//                 className={`inline-flex justify-center items-center gap-x-3 text-center ${
//                   isDarkMode
//                     ? "bg-indigo-700 hover:bg-indigo-600"
//                     : "bg-indigo-600 hover:bg-indigo-700"
//                 } text-white text-sm font-medium rounded-lg hover:shadow-lg px-6 py-3`}
//               >
//                 <Link to="/task">Get started</Link>
//                 <FaArrowAltCircleDown />
//               </button>
//               <button
//                 className={`inline-flex justify-center items-center gap-x-3 text-center border ${
//                   isDarkMode
//                     ? "border-gray-700 hover:border-gray-600"
//                     : "border-gray-300 hover:border-gray-400"
//                 } shadow-sm text-sm font-medium rounded-lg px-6 py-3 ${
//                   isDarkMode ? "text-gray-200" : "text-gray-800"
//                 }`}
//               >
//                 <Link to="/task">Take the tour</Link>
//               </button>
//             </div>

//             <div className="mt-6 lg:mt-10 grid grid-cols-2 gap-x-5">
//               <div className="py-5">
//                 <div className="flex items-center gap-x-3">
//                   <div className="text-green-500">
//                     <FaCheckCircle />
//                   </div>
//                   <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
//                     No credit card required
//                   </p>
//                 </div>
//               </div>
//               <div className="py-5">
//                 <div className="flex items-center gap-x-3">
//                   <div className="text-green-500">
//                     <FaCheckCircle />
//                   </div>
//                   <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
//                     Cancel anytime
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* End Content */}

//           {/* Features Grid */}
//           <div className="relative">
//             <div className="grid grid-cols-2 gap-4 md:gap-8">
//               <div className="flex flex-col gap-4 md:gap-8">
//                 <FeatureCard
//                   title="AI-Powered Insights"
//                   description="Get actionable insights to optimize your workflow"
//                   icon={
//                     <div className="text-indigo-600">
//                       <FaBrain />
//                     </div>
//                   }
//                   delay="delay-0"
//                   isDarkMode={isDarkMode}
//                 />
//                 <FeatureCard
//                   title="Smart Automation"
//                   description="Automate repetitive tasks and save time"
//                   icon={
//                     <div className="text-purple-600">
//                       <FaBraille />
//                     </div>
//                   }
//                   delay="delay-150"
//                   isDarkMode={isDarkMode}
//                 />
//               </div>
//               <div className="flex flex-col gap-4 md:gap-8 mt-10">
//                 <FeatureCard
//                   title="Drag & Drop"
//                   description="Intuitive task organization and management"
//                   icon={
//                     <div className="text-blue-600">
//                       <RiCheckboxMultipleBlankLine />
//                     </div>
//                   }
//                   delay="delay-300"
//                   isDarkMode={isDarkMode}
//                 />
//                 <FeatureCard
//                   title="Real-time Collaboration"
//                   description="Work together with your team in real-time"
//                   icon={
//                     <div className="text-teal-600">
//                       <FaRegUser />
//                     </div>
//                   }
//                   delay="delay-450"
//                   isDarkMode={isDarkMode}
//                 />
//               </div>
//             </div>
//           </div>
//           {/* End Features Grid */}
//         </div>
//       </div>
//     </main>
//   </div>
// );

// const FeatureCard = ({ title, description, icon, delay, isDarkMode }) => (
//   <div
//     className={`group p-6 ${
//       isDarkMode ? "bg-gray-800/60" : "bg-white/60"
//     } backdrop-blur-lg rounded-2xl shadow-sm hover:${
//       isDarkMode ? "bg-gray-800/80" : "bg-white/80"
//     } transition duration-300 ${delay}`}
//   >
//     <div className="flex items-center gap-4">
//       <div
//         className={`rounded-lg p-3 ${
//           isDarkMode ? "bg-gray-700" : "bg-white"
//         } shadow-sm`}
//       >
//         {icon}
//       </div>
//       <div>
//         <h3
//           className={`text-lg font-semibold ${
//             isDarkMode ? "text-gray-200" : "text-gray-800"
//           }`}
//         >
//           {title}
//         </h3>
//         <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
//           {description}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// export default WelcomePage;

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleDown, FaBrain, FaCheckCircle } from "react-icons/fa";
import { FaBraille } from "react-icons/fa";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Moon, Sun } from "lucide-react"; // For dark mode toggle icons

const WelcomePage = () => {
  const [step, setStep] = useState("welcome"); // "welcome" or "login"
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDarkMode
          ? "from-gray-900 via-gray-800 to-gray-900"
          : "from-indigo-50 via-white to-purple-50"
      }`}
    >
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-lg shadow-lg hover:bg-white transition-colors dark:bg-gray-800/80 dark:hover:bg-gray-700"
      >
        {isDarkMode ? (
          <Sun className="text-yellow-500" size={20} />
        ) : (
          <Moon className="text-gray-700" size={20} />
        )}
      </button>

      {step === "welcome" ? (
        <WelcomeScreen
          onGetStarted={() => setStep("login")}
          isDarkMode={isDarkMode}
        />
      ) : (
        <LoginScreen onBack={() => setStep("welcome")} />
      )}
    </div>
  );
};

const WelcomeScreen = ({ onGetStarted, isDarkMode }) => (
  <div className="container mx-auto px-4">
    <main className="py-10 md:py-20">
      <div className="max-w-[85rem] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 xl:gap-20 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <div className="relative mb-4">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold ${
                    isDarkMode
                      ? "bg-indigo-900 text-indigo-200"
                      : "bg-indigo-100 text-indigo-800"
                  }`}
                >
                  New Feature
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold ${
                    isDarkMode
                      ? "bg-purple-900 text-purple-200"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  AI-Powered
                </span>
              </div>
            </div>

            <h1
              className={`block text-3xl font-bold ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              } md:text-4xl lg:text-5xl xl:text-6xl`}
            >
              Manage tasks with
              <span className="text-indigo-600"> intelligence</span>
            </h1>

            <p
              className={`mt-3 text-base ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } md:text-lg`}
            >
              Experience the future of task management. Streamline your
              workflow, collaborate seamlessly, and achieve more with our
              intuitive platform.
            </p>

            <div className="mt-6 grid gap-3 w-full sm:inline-flex">
              <button
                className={`inline-flex justify-center items-center gap-x-3 text-center ${
                  isDarkMode
                    ? "bg-indigo-700 hover:bg-indigo-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white text-sm font-medium rounded-lg hover:shadow-lg px-4 py-2 md:px-6 md:py-3`}
              >
                <Link to="/task">Get started</Link>
                <FaArrowAltCircleDown />
              </button>
              <button
                className={`inline-flex justify-center items-center gap-x-3 text-center border ${
                  isDarkMode
                    ? "border-gray-700 hover:border-gray-600"
                    : "border-gray-300 hover:border-gray-400"
                } shadow-sm text-sm font-medium rounded-lg px-4 py-2 md:px-6 md:py-3 ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                <Link to="/task">Take the tour</Link>
              </button>
            </div>

            <div className="mt-6 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
              <div className="py-3 sm:py-5">
                <div className="flex items-center gap-x-3">
                  <div className="text-green-500">
                    <FaCheckCircle />
                  </div>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    No credit card required
                  </p>
                </div>
              </div>
              <div className="py-3 sm:py-5">
                <div className="flex items-center gap-x-3">
                  <div className="text-green-500">
                    <FaCheckCircle />
                  </div>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    Cancel anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* End Content */}

          {/* Features Grid */}
          <div className="order-1 md:order-2 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                <FeatureCard
                  title="AI-Powered Insights"
                  description="Get actionable insights to optimize your workflow"
                  icon={
                    <div className="text-indigo-600">
                      <FaBrain />
                    </div>
                  }
                  delay="delay-0"
                  isDarkMode={isDarkMode}
                />
                <FeatureCard
                  title="Smart Automation"
                  description="Automate repetitive tasks and save time"
                  icon={
                    <div className="text-purple-600">
                      <FaBraille />
                    </div>
                  }
                  delay="delay-150"
                  isDarkMode={isDarkMode}
                />
              </div>
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 mt-6 sm:mt-10">
                <FeatureCard
                  title="Drag & Drop"
                  description="Intuitive task organization and management"
                  icon={
                    <div className="text-blue-600">
                      <RiCheckboxMultipleBlankLine />
                    </div>
                  }
                  delay="delay-300"
                  isDarkMode={isDarkMode}
                />
                <FeatureCard
                  title="Real-time Collaboration"
                  description="Work together with your team in real-time"
                  icon={
                    <div className="text-teal-600">
                      <FaRegUser />
                    </div>
                  }
                  delay="delay-450"
                  isDarkMode={isDarkMode}
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

const FeatureCard = ({ title, description, icon, delay, isDarkMode }) => (
  <div
    className={`group p-4 ${
      isDarkMode ? "bg-gray-800/60" : "bg-white/60"
    } backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-sm hover:${
      isDarkMode ? "bg-gray-800/80" : "bg-white/80"
    } transition duration-300 ${delay}`}
  >
    <div className="flex items-center gap-3 sm:gap-4">
      <div
        className={`rounded-lg p-2 sm:p-3 ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        } shadow-sm`}
      >
        {icon}
      </div>
      <div>
        <h3
          className={`text-base sm:text-lg font-semibold ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default WelcomePage;
