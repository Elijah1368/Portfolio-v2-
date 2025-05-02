// components/sections/HomeSection.jsx
import React from "react";

const HomeSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen pt-20 scroll-mt-14 lg:scroll-mt-[60px]"
    >
      <h2 className="text-3xl font-bold mb-4">Welcome to My Portfolio</h2>
      <p className="text-lg">
        Here you can find information about my work and skills.
      </p>
    </section>
  );
};

export default HomeSection;