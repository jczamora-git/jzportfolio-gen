# Architecture Decision Records (ADRs)

## ADR-001: Client-Side Only Architecture
- **Status**: Accepted
- **Context**: Portfolio Launchpad was designed for the "Code. Build. Deploy" webinar to help novices quickly prepare portfolio prompts.
- **Decision**: The application will run 100% in the browser client using Vue 3, Pinia, and `localStorage`. No databases, user logins, or backend servers will be introduced.
- **Consequences**: Zero infrastructure maintenance, maximum user privacy, zero hosting costs on static providers (Vercel, GitHub Pages).

## ADR-002: Deterministic Prompt Compilation (No AI API)
- **Status**: Accepted
- **Context**: Calling OpenAI/Anthropic/Google AI APIs directly from the browser requires user API keys or a proxy backend, which introduces security risks, rate limits, and latency.
- **Decision**: The application compiles a structured, deterministic Markdown prompt that users copy and paste into their AI assistant of choice.
- **Consequences**: Zero API cost, zero key leakage risk, instant generation, completely reproducible output.

## ADR-003: Floating Dark Capsule Navigation Invariant
- **Status**: Accepted
- **Context**: The design identity utilizes a floating pill navbar above an upper-sheet hero.
- **Decision**: The floating navbar capsule and expanded mobile dropdown maintain a permanent dark surface (`bg-[#12131C]/95 dark:bg-[#1A1A24]/95`) across **both** light and dark modes.
- **Consequences**: Distinctive brand signature, visual consistency, high readability.

## ADR-004: Physical Upper-Sheet Landing Composition
- **Status**: Accepted
- **Context**: The landing page uses an editorial physical sheet layered above a darker lower stage.
- **Decision**: The hero is rendered as a continuous upper sheet (`bg-white` light, `#20202B` dark) with large curved bottom corners (`rounded-b-[44px] sm:rounded-b-[72px] lg:rounded-b-[96px]`) resting over the lower stage (`#F1F0F6` light, `#0F0F15` dark).
- **Consequences**: Strong visual identity inspired by creative agency design.

## ADR-005: Desktop-Only Creative Portfolio Brief
- **Status**: Accepted
- **Context**: On small mobile viewports (<768px), rendering both the editorial headline narrative and the tactile preview card cluttered the viewport.
- **Decision**: The tactile Portfolio Brief preview card is strictly responsive (`hidden md:block`), leaving mobile screens clean and focused.
- **Consequences**: High-converting, readable mobile landing page with zero horizontal overflow.

## ADR-006: GSAP Ticker Integration with Lenis Smooth Scrolling
- **Status**: Accepted
- **Context**: Running independent RAF loops for Lenis smooth scrolling and GSAP animations wastes CPU cycles and risks frame stutter.
- **Decision**: Lenis runs with `autoRaf: false` and is driven exclusively by `gsap.ticker.add((time) => lenis.raf(time * 1000))`. All animations use `gsap.context()` for scoped cleanup.
- **Consequences**: Single synchronized frame loop, zero memory leaks across route navigation, complete reduced-motion support.
