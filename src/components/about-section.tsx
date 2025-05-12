"use client";
import * as React from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div className="max-w-4xl mx-auto " ref={sectionRef}>
      <motion.h2
        className="text-2xl font-light mb-2 text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        ABOUT ME
      </motion.h2>
      <motion.p
        className="mb-8 text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Software engineer by day, cat whisperer by night. Always shipping.
      </motion.p>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.p
          className="text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          I'm Elijah, a software engineer at Qualcomm where I build tools that
          help hardware engineers do their best work. I enjoy the challenge of
          taking complex problems and turning them into elegant solutions. When
          I'm not writing code, you'll find me trying to convince my cat that 3
          AM is not the optimal time to practice parkour across my apartment.
        </motion.p>

        <motion.p
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          With a CS degree from University of Washington and experience in both
          frontend and backend development, I work on creating tools that make
          meaningful improvements to how engineers interact with data. My
          technical toolkit includes React, TypeScript, Python, and a growing
          collection of cat toys that are inexplicably ignored in favor of empty
          cardboard boxes.
        </motion.p>

        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          I believe in shipping code that solves real problems, iterating
          quickly, and learning constantly. Whether I'm optimizing database
          queries, modernizing frontends, or figuring out why the neighborhood
          strays have unanimously elected my my parking spot as their official
          meeting grounds, I'm drawn to puzzles that matter and solutions that
          endure.
        </motion.p>
      </motion.div>
    </div>
  );
}
