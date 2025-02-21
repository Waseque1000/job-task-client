import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to TaskFlow
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Organize your tasks efficiently and boost your productivity. Drag,
          drop, and manage your tasks seamlessly.
        </p>
        <a
          href="/task"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
