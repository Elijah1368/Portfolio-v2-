"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import * as React from "react";

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
      "At Qualcomm's NuviaCPU team (a startup they acquired), I helped replace expensive third-party verification software, eliminating $2M in annual costs. I engineered a concurrent architecture that improved data processing speeds by 700% for our 5M+ daily records, while developing half the tool's core functionality that supported projects like the Snapdragon X Elite processor. I also modernized our tech stack with Pydantic/Motor and Vite/TypeScript, implemented a GitLab pipeline that enabled daily releases instead of weekly ones. Working with this former startup team gave me valuable experience in developing sotware for engineers.",
    skills: [
      "Python",
      "MongoDB",
      "RabbitMQ",
      "Kubernetes",
      "Docker",
      "Distributed Systems",
      "TypeScript",
      "React",
      "CI/CD",
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
      "Our team needed an internal access management platform, so I took on the implementation challenge. I developed a solution that enabled managers to automate project access provisioning for new employees, significantly reducing onboarding time. The platform transformed a tedious manual process into a streamlined workflow, allowing new team members to become productive immediately rather than waiting days for proper access. This tool quickly became essential to our organization's efficiency.",
    skills: [
      "Python",
      "MongoDB",
      "Kubernetes",
      "Docker",
      "TypeScript",
      "React",
    ],
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
      "When the NIH's Morphic Project needed a digital presence, I had the opportunity to build their landing page from scratch. The page served as a digital gateway to this important initiative, making complex research accessible to both the scientific community and curious visitors.",
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
    skills: ["jQuery", "JavaScript", "Testing"],
    link: "https://www.mcg.com/",
  },
];

export function ExperienceSection({
  experiences = defaultExperiences,
}: {
  experiences?: ExperienceItem[];
}) {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isMicrosoftEdge, setIsMicrosoftEdge] = React.useState(false);

  React.useEffect(() => {
    // Check if the browser is Edge
    const isEdge = navigator.userAgent.includes("Edg");
    setIsMicrosoftEdge(isEdge);
  }, []);

  // Apply different classes based on browser detection
  const textClass = isMicrosoftEdge ? "text-xs" : "text-sm";
  return (
    <div ref={sectionRef} className="mx-auto py-8 md:pt-32">
      <motion.h2
        className="text-2xl font-extralight mb-4 text-muted-foreground tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        EXPERIENCE
      </motion.h2>

      <motion.p
        className="text-primary font-light mb-8"
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
                <div
                  className={cn(
                    "text-muted-foreground font-light tracking-wider",
                    textClass
                  )}
                >
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
                    <h3 className="text-base font-semibold text-primary">
                      {exp.position}
                    </h3>
                    <span className="text-muted-foreground font-light">at</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-primary">
                        {exp.company}
                      </span>
                      {exp.link && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground inline-block ml-1" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 font-light tracking-wider">
                    <MapPin className="h-3 w-3" />
                    <span>{exp.location}</span>
                  </div>
                </div>
                <p className="text-primary font-light whitespace-normal">
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
