"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
    <section
      className="py-16 px-4 md:px-6 lg:px-8 bg-background"
      id="experience"
      ref={sectionRef}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-12"
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
                  "grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 p-4 -mx-4 rounded-lg transition-colors",
                  exp.link && "hover:bg-muted/50 cursor-pointer"
                )}
                onClick={() =>
                  exp.link &&
                  window.open(exp.link, "_blank", "noopener,noreferrer")
                }
              >
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    {exp.startDate} — {exp.endDate}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-medium">{exp.position}</h3>
                      <span className="text-muted-foreground">at</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{exp.company}</span>
                        {exp.link && (
                          <ExternalLink className="h-3 w-3 text-muted-foreground inline-block ml-1" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {index < experiences.length - 1 && (
                <Separator className="mt-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
