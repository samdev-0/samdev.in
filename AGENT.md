# 🤖 Agent Architecture & Workspace Log

This file contains the persistent development history, architectural modifications, and deployment notes for **Mohd Mustak's** personal portfolio codebase.

---

## 🚀 Project Overview
We have customized and rebranded the cloned interactive Awwwards template (`kintarowwwards-main`) into Mohd Mustak's personal site, pulling career milestones and app data from his local flutter codebase (`agency_website`) and professional resume.

### 💻 Local Environment
- **Runtime Node Server**: Task running in background.
- **Port Preview**: Local: `http://localhost:3000` / Network: `http://192.168.1.8:3000`.
- **Framework Stack**: Next.js 16.1.6, TypeScript, React 19, Tailwind CSS v4 (using CSS variables & standard components), Framer Motion, and Three.js.

---

## 🛠️ Modded Implementations

### 1. Rebranding & Custom Copywriting
- Updated all pre-existing placeholder names to **Mohd Mustak** / **Mustak** / **MUSTAK**.
- Synchronized translation dictionaries (`content/en.json` and `content/tr.json`) in parallel.
- Populated detailed developer profile description outlining Flutter expertise, NestJS full-stack backends, and cloud orchestration skills.
- Implemented real professional roadmap timelines covering milestones from Yasita Creations (2021) to Ulearna Tech / Spotted (2026).

### 2. Multi-Store Showcase Links (`playstore`, `appstore`, `website`, `repo`)
- Extended `ProjectItem` interface in `projects.tsx` and `project-modal.tsx` to handle cross-platform distribution links.
- Rendered custom branded download pills inside the project modal matching target stores with specific Lucide brand icons (`Play`, `Smartphone`, `Globe`, `Github`).

### 3. High-Fidelity Decoupled Image Assets
- Copied all high-resolution app screenshots and logos from `/Users/mustak/StudioProjects/websites/agency_website/src/assets/project_images/` into `/public/projects/`.
- Modified `en.json` and `tr.json` to decouple the card background image (`image` set to screen index `1` for full-bleed showcase) from the app icon (`icon` set to index `0` for the actual square app logo).
- Programmed a portrait screenshots showcase carousel inside the modal using native Tailwind CSS scroll snapping.

---

## ⚙️ How to Maintain & Run

### Development Mode
Runs the local Next.js Turbopack development server:
```bash
npm run dev
```

### Production Build
Checks TypeScript types and compiles the production bundle in under **2.2 seconds**:
```bash
npm run build
```

### Adding a New Project
1. Copy the project assets into `/public/projects/<folder_name>/`.
   - Name the official icon as `0.jpg` / `0.png`.
   - Name screenshots as `1.jpg`, `2.jpg` ... `N.jpg`.
2. Append the project metadata inside `content/en.json` and `content/tr.json` inside the `"projects": { "items": [...] }` block:
   ```json
   {
       "id": "7",
       "title": "Project Name",
       "category": "App Category",
       "year": "2026",
       "description": "Short summary...",
       "image": "/projects/<folder_name>/1.jpg",
       "icon": "/projects/<folder_name>/0.jpg",
       "playstore": "https://play.google.com/...",
       "appstore": "https://apps.apple.com/...",
       "website": "https://...",
       "stack": ["Flutter", "NestJS"],
       "screenshots": [
           "/projects/<folder_name>/1.jpg",
           "/projects/<folder_name>/2.jpg"
       ]
   }
   ```
