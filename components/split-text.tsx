"use client";

import { ElementType, Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
    text: string;
    className?: string;
    /** Element the text renders as (h1, p, span...). Defaults to a div. */
    as?: ElementType;
    /** Split into characters or words. Defaults to characters. */
    splitType?: "chars" | "words";
    /** Milliseconds between each piece. Defaults to 60. */
    delay?: number;
    /** Seconds each piece takes to animate. Defaults to 0.6. */
    duration?: number;
    /** Milliseconds before the whole reveal starts. */
    startDelay?: number;
    /** State each piece animates from. */
    from?: Record<string, number | string>;
    /** State each piece animates to. */
    to?: Record<string, number | string>;
    /** Easing curve. Defaults to a power3.out-like ease. */
    ease?: number[];
    /** Viewport root margin that gates the trigger. Defaults to "-100px". */
    rootMargin?: string;
    /** Re-run every time it re-enters the viewport. Defaults to once. */
    repeat?: boolean;
    /**
     * Explicit play/reset control. When provided, overrides the internal
     * viewport observer — set it true to play, false to reset (and it replays
     * on the next true). Use this for sticky/pinned sections whose DOM rect
     * never leaves the viewport, so intersection can't re-trigger.
     */
    active?: boolean;
}

type Word = { text: string; className?: string };

/**
 * Splits a (possibly HTML-bearing) string into words, carrying the class of any
 * wrapping inline tag onto its words so highlight styling survives the split.
 * Content here is author-controlled JSON — same trust level as the existing
 * dangerouslySetInnerHTML rendering path.
 */
function tokenize(input: string): Word[] {
    const words: Word[] = [];
    const re = /<([a-z0-9]+)([^>]*)>([\s\S]*?)<\/\1>|([^<]+)/gi;
    let match: RegExpExecArray | null;

    while ((match = re.exec(input)) !== null) {
        const [, , attrs, inner, plain] = match;
        const chunk = plain != null ? plain : inner;
        let className: string | undefined;

        if (plain == null) {
            const classMatch = (attrs || "").match(/class\s*=\s*['"]([^'"]*)['"]/i);
            className = classMatch ? classMatch[1] : undefined;
        }

        chunk
            .split(/\s+/)
            .filter(Boolean)
            .forEach((w) => words.push({ text: w, className }));
    }

    return words;
}

export function SplitText({
    text,
    className,
    as,
    splitType = "chars",
    delay = 60,
    duration = 0.6,
    startDelay = 0,
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    ease = [0.33, 1, 0.68, 1],
    rootMargin = "-100px",
    repeat = false,
    active,
}: SplitTextProps) {
    const ref = useRef<HTMLElement>(null);
    const autoInView = useInView(ref, { once: !repeat, margin: rootMargin as any });
    const inView = active !== undefined ? active : autoInView;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Wrapper: any = as ?? "div";

    const words = tokenize(text);
    let pieceIndex = 0;

    const piece = (char: string, key: string | number) => {
        const i = pieceIndex++;
        return (
            <motion.span
                key={key}
                className="inline-block will-change-[transform,opacity]"
                initial={from}
                animate={inView ? to : from}
                transition={{
                    duration,
                    ease: ease as [number, number, number, number],
                    delay: startDelay / 1000 + (i * delay) / 1000,
                }}
            >
                {char}
            </motion.span>
        );
    };

    return (
        <Wrapper ref={ref} className={cn(className)}>
            {words.map((word, wi) => (
                <Fragment key={wi}>
                    <span className={cn("inline-block whitespace-nowrap", word.className)}>
                        {splitType === "chars"
                            ? Array.from(word.text).map((char, ci) => piece(char, ci))
                            : piece(word.text, "w")}
                    </span>
                    {wi < words.length - 1 ? " " : null}
                </Fragment>
            ))}
        </Wrapper>
    );
}
