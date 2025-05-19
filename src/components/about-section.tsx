"use client";
import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";

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
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -150px 0px", // Trigger animations earlier for gentler appearance
  });

  // Define animation variants with gentler transitions
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Reduced stagger time for gentler sequence
        delayChildren: 0.1,
        ease: "easeInOut",
        duration: 0.8, // Longer duration for smoother transition
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 }, // Reduced y-offset for subtler movement
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9, // Longer duration
        ease: [0.1, 0.4, 0.2, 1], // Very gentle cubic-bezier curve
      },
    },
  };

  const socialLinkVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 }, // Less scale change
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + custom * 0.07, // Gentler delay between items
        duration: 0.7, // Longer duration
        ease: "easeInOut", // Smoother easing
      },
    }),
  };

  return (
    <div className="mx-auto py-8 md:pt-32 md:pr-32 " ref={sectionRef}>
      {/* Mobile header */}
      <motion.div
        className="md:hidden mb-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h1
          className="text-5xl sm:text-6xl font-thin text-muted-foreground -mx-1 tracking-tighter"
          initial={{ opacity: 0, x: -3 }} // Reduced x-offset
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -3 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }}
        >
          {"ELIJAH AMIAN"}
        </motion.h1>
        <motion.span
          className="text-lg text-primary font-light tracking-wider"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        >
          {title}
        </motion.span>

        <div className="flex gap-5 mt-8">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-500 hover:scale-105 ease-in-out" // Gentler hover scale
              aria-label={link.name}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={socialLinkVariants}
              custom={index}
              whileHover={{ scale: 1.08, transition: { duration: 0.3 } }} // Subtler hover effect
            >
              <link.icon className="h-5 w-5" />
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* About section */}
      <section className="mb-12">
        <motion.h2
          className="text-2xl font-extralight mb-4 text-muted-foreground tracking-tighter"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          ABOUT ME
        </motion.h2>

        <motion.div
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p className="font-light text-primary" variants={itemVariants}>
            Software engineer by day, cat whisperer by night. Always shipping.
          </motion.p>
          <motion.p className="text-primary font-light" variants={itemVariants}>
            I'm Elijah, a software engineer at Qualcomm where I build tools that
            help hardware engineers do their best work. When I'm not writing
            code, you'll find me trying to convince my cat that 3 AM is not the
            optimal time to practice its Olympic-level parkour routine,
            especially when my face is part of the obstacle course.
          </motion.p>

          <motion.p className="text-primary font-light" variants={itemVariants}>
            With a CS degree from University of Washington and experience in
            both frontend and backend development, I work on creating tools that
            make meaningful improvements to how engineers interact with data. My
            technical toolkit includes React, TypeScript, Python, and a growing
            collection of cat toys that are inexplicably ignored in favor of
            empty cardboard boxes.
          </motion.p>
          <motion.p className="text-primary font-light" variants={itemVariants}>
            I ship code that solves real problems, iterate quickly, and never
            stop learning. Whether optimizing databases or building intuitive
            frontends, I'm driven by making things better. The satisfaction
            comes from solving tough puzzles and creating resilient solutions.
            After all, good engineering and caring for a cat require the same
            skills: consistent maintenance, responding to unpredictable demands,
            and accepting that no matter how well you plan, there will always be
            unexpected 3AM wake-up calls.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
