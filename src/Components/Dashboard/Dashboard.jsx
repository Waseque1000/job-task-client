import React from "react";
import { Users, TrendingUp, PieChart, Settings } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for the chart
const data = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 900 },
  { name: "Apr", users: 1200 },
  { name: "May", users: 1500 },
  { name: "Jun", users: 1800 },
];

// Reusable Card Component
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

// Sidebar Navigation Component
const Sidebar = () => (
  <aside className="w-64 bg-white shadow-lg">
    <nav className="px-6 py-8 space-y-4">
      <a
        href="#"
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
      >
        <Users className="w-6 h-6 mr-3" /> Overview
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
      >
        <TrendingUp className="w-6 h-6 mr-3" /> Analytics
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
      >
        <PieChart className="w-6 h-6 mr-3" /> Reports
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded"
      >
        <Settings className="w-6 h-6 mr-3" /> Settings
      </a>
    </nav>
  </aside>
);

// Header Component
const Header = () => (
  <header className="bg-white shadow-lg sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-4xl font-bold text-indigo-700">DeepSeek Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-indigo-600">
          Notifications
        </button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Profile
        </button>
      </div>
    </div>
  </header>
);

// Main Content Component
const MainContent = () => (
  <main className="flex-1 p-6">
    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

    {/* Overview Chart Section */}
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

// Dashboard Component
const Dashboard = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white">
    <Header />
    <div className="flex flex-1">
      <Sidebar />
      <MainContent />
    </div>
  </div>
);

export default Dashboard;
