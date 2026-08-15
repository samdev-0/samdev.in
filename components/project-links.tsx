import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

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

const solidBtn =
    "group relative flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 sm:px-8 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-lg hover:-translate-y-1";
const ghostBtn =
    "group relative flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-secondary/10 backdrop-blur-md px-6 sm:px-8 text-foreground transition-all duration-500 ease-out hover:bg-foreground hover:border-foreground/30 hover:text-background shadow-sm hover:-translate-y-1";
const shine = (
    <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-13 group-hover:duration-1000 group-hover:translate-x-full">
        <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10" />
    </div>
);
const label = "relative z-10 flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase";
const iconCls = "w-3.5 h-3.5 sm:w-4 sm:h-4";

interface ProjectLinksProps {
    project: Project;
    liveDemoLabel?: string;
    sourceLabel?: string;
    className?: string;
}

export function ProjectLinks({ project, liveDemoLabel = "Live Demo", sourceLabel = "Source Code", className = "" }: ProjectLinksProps) {
    const hasAny = project.playstore || project.appstore || project.website || project.repo || project.demo;
    if (!hasAny) return null;

    return (
        <div className={`flex flex-wrap gap-4 ${className}`}>
            {project.playstore && (
                <a href={project.playstore} target="_blank" rel="noopener noreferrer" className={solidBtn}>
                    {shine}
                    <span className={label}>
                        <GooglePlayIcon className={`${iconCls} transition-transform duration-500 group-hover:scale-110`} />
                        Play Store
                    </span>
                </a>
            )}

            {project.appstore && (
                <a href={project.appstore} target="_blank" rel="noopener noreferrer" className={solidBtn}>
                    {shine}
                    <span className={label}>
                        <AppleIcon className={`${iconCls} transition-transform duration-500 group-hover:scale-110`} />
                        App Store
                    </span>
                </a>
            )}

            {project.website && (
                <a href={project.website} target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                    {shine}
                    <span className={label}>
                        Website
                        <ArrowUpRight className={`${iconCls} transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1`} />
                    </span>
                </a>
            )}

            {project.demo && !project.appstore && !project.playstore && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={solidBtn}>
                    {shine}
                    <span className={label}>
                        {liveDemoLabel}
                        <ExternalLink className={`${iconCls} transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1`} />
                    </span>
                </a>
            )}

            {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                    {shine}
                    <span className={label}>
                        {sourceLabel}
                        <Github className={`${iconCls} transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`} />
                    </span>
                </a>
            )}
        </div>
    );
}
