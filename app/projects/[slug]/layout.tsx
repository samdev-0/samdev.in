import type { ReactNode } from "react";
import content from "@/content/en.json";
import { projectSlug } from "@/lib/projects";

export function generateStaticParams() {
  return content.projects.items.map((project) => ({
    slug: projectSlug(project.image),
  }));
}

export const dynamicParams = false;

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
