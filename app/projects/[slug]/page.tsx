"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useLenis } from "@/components/smooth-scroll";
import { findProjectBySlug, projectSlug, type Project } from "@/lib/projects";
import { ProjectLinks } from "@/components/project-links";
import { ProjectShowcase } from "@/components/project-showcase";
import { InteractiveParticles } from "@/components/3d/interactive-particles";

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const rise: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ProjectPage() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug ?? "";
    const { content } = useLanguage();
    const lenis = useLenis();

    // Always enter at the top — fixes the modal/list handoff landing mid-page.
    useEffect(() => {
        lenis?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    }, [lenis, slug]);

    const items: Project[] = content?.projects?.items ?? [];
    const { project, index } = findProjectBySlug(items, slug);
    const backLabel = content?.others?.all_projects || "All Projects";

    if (!project) {
        return (
            <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 px-6 text-center">
                <p className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground">404 — Project not found</p>
                <Link href="/#projects" className="group inline-flex items-center gap-2 font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    {backLabel}
                </Link>
            </main>
        );
    }

    const shots = project.screenshots?.length ? project.screenshots : [project.image];
    const next = items.length > 1 ? items[(index + 1) % items.length] : null;
    const counter = `[${String(index + 1).padStart(3, "0")}]`;

    return (
        <main className="relative h-screen w-full overflow-hidden bg-background text-foreground max-lg:h-auto max-lg:min-h-screen max-lg:overflow-visible">
            {/* Default site background — interactive particle field (same as the hero) */}
            <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
                <InteractiveParticles />
            </div>

            {/* Rotating grunge motif */}
            <motion.div
                aria-hidden
                className="absolute bottom-24 left-6 md:left-12 text-6xl md:text-7xl text-foreground/[0.05] pointer-events-none select-none z-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
                {"////"}
            </motion.div>

            <div className="relative z-20 h-full max-w-7xl mx-auto px-container md:px-16 pt-24 md:pt-28 pb-6 md:pb-8 flex flex-col">
                {/* Top bar */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex items-center justify-between shrink-0"
                >
                    <Link href="/#projects" className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        {backLabel}
                    </Link>
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">{counter}</span>
                </motion.div>

                {/* Middle: split hero */}
                <div className="flex-1 min-h-0 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Left — info */}
                    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-4 lg:gap-6 max-lg:order-2 max-lg:pb-12">
                        <motion.div variants={rise} className="flex items-center gap-4">
                            {project.icon && (
                                <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-neutral-900 shadow-2xl">
                                    <Image src={project.icon} alt={`${project.title} icon`} fill sizes="64px" className="object-cover" priority />
                                </div>
                            )}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground">
                                <span>{project.category}</span>
                                <span className="h-1 w-1 rounded-full bg-foreground/30" />
                                <span>{project.year}</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={rise}
                            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-foreground"
                        >
                            {project.title}
                        </motion.h1>

                        <motion.p variants={rise} className="max-w-lg text-sm sm:text-base font-light leading-relaxed text-muted-foreground line-clamp-3">
                            {project.description}
                        </motion.p>

                        {project.stack && project.stack.length > 0 && (
                            <motion.div variants={rise} className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-foreground/70">
                                {project.stack.map((tech, i) => (
                                    <span key={tech} className="flex items-center gap-x-3">
                                        {tech}
                                        {i < project.stack!.length - 1 && <span className="text-foreground/25">/</span>}
                                    </span>
                                ))}
                            </motion.div>
                        )}

                        <motion.div variants={rise} className="pt-1">
                            <ProjectLinks project={project} liveDemoLabel={content?.others?.live_demo} sourceLabel={content?.others?.source_code} />
                        </motion.div>
                    </motion.div>

                    {/* Right — animated showcase */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative h-full min-h-0 max-lg:order-1 max-lg:h-[62vh]"
                    >
                        <ProjectShowcase screenshots={shots} title={project.title} />
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center justify-between shrink-0 border-t border-border/60 pt-4"
                >
                    <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                        {content?.others?.screenshots || "App Screenshots"} · <span className="tabular-nums">{shots.length}</span>
                    </span>

                    {next && (
                        <Link href={`/projects/${projectSlug(next.image)}`} className="group inline-flex items-center gap-3 sm:gap-4">
                            <span className="flex flex-col text-right">
                                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{content?.others?.next_project || "Next Project"}</span>
                                <span className="text-base sm:text-xl font-black uppercase tracking-tighter text-foreground/90 group-hover:text-foreground transition-colors">{next.title}</span>
                            </span>
                            <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                        </Link>
                    )}
                </motion.div>
            </div>
        </main>
    );
}
