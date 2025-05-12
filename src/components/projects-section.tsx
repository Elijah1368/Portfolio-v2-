"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageQuery: string;
  demoUrl?: string;
  githubUrl?: string;
}

const defaultProjects: Project[] = [
  {
    id: "ecommerce",
    title: "E-commerce Website",
    description:
      "A full-featured online store built with Next.js and Stripe integration. Includes product catalog, shopping cart, user authentication, and payment processing. The admin dashboard allows for easy product management and order tracking.",
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "Prisma"],
    imageQuery: "minimal e-commerce website design",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "weather",
    title: "Weather App",
    description:
      "A responsive weather application using React and the OpenWeatherMap API. Features include current weather conditions, 5-day forecast, location search, and automatic geolocation. The UI adapts to weather conditions with dynamic backgrounds and icons.",
    technologies: ["React", "OpenWeatherMap API", "CSS Modules"],
    imageQuery: "minimal weather app interface",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "task",
    title: "Task Management System",
    description:
      "A collaborative project management tool built with React and Node.js. Includes features like task assignment, due dates, priority levels, and real-time updates. Teams can organize tasks into projects and track progress with customizable dashboards.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    imageQuery: "minimal task management dashboard",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export default function ProjectsSection({
  projects = defaultProjects,
}: {
  projects?: Project[];
}) {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div className="max-w-4xl mx-auto" ref={sectionRef}>
      <motion.h2
        className="text-xl font-extrabold text-primary mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>

      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        A selection of my recent work and personal projects.
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
                  src={`/abstract-geometric-shapes.png?height=400&width=400&query=${project.imageQuery}`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>

              {/* Project Content */}
              <div className="space-y-4 md:pt-0 pt-8">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-primary">{project.title}</h3>
                    {project.demoUrl && (
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground inline-block ml-1" />
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground">{project.description}</p>

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
