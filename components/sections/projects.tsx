"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { BlurReveal } from "@/components/blur-reveal";
import { BlurText } from "@/components/blur-text";
import FlowingMenu from "@/components/flowing-menu";
import { projectSlug, type Project } from "@/lib/projects";

export type ProjectItem = Project;

export default function Projects() {
    const { content } = useLanguage();
    const router = useRouter();

    const menuItems = content.projects.items.map((project: ProjectItem) => ({
        text: project.title,
        images: project.screenshots?.length ? project.screenshots : [project.image],
        meta: `${project.category} · ${project.year}`,
        onSelect: () => router.push(`/projects/${projectSlug(project.image)}`),
    }));

    return (
        <section
            data-slot="projects"
            className="relative py-16 md:py-24 lg:py-32"
        >
            <div className="flex flex-col gap-4 px-container mb-12 md:mb-16">
                <BlurReveal>
                    <span className="title-counter">[003]</span>
                </BlurReveal>

                <BlurText as="h2" text={content.projects.title} className="title" />

                <BlurReveal>
                    <p className="mt-4 text-muted-foreground text-lg md:text-2xl max-w-3xl">
                        {content.projects.intro}
                    </p>
                </BlurReveal>
            </div>

            <BlurReveal>
                <div className="w-full border-t border-border">
                    <FlowingMenu items={menuItems} />
                </div>
            </BlurReveal>
        </section>
    );
}
