"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Award, Briefcase, Menu, User } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider, ThemeToggle } from "@/components/theme-provider";
import AboutSection from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import PortfolioSidebar, {
  SocialLink,
  type Section,
} from "@/components/portfolio-sidebar";
import { type LucideIcon, Github, Linkedin } from "lucide-react";
const sections: Section[] = [
  { id: "about", title: "About Me", icon: User },
  { id: "experience", title: "Experience", icon: Award },
  { id: "projects", title: "My Projects", icon: Briefcase },
];

const content = {
  title: "Fullstack Software Engineer",
  socialLinks: [
    { name: "GitHub", icon: Github, url: "https://github.com/Elijah1368" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/elijah-amian-010a17159/",
    },
  ],
};
const MOBILE_HEADER_HEIGHT = 56; // Corresponds to h-14
const OBSERVER_DEBOUNCE_MS = 200;
const SCROLL_IGNORE_OBSERVER_MS = 800; // How long to ignore observer after a click (adjust based on smooth scroll duration)

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const activeSectionRef = useRef(activeSection);
  const observerDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  // Ref to track if we are scrolling due to a click
  const isClickScrolling = useRef(false);
  const clickScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep activeSectionRef updated
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickScrollTimeoutRef.current) {
        clearTimeout(clickScrollTimeoutRef.current);
      }
      if (observerDebounceTimer.current) {
        clearTimeout(observerDebounceTimer.current);
      }
    };
  }, []);

  // Debounced setActiveSection for Observer
  const debouncedSetActiveSection = useCallback((sectionId: string) => {
    if (observerDebounceTimer.current) {
      clearTimeout(observerDebounceTimer.current);
    }
    observerDebounceTimer.current = setTimeout(() => {
      // *** Check if we should ignore the observer ***
      if (isClickScrolling.current) {
        // console.log("Observer ignored due to recent click scroll");
        return;
      }

      if (activeSectionRef.current !== sectionId) {
        // console.log("Debounced Observer setting active section to:", sectionId);
        setActiveSection(sectionId);
      }
    }, OBSERVER_DEBOUNCE_MS);
  }, []); // Empty dependency array is fine here

  // Intersection Observer Setup
  useEffect(() => {
    // *** Adjust rootMargin and threshold ***
    const observerOptions = {
      root: null,
      // Align top margin exactly below the mobile header
      rootMargin: `-${MOBILE_HEADER_HEIGHT}px 0px -25% 0px`, // Increased negative bottom margin slightly
      threshold: 0.2, // *** Increased threshold: 40% must be visible ***
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // *** Check if we should ignore the observer (early exit) ***
      if (isClickScrolling.current) {
        // console.log("Observer callback ignored during click scroll");
        return;
      }

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        if (
          mostVisible?.target?.id &&
          mostVisible.target.id !== activeSectionRef.current
        ) {
          // Use the debounced function
          debouncedSetActiveSection(mostVisible.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      } else {
        console.warn("Section element not found for observing:", section.id);
      }
    });

    return () => {
      observer.disconnect();
      if (observerDebounceTimer.current) {
        clearTimeout(observerDebounceTimer.current);
      }
    };
  }, [debouncedSetActiveSection]); // Dependency array includes the debounced function

  // Simplified Scroll Function (no changes needed here)
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handler for sidebar item selection
  const handleSelectItem = (sectionId: string) => {
    // --- Ignore Observer START ---
    isClickScrolling.current = true;
    // Clear any existing timeout to reset the flag
    if (clickScrollTimeoutRef.current) {
      clearTimeout(clickScrollTimeoutRef.current);
    }
    // --- End Ignore Observer START ---

    // Clear any pending observer *update* timer
    if (observerDebounceTimer.current) {
      clearTimeout(observerDebounceTimer.current);
    }

    // Set state immediately
    // console.log("Click setting active section to:", sectionId);
    setActiveSection(sectionId);

    // Scroll
    scrollToSection(sectionId);

    // --- Ignore Observer END ---
    // Set a timer to re-enable observer updates after scroll likely finishes
    clickScrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
      // console.log("Observer re-enabled");
    }, SCROLL_IGNORE_OBSERVER_MS);
    // --- End Ignore Observer END ---
  };

  return (
    <SidebarProvider
      //@ts-ignore
      style={{ "--sidebar-background": "transparent" }}
    >
      {/* Mobile Header */}

      <div className="flex justify-center w-full bg-background">
        <div className="w-full max-w-7xl relative">
          <header className="md:hidden sticky top-0 z-10 flex h-14 items-center bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="mr-2 mb-0.5">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </SidebarTrigger>
            <h1 className="flex-1 text-lg font-light truncate uppercase text-muted-foreground tracking-tighter">
              {sections.find((s) => s.id === activeSection)?.title ?? ""}
            </h1>

            <ThemeToggle />
          </header>
          {/*for some reason, vertical padding doesn't work here what for sidebar tf*/}
          <div className="flex w-full  md:px-12 sm:px-24 px-8">
            {/* Sidebar */}
            <PortfolioSidebar
              sections={sections}
              activeSection={activeSection}
              onSelectItem={handleSelectItem}
              userName="Elijah Amian"
              userTitle={content.title}
              socialLinks={content.socialLinks}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 md:pl-52 pb-32">
              {/* Content Sections */}
              <main className="flex-1">
                <div className="flex flex-col gap-32 ">
                  {/* Sections */}
                  <section id="about" key="about" className="pt-4 md:pt-4 ">
                    <AboutSection
                      title={content.title}
                      socialLinks={content.socialLinks}
                    />
                  </section>
                  <section
                    id="experience"
                    key="experience"
                    className="pt-4 md:pt-4 "
                  >
                    <ExperienceSection />
                  </section>
                  <section
                    id="projects"
                    key="projects"
                    className="pt-4 md:pt-4 "
                  >
                    <ProjectsSection />
                  </section>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
