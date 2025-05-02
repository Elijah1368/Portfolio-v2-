"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
/**
 * Shapes text into a rough triangle/pyramid shape (longest line top).
 * @param {string} text The input text.
 * @param {number} numLines The desired number of lines.
 * @returns {string} The text formatted with newline characters.
 */
function shapeTextIntoTriangle(text = "", numLines = 5) {
  if (!text || typeof text !== "string") {
    return "";
  }

  const words = text.trim().split(/\s+/); // Split into words, handling multiple spaces
  const totalWords = words.length;

  if (totalWords === 0 || numLines <= 0) {
    return "";
  }
  if (numLines === 1) {
    return words.join(" "); // Return original text if only one line requested
  }
  if (numLines >= totalWords) {
    // If more lines requested than words, put each word on its own line
    return words.join("\n");
  }

  const lines = [];
  let wordIndex = 0;

  // Calculate the ideal number of words per line based on an arithmetic series
  // Sum = n/2 * (a_1 + a_n). We want lines lengths roughly proportional to (numLines - i)
  // Total elements in series: N = numLines
  // Sum of weights (N + (N-1) + ... + 1) = N * (N + 1) / 2
  const totalWeight = (numLines * (numLines + 1)) / 2;

  // Pre-calculate ideal word counts per line to avoid recalculating
  const idealCounts = [];
  let assignedWords = 0;
  for (let i = 0; i < numLines; i++) {
    // Weight for line i (0-indexed, decreasing length) is proportional to (numLines - i)
    const ideal = Math.round((totalWords * (numLines - i)) / totalWeight);
    idealCounts.push(ideal);
    assignedWords += ideal;
  }

  // Adjust counts slightly if rounding caused the total to be off
  let difference = totalWords - assignedWords;
  // Distribute difference somewhat evenly (e.g. add/subtract from middle lines)
  let adjustIndex = Math.floor(numLines / 2);
  while (difference !== 0) {
    const adjustment = difference > 0 ? 1 : -1;
    // Ensure count doesn't go below 1 (unless it's the very last line maybe)
    if (
      idealCounts[adjustIndex % numLines] + adjustment >= 1 ||
      numLines === 1
    ) {
      idealCounts[adjustIndex % numLines] += adjustment;
      difference -= adjustment;
    }
    adjustIndex++;
    // Safety break to prevent infinite loops if adjustment is impossible
    if (adjustIndex > numLines * 2) break;
  }

  // Assign words based on calculated counts
  for (let i = 0; i < numLines; i++) {
    const count = idealCounts[i];
    // Ensure we don't try to take more words than available
    const wordsToTake = Math.min(count, totalWords - wordIndex);

    if (wordsToTake <= 0 && wordIndex >= totalWords) {
      break; // Stop if no words left
    }

    // On the very last iteration, take all remaining words regardless of calculated count
    const actualWordsToTake =
      i === numLines - 1 ? totalWords - wordIndex : wordsToTake;

    const endIndex = wordIndex + actualWordsToTake;
    const lineWords = words.slice(wordIndex, endIndex);
    lines.push(lineWords.join(" "));
    wordIndex = endIndex;

    if (wordIndex >= totalWords) {
      break; // Stop if we've used all words
    }
  }

  // Join the lines with newline characters
  return lines.join("\n");
}
interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  link?: string;
}

const defaultExperiences: ExperienceItem[] = [
  {
    id: "exp1",
    company: "Qualcomm",
    position: "Fullstack Software Engineer",
    location: "Santa Clara, CA",
    startDate: "December 2023",
    endDate: "Present",
    description:
      "Supercharged an in-house Hardware Verification tool that serves 2,000+ engineers. Crushed performance bottlenecks with concurrent architecture using Motor and Redis, boosting data processing by 700%. Delivered key features representing 50% of functionality and modernized the codebase with Pydantic, Beanie ODM, TypeScript, Redux, and React Query. Accelerated development by migrating from CRA to Vite and implemented robust CI/CD with GitLab.",
    skills: [
      "Python",
      "TypeScript",
      "React",
      "Redux",
      "Redis",
      "CI/CD",
      "Vite",
    ],
    link: "https://qualcomm.com",
  },
  {
    id: "exp2",
    company: "Qualcomm",
    position: "Fullstack Software Engineer Intern",
    location: "Santa Clara, CA",
    startDate: "June 2022",
    endDate: "September 2022",
    description:
      "Built an internal access management platform that revolutionized the onboarding process by automating project access provisioning for new employees. Transformed UI designs into seamless experiences using React and Next.js.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    link: "https://qualcomm.com",
  },
  {
    id: "exp3",
    company: "University of Washington",
    position: "Research Assistant",
    location: "Seattle, WA",
    startDate: "November 2022",
    endDate: "March 2023",
    description:
      "Crafted an engaging landing page for the NIH's Morphic Project using React, creating a digital gateway for this important scientific initiative.",
    skills: ["React", "JavaScript", "UI Design"],
    link: "https://morphic.bio/",
  },
  {
    id: "exp4",
    company: "MCG Health",
    position: "Software Engineer Intern",
    location: "Seattle, WA",
    startDate: "July 2022",
    endDate: "September 2022",
    description:
      "Tackled complex legacy code challenges by migrating from jQuery 1.4 to 3.6, meticulously resolving breaking changes while conducting stress testing to uncover performance bottlenecks.",
    skills: ["jQuery", "JavaScript", "Performance Optimization", "Testing"],
    link: "https://www.mcg.com/",
  },
];

export function ExperienceSection({
  experiences = defaultExperiences,
}: {
  experiences?: ExperienceItem[];
}) {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div ref={sectionRef}>
      <motion.h2
        className="text-xl font-extrabold text-primary mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>

      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        A summary of my professional journey.
      </motion.p>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: isInView ? 0.2 + index * 0.1 : 0,
              duration: 0.5,
            }}
          >
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-[150px_1fr] p-4 -mx-4 rounded-lg transition-colors ",
                exp.link && "hover:bg-muted/50 cursor-pointer"
              )}
              onClick={() =>
                exp.link &&
                window.open(exp.link, "_blank", "noopener,noreferrer")
              }
            >
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground font-light">
                  {/* Mobile: inline with dash and space, Desktop: stacked vertically */}
                  <div className="flex flex-row md:flex-col">
                    <span>{exp.startDate} —</span>
                    <span className="ml-1 md:ml-0">{exp.endDate}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-x-2 gap-y-0 flex-wrap">
                    <h3 className="text-base font-bold text-primary">
                      {exp.position}
                    </h3>
                    <span className="text-muted-foreground font-light">at</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-primary/80">
                        {exp.company}
                      </span>
                      {exp.link && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground inline-block ml-1" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 font-light">
                    <MapPin className="h-3 w-3" />
                    <span>{exp.location}</span>
                  </div>
                </div>
                <p className="text-muted-foreground font-normal whitespace-normal clam">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2 min-h-[32px]">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="font-light">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
