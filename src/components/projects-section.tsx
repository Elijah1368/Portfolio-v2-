// components/sections/ProjectsSection.jsx
import React from "react";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="min-h-screen pt-20 scroll-mt-14 lg:scroll-mt-[60px]"
    >
      <h2 className="text-3xl font-bold mb-4">My Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">E-commerce Website</h3>
          <p>
            A full-featured online store built with Next.js and Stripe
            integration.
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Weather App</h3>
          <p>
            A responsive weather application using React and the OpenWeatherMap
            API.
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Task Management System</h3>
          <p>
            A collaborative project management tool built with React and
            Node.js.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
