"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ProjectShowcase({ screenshots, title }: { screenshots: string[]; title: string }) {
    const n = screenshots.length;
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (paused || reduce || n <= 1) return;
        const id = setInterval(() => setActive((a) => (a + 1) % n), 3000);
        return () => clearInterval(id);
    }, [paused, reduce, n]);

    // shortest signed distance from active (handles wrap-around)
    const relOf = (i: number) => {
        let rel = i - active;
        if (rel > n / 2) rel -= n;
        if (rel < -n / 2) rel += n;
        return rel;
    };

    return (
        <div
            className="relative h-full w-full flex items-center justify-center select-none"
            style={{ perspective: 1400 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <motion.div
                className="absolute inset-0"
                animate={reduce ? {} : { y: [0, -14, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
                {screenshots.map((src, i) => {
                    const rel = relOf(i);
                    const abs = Math.abs(rel);
                    const visible = abs <= 2;
                    const x = `${rel * 8.5}vw`;
                    const scale = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.64;
                    const rotateY = rel === 0 ? 0 : rel < 0 ? 24 : -24;
                    const opacity = visible ? (abs === 0 ? 1 : abs === 1 ? 0.7 : 0.32) : 0;
                    const filter = abs === 0 ? "grayscale(0) brightness(1)" : "grayscale(0.7) brightness(0.65)";

                    return (
                        <div
                            key={i}
                            className="absolute inset-0 grid place-items-center"
                            style={{ zIndex: 30 - abs * 10, pointerEvents: visible ? "auto" : "none" }}
                        >
                            <motion.button
                                type="button"
                                onClick={() => setActive(i)}
                                aria-label={`${title} — screenshot ${i + 1}`}
                                className="relative w-[clamp(150px,18vw,230px)] aspect-[375/812] rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-950 shadow-[0_40px_120px_-30px_rgba(0,0,0,1)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                style={{ transformStyle: "preserve-3d" }}
                                initial={false}
                                animate={{ x, scale, rotateY, opacity, filter }}
                                transition={{ type: "spring", stiffness: 210, damping: 28 }}
                            >
                                {/* plain img: safe with 3D transforms and fine for small local assets */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt="" className="w-full h-full object-cover pointer-events-none" draggable={false} />
                                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/45 to-transparent" />
                                <span className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/5" />
                            </motion.button>
                        </div>
                    );
                })}
            </motion.div>

            {/* progress indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
                {screenshots.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Go to screenshot ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30 hover:bg-foreground/60"}`}
                    />
                ))}
            </div>
        </div>
    );
}
