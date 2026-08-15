"use client";

import { ElementType } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
    text: string;
    className?: string;
    /** Element the text renders as (h1, h2, span...). Defaults to a div. */
    as?: ElementType;
    /** Stagger each word or each letter. Defaults to words. */
    animateBy?: "words" | "letters";
    /** Direction the pieces travel in from. Defaults to bottom. */
    direction?: "top" | "bottom";
    /** Seconds between each piece. Defaults to 0.12. */
    stagger?: number;
    /** Seconds before the whole reveal starts. */
    delay?: number;
    /** Re-run the animation every time it scrolls into view. */
    repeat?: boolean;
}

export function BlurText({
    text,
    className,
    as,
    animateBy = "words",
    direction = "bottom",
    stagger = 0.12,
    delay = 0,
    repeat = false,
}: BlurTextProps) {
    const Wrapper = motion(as ?? "div");
    const pieces = animateBy === "words" ? text.split(" ") : text.split("");
    const yFrom = direction === "top" ? -24 : 24;

    return (
        <Wrapper
            initial="hidden"
            whileInView="visible"
            viewport={{ once: !repeat, margin: "-60px" }}
            transition={{ delayChildren: delay, staggerChildren: stagger }}
            className={cn("inline-block", className)}
        >
            {pieces.map((piece, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, filter: "blur(12px)", y: yFrom },
                        visible: { opacity: 1, filter: "blur(0px)", y: 0 },
                    }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="inline-block will-change-[opacity,filter,transform]"
                >
                    {piece === " " ? " " : piece}
                    {animateBy === "words" && i < pieces.length - 1 ? " " : null}
                </motion.span>
            ))}
        </Wrapper>
    );
}
