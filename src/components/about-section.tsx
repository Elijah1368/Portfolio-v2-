// components/sections/AboutSection.jsx
import React from "react";

const AboutSection = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg">
        I'm a passionate web developer with experience in React and Next.js.
      </p>
      <p className="mt-4">
        With over 5 years of experience in the field, I've worked on a variety
        of projects ranging from small business websites to large-scale
        enterprise applications. My expertise includes:
      </p>
      <ul className="list-disc pl-5 mt-2">
        <li>Front-end development with React, Next.js, and TypeScript</li>
        <li>Back-end development with Node.js and Express</li>
        <li>Database design and management with MongoDB and PostgreSQL</li>
        <li>Cloud deployment and DevOps with AWS and Docker</li>
      </ul>
    </>
  );
};

export default AboutSection;
