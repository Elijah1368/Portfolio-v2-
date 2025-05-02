// components/sections/ContactSection.jsx
import React from "react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen pt-20 pb-20 scroll-mt-14 lg:scroll-mt-[60px]"
    >
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <p className="text-lg mb-4">
        Feel free to reach out if you'd like to collaborate or have any
        questions!
      </p>
      <div className="space-y-2">
        <p>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p>
          <strong>LinkedIn:</strong> linkedin.com/in/johndoe
        </p>
        <p>
          <strong>GitHub:</strong> github.com/johndoe
        </p>
      </div>
      <form className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </section>
  );
};

export default ContactSection;
