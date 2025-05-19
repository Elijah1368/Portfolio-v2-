"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageQuery: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
}

const defaultProjects: Project[] = [
  {
    id: "ecommerce",
    title: "Morphic Program Website",
    description:
      "A web platform for the National Institute of Health’s Morphic program",
    technologies: ["React", "Javascript", "UI Design"],
    imageUrl: "Morphic.png",
    imageQuery: "Morphic Porgram web platform",
    demoUrl: "https://morphic.bio/",
    githubUrl: "https://github.com/Elijah1368/MorphicConsortium",
  },
  {
    id: "weather",
    title: "Ninja Frog",
    description: "2D platformer game made in pure javascript",
    technologies: ["Javascript", "HTML", "CSS"],
    imageUrl: "NinjaFrog.png",
    imageQuery: "platformer game with a ninja frog",
    demoUrl: "https://elijah1368.github.io/Ninja-Frog/",
    githubUrl: "https://github.com/Elijah1368/Ninja-Frog",
  },
  {
    id: "task",
    title: "Portfolio (v2)",
    description:
      "Old portfolio I made that’s heavily inspired by macOS desktop theme",
    imageUrl: "Portfolio.png",
    technologies: ["React", "Javascript", "UI Design"],
    imageQuery: "Software engineer portfolio",
    demoUrl: "https://elijah1368.github.io/PersonalPortfolio/",
    githubUrl: "https://github.com/Elijah1368/PersonalPortfolio",
  },
];

export default function ProjectsSection({
  projects = defaultProjects,
}: {
  projects?: Project[];
}) {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div className="mx-auto py-8 md:pt-32" ref={sectionRef}>
      <motion.h2
        className="text-2xl font-extralight mb-4 text-muted-foreground tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        MY PROJECTS
      </motion.h2>

      <motion.p
        className="text-primary font-light mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        A selection of my work and personal projects.
      </motion.p>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-[150px_1fr_auto] p-4 -mx-4 rounded-lg transition-colors",
                project.demoUrl && "hover:bg-muted/50 cursor-pointer"
              )}
              onClick={() =>
                project.demoUrl &&
                window.open(project.demoUrl, "_blank", "noopener,noreferrer")
              }
            >
              {/* Project Image */}
              <div className="relative aspect-video md:aspect-square rounded-md overflow-hidden md:w-[110px] xs:w-full ">
                <Image
                  src={`/${project.imageUrl}?height=400&width=400&query=${project.imageQuery}`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>

              {/* Project Content */}
              <div className="space-y-4 md:pt-0 pt-8">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-primary">
                      {project.title}
                    </h3>
                    {project.demoUrl && (
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground inline-block ml-1" />
                    )}
                  </div>
                </div>

                <p className="text-primary font-light whitespace-normal">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="font-normal">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* GitHub Link */}
              {/* {project.githubUrl && (
                <div className="flex items-start justify-end">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                    <span className="hidden md:inline">View Code</span>
                  </a>
                </div>
              )} */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
