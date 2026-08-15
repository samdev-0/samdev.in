"use client";

import React from "react";
import { gsap } from "gsap";

export type FlowingMenuItem = {
    text: string;
    images: string[];
    meta?: string;
    onSelect?: () => void;
};

interface FlowingMenuProps {
    items: FlowingMenuItem[];
}

export default function FlowingMenu({ items = [] }: FlowingMenuProps) {
    return (
        <div className="w-full h-full overflow-hidden">
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem key={idx} {...item} />
                ))}
            </nav>
        </div>
    );
}

function MenuItem({ text, images, meta, onSelect }: FlowingMenuItem) {
    const itemRef = React.useRef<HTMLDivElement>(null);
    const marqueeRef = React.useRef<HTMLDivElement>(null);
    const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

    const animationDefaults = { duration: 0.6, ease: "expo" };

    const distMetric = (x: number, y: number, x2: number, y2: number) => {
        const xDiff = x - x2;
        const yDiff = y - y2;
        return xDiff * xDiff + yDiff * yDiff;
    };

    const findClosestEdge = (
        mouseX: number,
        mouseY: number,
        width: number,
        height: number
    ): "top" | "bottom" => {
        const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
        const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
        return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
    };

    const handleMouseEnter = (ev: React.MouseEvent<HTMLElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        gsap
            .timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
            .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        gsap
            .timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
            .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
    };

    const repeatedMarqueeContent = React.useMemo(() => {
        const pics = images.length ? images : [""];
        const count = Math.max(pics.length, 4);
        return Array.from({ length: count }).map((_, idx) => (
            <React.Fragment key={idx}>
                <span className="text-background uppercase font-semibold tracking-tighter text-[4vh] leading-[1.2] px-[1.5vw] pt-[1vh]">
                    {text}
                </span>
                <div
                    className="h-[13vh] aspect-[9/16] my-[2vh] mx-[1.5vw] rounded-2xl bg-cover bg-top border border-background/10 shrink-0"
                    style={{ backgroundImage: `url(${pics[idx % pics.length]})` }}
                />
            </React.Fragment>
        ));
    }, [text, images]);

    return (
        <div
            className="flex-1 min-h-[16vh] md:min-h-[18vh] relative overflow-hidden text-center shadow-[0_-1px_0_0_var(--border)]"
            ref={itemRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                type="button"
                onClick={onSelect}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer uppercase font-black tracking-tighter text-foreground text-[5vh] md:text-[7vh] leading-none hover:text-background focus-visible:text-background transition-colors duration-200 outline-none"
            >
                <span>{text}</span>
                {meta && (
                    <span className="text-xs md:text-sm font-mono tracking-widest text-muted-foreground normal-case">
                        {meta}
                    </span>
                )}
            </button>

            <div
                className="absolute top-0 left-0 overflow-hidden w-full h-full pointer-events-none bg-foreground translate-y-[101%]"
                ref={marqueeRef}
            >
                <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
                    <div className="flex items-center relative h-full w-[200%] will-change-transform animate-flowing-marquee">
                        {repeatedMarqueeContent}
                        {repeatedMarqueeContent}
                    </div>
                </div>
            </div>
        </div>
    );
}
