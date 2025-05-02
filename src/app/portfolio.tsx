"use client";

import * as React from "react";
import {
  Award,
  Briefcase,
  GalleryVerticalEnd,
  Home,
  Mail,
  Menu,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";

// Assuming these are defined elsewhere in your code
const sections = [
  { id: "home", title: "Home", icon: Home },
  { id: "about", title: "About", icon: User },
  { id: "experience", title: "Experience", icon: Award },
  { id: "projects", title: "Projects", icon: Briefcase },
  { id: "contact", title: "Contact", icon: Mail },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = React.useState("home");

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px", // Less restrictive margin
      threshold: 0.3, // Require 30% of the element to be visible
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry with the highest intersection ratio
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Sort by intersection ratio to get the most visible section
        const mostVisible = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        // Set the active section
        if (mostVisible && mostVisible.target.id) {
          setActiveSection(mostVisible.target.id);
          console.log("Setting active section to:", mostVisible.target.id); // Debug log
        }
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
        console.log("Observing section:", section.id); // Debug log
      } else {
        console.warn("Section element not found:", section.id); // Debug warning
      }
    });

    return () => {
      observer.disconnect(); // Simpler cleanup
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center w-full bg-background">
      {/* Max-width container to center the entire layout */}
      <div className="w-full max-w-4xl relative">
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <Sidebar
              variant="floating"
              className="left-[var(--sidebar-offset)] md:left-[var(--sidebar-offset)]"
            >
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold">John Doe</span>
                        <span className="text-xs">Web Developer</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {sections.map((section) => (
                    <SidebarMenuItem key={section.id}>
                      <SidebarMenuButton
                        isActive={activeSection === section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          scrollToSection(section.id);
                        }}
                      >
                        <section.icon className="mr-2 h-4 w-4" />
                        <span>{section.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>

            <main>
              <header className="sticky top-0 z-10 flex h-14 items-center bg-background px-4 lg:h-[60px]">
                <SidebarTrigger className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle sidebar</span>
                </SidebarTrigger>
                <h1 className="text-lg font-semibold">
                  {
                    sections.find((s) => {
                      console.log(activeSection);
                      console.debug("id", s.id);
                      return s.id === activeSection;
                    })?.title
                  }
                </h1>
              </header>

              <div className="px-4 pb-20">
                <section
                  id="home"
                  key="home"
                  className="min-h-screen pt-20 scroll-mt-14 lg:scroll-mt-[60px]"
                >
                  <HomeSection />
                </section>
                <section
                  id="about"
                  key="about"
                  className="min-h-screen pt-20 scroll-mt-14 lg:scroll-mt-[60px]"
                >
                  <AboutSection />
                </section>
                <section
                  className="min-h-screen pt-20 scroll-mt-14 lg:scroll-mt-[60px]"
                  id="experience"
                  key="experience"
                  data-section="experience"
                >
                  <ExperienceSection />
                </section>
                <section
                  id="projects"
                  className="min-h-screen pt-20 scroll-mt-14 lg:scroll-mt-[60px]"
                >
                  <ProjectsSection />
                </section>
                <section
                  id="contact"
                  className="min-h-screen pt-20 pb-20 scroll-mt-14 lg:scroll-mt-[60px]"
                >
                  <ContactSection />
                </section>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
