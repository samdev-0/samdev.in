export type Project = {
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
};

/**
 * Derives a stable, language-independent slug from a project's asset path.
 * e.g. "/projects/marhaba/1.png" -> "marhaba"
 */
export function projectSlug(image?: string): string {
    const parts = (image || "").split("/").filter(Boolean);
    const idx = parts.indexOf("projects");
    return idx >= 0 && parts[idx + 1] ? parts[idx + 1] : "";
}

/** Finds a project (and its index) by slug within a list. */
export function findProjectBySlug(items: Project[], slug: string) {
    const index = items.findIndex((p) => projectSlug(p.image) === slug);
    return { project: index >= 0 ? items[index] : null, index };
}
