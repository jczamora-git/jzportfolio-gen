# Responsive Contract — Portfolio Launchpad

## 1. Breakpoint Definitions

| Tier | Breakpoint Query | Key Layout Adaptations |
| :--- | :--- | :--- |
| **Mobile** | `< 768px` (`max-width: 767px`) | Single-column stacks, fluid headline, full-width CTAs, hidden Portfolio Brief, 2-column statistics grid, compact mobile dropdown. |
| **Tablet** | `768px – 1023px` (`md` to `lg`) | 2-column hero grid, visible Portfolio Brief, full capsule navigation, 4-column statistics grid. |
| **Desktop** | `1024px+` (`lg`, `xl`, `2xl`) | Max container constraints (`max-w-5xl`, `max-w-6xl`), editorial spacing, full interactive preview panels. |

---

## 2. Mobile Invariants (< 768px)
1. **Headline Scaling**: Hero headline uses `text-[clamp(2.5rem,10.6vw,3.25rem)]` with `[text-wrap:balance]` and fluid line height (`leading-[1.06]`). It must remain prominent, bold, and centered.
2. **Hidden Portfolio Brief**: The tactile Portfolio Brief preview is `hidden md:block`. It must **never** occupy space, cause overflow, or be forced visible on mobile screens.
3. **Floating Navbar & Mobile Menu**:
   - Navbar capsule maintains `h-14 sm:h-16` height.
   - Hamburger button triggers dropdown menu directly beneath the navbar.
   - Menu must not overflow horizontally on 320px, 375px, 393px, or 430px viewports.
4. **Statistics Grid**: Displays as a clean 2x2 grid on mobile with subtle border dividers.
5. **No Horizontal Scrolling**: Page wrapper uses `overflow-x-hidden` and enforces clean bounds.

---

## 3. Desktop Invariants (1024px+)
1. **Hero Composition**: 2-column hero layout with left editorial narrative / CTA buttons and right creative brief artifact.
2. **Capabilities Layout**: 5-column left capability pill buttons + 7-column right interactive preview frame.
3. **Workflow Pipeline**: 5-column horizontal grid (`STEP 01` to `STEP 05`).
