import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { useEffect } from "react";
import { useLenis } from "@/components/smooth-scroll";
import { useLanguage } from "@/context/language-context";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";

function GooglePlayIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.153l11.04 10.947zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
        </svg>
    );
}

function AppleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.032 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
        </svg>
    );
}

interface ProjectItem {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    image: string;
    icon?: string;
    demo?: string;
    repo?: string;
    playstore?: string;
    appstore?: string;
    website?: string;
    stack?: string[];
    screenshots?: string[];
}

interface ProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: ProjectItem | null;
}

export function ProjectModal({ open, onOpenChange, project }: ProjectModalProps) {
    const lenis = useLenis();
    const { content } = useLanguage();

    useEffect(() => {
        if (open) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
    }, [open, lenis]);

    if (!project) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={true}
                className="flex flex-col sm:max-w-[800px] w-[95vw] max-h-[90vh] p-0 gap-0 border-border/50 bg-background/95 backdrop-blur-xl shrink-0"
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{content?.others?.project_details || "Details about"} {project.title}</DialogDescription>
                </DialogHeader>

                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />

                <div className="overflow-y-auto w-full h-full flex-1" data-lenis-prevent="true">

                    <div className="relative w-full h-[35vh] sm:h-[40vh] shrink-0 overflow-hidden flex items-end">
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover opacity-40 transition-opacity duration-500"
                                priority
                            />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

                        {/* App Icon + Title Flex Header */}
                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex items-end gap-4 sm:gap-6 z-20">
                            {project.icon && (
                                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-neutral-900 shrink-0">
                                    <Image
                                        src={project.icon}
                                        alt={`${project.title} Icon`}
                                        fill
                                        sizes="(max-width: 640px) 64px, 96px"
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/10 opacity-40 pointer-events-none" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0 pb-1">
                                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground truncate mb-1 sm:mb-2">
                                    {project.title}
                                </h2>
                                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-mono tracking-widest text-muted-foreground uppercase">
                                    <span>{project.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-border/60 shrink-0" />
                                    <span>{project.year}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10 flex flex-col gap-8">
                        <div>
                            <h3 className="text-sm tracking-widest text-muted-foreground uppercase mb-4">{content?.others?.about_project || "About the Project"}</h3>
                            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
                                {project.description}
                            </p>
                        </div>

                        {/* App Screenshots Showcase Gallery */}
                        {project.screenshots && project.screenshots.length > 0 && (
                            <div>
                                <h3 className="text-sm tracking-widest text-muted-foreground uppercase mb-4">
                                    {content?.others?.screenshots || "App Showcase"}
                                </h3>
                                <div 
                                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-thumb-rounded-full snap-x snap-mandatory" 
                                    data-lenis-prevent="true"
                                >
                                    {project.screenshots.map((screenshot, idx) => (
                                        <div
                                            key={idx}
                                            className="relative w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] shrink-0 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-neutral-900 snap-start group/shot hover:border-foreground/30 transition-all duration-500 hover:-translate-y-1"
                                        >
                                            <Image
                                                src={screenshot}
                                                alt={`${project.title} Screenshot ${idx + 1}`}
                                                fill
                                                sizes="(max-width: 640px) 180px, 220px"
                                                className="object-cover group-hover/shot:scale-[1.02] transition-transform duration-700"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.stack && project.stack.length > 0 && (
                            <div>
                                <h3 className="text-sm tracking-widest text-muted-foreground uppercase mb-4">{content?.others?.technologies || "Technologies"}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-1.5 rounded-full border border-border/50 bg-secondary/50 text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(project.playstore || project.appstore || project.website || project.repo || project.demo) && (
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                                {project.playstore && (
                                    <a
                                        href={project.playstore}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 sm:px-8 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-lg hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-13 group-hover:duration-1000 group-hover:translate-x-full">
                                            <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10" />
                                        </div>
                                        <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase">
                                            <GooglePlayIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:scale-110" />
                                            Play Store
                                        </span>
                                    </a>
                                )}

                                {project.appstore && (
                                    <a
                                        href={project.appstore}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 sm:px-8 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-lg hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-13 group-hover:duration-1000 group-hover:translate-x-full">
                                            <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10" />
                                        </div>
                                        <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase">
                                            <AppleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:scale-110" />
                                            App Store
                                        </span>
                                    </a>
                                )}

                                {project.website && (
                                    <a
                                        href={project.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-secondary/10 backdrop-blur-md px-6 sm:px-8 text-foreground transition-all duration-500 ease-out hover:bg-foreground hover:border-foreground/30 hover:text-background shadow-sm hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-13 group-hover:duration-1000 group-hover:translate-x-full">
                                            <div className="relative h-full w-8 bg-foreground/10 dark:bg-background/20" />
                                        </div>
                                        <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase">
                                            Website
                                            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </span>
                                    </a>
                                )}

                                {project.demo && !project.appstore && !project.playstore && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 sm:px-8 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-lg hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-13 group-hover:duration-1000 group-hover:translate-x-full">
                                            <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10" />
                                        </div>
                                        <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase">
                                            {content?.others?.live_demo || "Live Demo"}
                                            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </span>
                                    </a>
                                )}

                                {project.repo && (
                                    <a
                                        href={project.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-secondary/10 backdrop-blur-md px-6 sm:px-8 text-foreground transition-all duration-500 ease-out hover:bg-foreground hover:border-foreground/30 hover:text-background shadow-sm hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-13 group-hover:duration-1000 group-hover:translate-x-full">
                                            <div className="relative h-full w-8 bg-foreground/10 dark:bg-background/20" />
                                        </div>
                                        <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase">
                                            Source Code
                                            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                                        </span>
                                    </a>
                                )}
                            </div>
                        )}

                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />
            </DialogContent>
        </Dialog>
    );
}
