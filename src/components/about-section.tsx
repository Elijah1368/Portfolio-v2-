"use client";
import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

// Define the SocialLink type
export type SocialLink = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
};

export default function AboutSection({
  title = "Software Engineer",
  socialLinks,
}: {
  title?: string;
  socialLinks: SocialLink[];
}) {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <div className="mx-auto py-8 md:pt-32 md:pr-24" ref={sectionRef}>
      {/* Mobile header */}
      <div className="md:hidden mb-16">
        <div className="mb-4">
          <h1 className="text-5xl sm:text-6xl font-thin text-muted-foreground -mx-1 tracking-tighter">
            {"ELIJAH AMIAN"}
          </h1>
          <span className="text-lg text-primary font-light">{title}</span>
        </div>
        <div className="flex gap-5 mt-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 hover:scale-110 ease-in-out"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5" />
              <span className="sr-only">{link.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* About section */}
      <section className="mb-12">
        <motion.h2
          className="text-2xl font-extralight mb-4 text-muted-foreground tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          ABOUT ME
        </motion.h2>

        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.p
            className="font-light text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Software engineer by day, cat whisperer by night. Always shipping.
          </motion.p>
          <motion.p
            className="text-primary font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            I'm Elijah, a software engineer at Qualcomm where I build tools that
            help hardware engineers do their best work. I enjoy the challenge of
            taking complex problems and turning them into elegant solutions.
            When I'm not writing code, you'll find me trying to convince my cat
            that 3 AM is not the optimal time to practice parkour across my
            apartment.
          </motion.p>

          <motion.p
            className="text-primary font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            With a CS degree from University of Washington and experience in
            both frontend and backend development, I work on creating tools that
            make meaningful improvements to how engineers interact with data. My
            technical toolkit includes React, TypeScript, Python, and a growing
            collection of cat toys that are inexplicably ignored in favor of
            empty cardboard boxes.
          </motion.p>
          <motion.p
            className="text-primary font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            I believe in shipping code that solves real problems, iterating
            quickly, and learning constantly. Whether I'm optimizing database
            queries, modernizing frontends, or figuring out why the neighborhood
            strays have unanimously elected my parking spot as their official
            meeting grounds, I'm drawn to puzzles that matter and solutions that
            endure.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
