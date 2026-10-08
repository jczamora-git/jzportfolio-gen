---
name: prompt-engine
description: Portfolio schema validation, deterministic prompt compilation, Markdown export, and persona harnesses.
---

# Skill: Prompt Engine

## Core Responsibilities
1. **Deterministic Prompt Generation**: Maintain `src/lib/prompt/promptGenerator.ts` and `src/lib/prompt/markdownExport.ts`. Ensure prompts are 100% deterministic, structured, and factual.
2. **Schema & Data Validation**: Maintain Zod validation schemas in `src/lib/validation/portfolioSchema.ts`.
3. **Local Storage Autosave**: Maintain `src/lib/storage/draftStorage.ts` for safe draft persistence and recovery.
4. **Sample Personas**: Maintain the 5 preloaded student personas in `src/data/sampleProfiles.ts`.

---

## The Zero-Hallucination Invariant
The prompt engine is the intellectual core of Portfolio Launchpad. It must compile user facts without inventing unverified claims:
- If `experience` is empty: Instruct the AI assistant to focus on academic coursework and project highlights; never fabricate employment history.
- If `projects` is empty: Instruct the AI assistant to render a **Learning Journey & Roadmap** section instead of fictional project cards.
- If social URLs are empty: Omit those social icons/links cleanly.
- Target Output Specification: Static HTML5, CSS3, Vanilla JavaScript, relative asset paths, high contrast, mobile responsive, and GitHub Actions workflow for GitHub Pages.

---

## Persona Inventory
1. **Alex Morgan**: Computer Science Major (Aspiring Frontend / Full-Stack Engineer).
2. **Jamie Reyes**: Fresh CS Graduate (Frontend Engineer & Accessible Tools).
3. **Taylor Santos**: UI/UX Designer & Creative Technologist.
4. **Jordan Lee**: Data Analyst & Python Developer.
5. **Morgan Chen**: Early-Career Software Developer (Vue.js & TypeScript focus).

All 5 personas must pass `PortfolioDraftSchema.safeParse()` without errors.
