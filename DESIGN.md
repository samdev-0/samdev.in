# 🎨 Portfolio Design System & Aesthetic Guidelines

This document outlines the core visual, architectural, and user experience patterns implemented across **Mohd Mustak's** personal interactive portfolio website.

---

## 🖤 Core Theme: Obsidian High-Contrast Dark Mode
The website utilizes a deep, pitch-black high-contrast abstract obsidian design system. This provides a stunning premium aesthetic that allows high-fidelity app screenshots and colorful app logos to pop with a striking presence.

### 🎨 Color Palette
- **Background**: Deep obsidian black (`#000000` / `#050505`).
- **Foreground**: Clean, legible, high-contrast crisp white (`#ffffff`).
- **Muted text**: A soft, elegant gray (`#a3a3a3`).
- **Borders & Dividers**: Thin, razor-sharp charcoal dividers (`#1a1a1a` / `rgba(255, 255, 255, 0.08)`).
- **Highlights**: Deep primary glow (`#00f0ff` or a custom brand accent depending on theme config).

---

## 📐 Layout & Spacing System
The layout is optimized for an immersive full-screen experience on desktop while gracefully adapting to a single-column, touch-friendly scroll on mobile.

- **Desktop Horizontal Scroll**: The projects showcase uses horizontal translation linked to vertical scroll progress (leveraging `framer-motion`'s `useScroll` and `useTransform`).
- **Mobile Fluid Layout**: Dynamically recalculates the viewport height without causing React cascading render loops.
- **Glassmorphism Containers**: Backdrop blur classes (`backdrop-blur-xl bg-background/95`) are leveraged on the project detail modal and navigation overlays to sustain depth and environmental consistency.

---

## 📱 Decoupled App Presentation System
To preserve the clean minimalist style of the portfolio, app details are decoupled into a beautiful two-tiered asset display:

### 1. Project List Cards (`ProjectCard`)
- **Full-Bleed Screenshot Backdrop**: The card background renders a grayscaled, high-quality widescreen screenshot (`1.jpg` / `1.png` from each project folder).
- **Interactive Lighting**: On hover, the grayscale filter transitions to `0` (`grayscale-0`), and the image scales up smoothly to light up the app in full color.
- **Floating Meta Layers**: Monospace categories and years sit at the top corners, and the large project name is positioned at the bottom left with a layered opacity shift.

### 2. App Store Detail Modal (`ProjectModal`)
- **Ambient Hero Banner**: The modal header displays the high-fidelity screenshot crisp as a banner behind a sleek vertical dark gradient to ensure readability.
- **Clean App Icon Container**: The official square app icon (`0.jpg` / `0.png` / `0.webp`) is displayed at a 1:1 aspect ratio with rounded corners (`rounded-[24px]` / `rounded-[32px]`) and a subtle outer stroke.
- **Portrait Screenshots Carousel**: Mobile screenshots (`1.png` to `N.png`) scroll horizontally in a touch-friendly carousel snapping natively (`snap-x snap-mandatory`), replicating real App Store product pages.

---

## 💫 Interactive & Motion Performance
- **Framer Motion Springs**: Hover transitions use fine-tuned spring configurations (`stiffness: 400, damping: 60`) to maintain instant responsiveness without visual drag.
- **Smooth Scroll (Lenis)**: Native-feeling inertial smooth scroll is active site-wide. When the projects modal is opened, the scroll is locked automatically (`lenis.stop()`) and unlocked upon close (`lenis.start()`) to avoid double-scrolling collisions.
