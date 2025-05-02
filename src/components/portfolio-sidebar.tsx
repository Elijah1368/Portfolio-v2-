"use client";

import type * as React from "react";
import { type LucideIcon, Github, Linkedin } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

// Define the shape of a section object for type safety
export interface Section {
  id: string;
  title: string;
  icon: LucideIcon; // Use LucideIcon type for flexibility
}

// Define social link interface
interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
}

interface PortfolioSidebarProps {
  sections: Section[];
  activeSection: string;
  onSelectItem: (sectionId: string) => void; // Callback for when an item is clicked
  userName?: string; // Optional prop for user name
  userTitle?: string; // Optional prop for user title
  socialLinks?: SocialLink[]; // Optional social links
}

const PortfolioSidebar: React.FC<PortfolioSidebarProps> = ({
  sections,
  activeSection,
  onSelectItem,
  userName = "John Doe", // Default value
  userTitle = "Web Developer", // Default value
  socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
  ], // Default social links
}) => {
  const handleItemClick = (sectionId: string) => {
    onSelectItem(sectionId);
  };

  return (
    <Sidebar
      className="left-[var(--sidebar-offset)] md:left-[var(--sidebar-offset)] sidebar-no-border border-0 border-none shadow-none z-20 pt-0.5" // Added z-index just in case
      style={
        {
          "--sidebar-background": "transparent",
          "--sidebar-border": "transparent",
          border: "none",
          boxShadow: "none",
        } as React.CSSProperties
      }
    >
      <div
        data-sidebar="sidebar" // Keep data attribute if needed for styling/selection
        className="flex h-full w-full flex-col bg-transparent shadow-none border-0 border-none sidebar-no-border no-scrollbar"
        style={{ border: "none", boxShadow: "none" }}
      >
        {/* Sidebar Header with User Info and Theme Toggle */}
        <SidebarHeader className="bg-transparent border-0 border-none sidebar-no-border">
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex flex-col">
              <span className="font-semibold">{userName}</span>
              <span className="text-xs text-muted-foreground">{userTitle}</span>
            </div>
            <ThemeToggle />
          </div>
        </SidebarHeader>

        {/* Sidebar Navigation Content */}
        <SidebarContent className="bg-transparent border-0 border-none sidebar-no-border overflow-visible">
          <SidebarMenu className="bg-transparent border-0 border-none sidebar-no-border">
            {sections.map((section) => (
              <SidebarMenuItem
                key={section.id}
                className="bg-transparent border-0 border-none sidebar-no-border my-1"
              >
                <div className="relative">
                  {/* Active Indicator */}
                  {activeSection === section.id && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-full dark:bg-primary" /> // Using primary color for both modes with slightly wider indicator
                  )}
                  <SidebarMenuButton
                    key={section.id}
                    isActive={activeSection === section.id}
                    onClick={() => handleItemClick(section.id)}
                    className={`
    bg-transparent border-0 border-none sidebar-no-border pl-3
    transition-all duration-200 ease-in-out w-full text-left // Ensure button takes full width for click area
    ${
      activeSection === section.id
        ? "text-primary dark:text-primary font-medium scale-105 origin-left"
        : "text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200 hover:scale-105 hover:origin-left" // Improved dark mode colors
    }
  `}
                  >
                    <span>{section.title}</span>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Social Links Footer */}
        <SidebarFooter className="bg-transparent border-0 border-none sidebar-no-border mt-auto">
          <div className="flex justify-start gap-4 py-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default PortfolioSidebar;
