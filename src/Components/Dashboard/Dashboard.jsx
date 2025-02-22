// import React from "react";
// import { Users, TrendingUp, PieChart, Settings } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // Sample data for the chart
// const data = [
//   { name: "Jan", users: 400 },
//   { name: "Feb", users: 600 },
//   { name: "Mar", users: 900 },
//   { name: "Apr", users: 1200 },
//   { name: "May", users: 1500 },
//   { name: "Jun", users: 1800 },
// ];

// // Reusable Card Component
// const SummaryCard = ({ icon: Icon, title, value, color }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
//     <div className="flex items-center">
//       <div className={`bg-${color}-100 p-3 rounded-full`}>
//         <Icon className={`w-6 h-6 text-${color}-600`} />
//       </div>
//       <div className="ml-4">
//         <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//         <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// // Sidebar Navigation Component
// const Sidebar = () => (
//   <aside className="w-64 bg-white shadow-lg">
//     <nav className="px-6 py-8 space-y-4">
//       <a
//         href="#"
//         className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
//       >
//         <Users className="w-6 h-6 mr-3" /> Overview
//       </a>
//       <a
//         href="#"
//         className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
//       >
//         <TrendingUp className="w-6 h-6 mr-3" /> Analytics
//       </a>
//       <a
//         href="#"
//         className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
//       >
//         <PieChart className="w-6 h-6 mr-3" /> Reports
//       </a>
//       <a
//         href="#"
//         className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
//       >
//         <Settings className="w-6 h-6 mr-3" /> Settings
//       </a>
//     </nav>
//   </aside>
// );

// // Header Component
// const Header = () => (
//   <header className="bg-white shadow-lg sticky top-0 z-10"></header>
// );

// // Main Content Component
// const MainContent = () => (
//   <main className="flex-1 p-6">
//     {/* Summary Cards */}
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       <SummaryCard
//         icon={Users}
//         title="Total Users"
//         value="1,234"
//         color="indigo"
//       />
//       <SummaryCard
//         icon={TrendingUp}
//         title="Active Sessions"
//         value="567"
//         color="green"
//       />
//       <SummaryCard
//         icon={PieChart}
//         title="Conversion Rate"
//         value="78%"
//         color="yellow"
//       />
//     </div>

//     {/* Overview Chart Section */}
//     <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">
//         User Growth Over Time
//       </h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="users"
//             stroke="#6366F1"
//             strokeWidth={3}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   </main>
// );

// // Dashboard Component
// const Dashboard = () => (
//   <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white">
//     <Header />
//     <div className="flex flex-1">
//       <Sidebar />
//       <MainContent />
//     </div>
//   </div>
// );

// export default Dashboard;

import React, { useState } from "react";
import { Users, TrendingUp, PieChart, Settings, Menu } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 900 },
  { name: "Apr", users: 1200 },
  { name: "May", users: 1500 },
  { name: "Jun", users: 1800 },
];

const SummaryCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
    <div className="flex items-center">
      <div className={`bg-${color}-100 p-3 rounded-full`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div className="ml-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <aside
    className={`bg-white shadow-lg fixed md:relative h-full md:w-64 p-6 transition-transform transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 md:block`}
  >
    <button
      className="md:hidden mb-4 p-2 text-gray-700 focus:outline-none"
      onClick={toggleSidebar}
    >
      ✕
    </button>
    <nav className="space-y-4">
      <a
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
        href="#"
      >
        <Users className="w-6 h-6 mr-3" /> Overview
      </a>
      <a
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
        href="#"
      >
        <TrendingUp className="w-6 h-6 mr-3" /> Analytics
      </a>
      <a
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
        href="#"
      >
        <PieChart className="w-6 h-6 mr-3" /> Reports
      </a>
      <a
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
        href="#"
      >
        <Settings className="w-6 h-6 mr-3" /> Settings
      </a>
    </nav>
  </aside>
);

const Header = ({ toggleSidebar }) => (
  <header className="bg-white shadow-lg p-4 flex items-center justify-between sticky top-0 z-10 md:hidden">
    <button className="p-2 text-gray-700" onClick={toggleSidebar}>
      <Menu className="w-6 h-6" />
    </button>
    <h1 className="text-lg font-bold">Dashboard</h1>
  </header>
);

const MainContent = () => (
  <main className="flex-1 p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <SummaryCard
        icon={Users}
        title="Total Users"
        value="1,234"
        color="indigo"
      />
      <SummaryCard
        icon={TrendingUp}
        title="Active Sessions"
        value="567"
        color="green"
      />
      <SummaryCard
        icon={PieChart}
        title="Conversion Rate"
        value="78%"
        color="yellow"
      />
    </div>
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        User Growth Over Time
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#6366F1"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </main>
);

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
