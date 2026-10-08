# Theme Contract — Portfolio Launchpad

## 1. Single Source of Truth
Theme state is managed exclusively by `src/composables/useTheme.ts`:
- **State**: `const currentTheme = ref<'light' | 'dark'>()`
- **Persistence Key**: `'portfolio-launchpad:ui-theme'` in `localStorage`.
- **Root Class**: When `dark`, `document.documentElement.classList.add('dark')`; otherwise `classList.remove('dark')`.
- **Initialization**: Synchronous resolution during module evaluation in browser; fallback to `window.matchMedia('(prefers-color-scheme: dark)')` or `'light'`.

---

## 2. Palette & Surface Mapping

| Interface Region | Light Mode Token / Color | Dark Mode Token / Color | Behavior Notes |
| :--- | :--- | :--- | :--- |
| **Floating Navbar** | `#12131C` / `#1A1A24` | `#12131C` / `#1A1A24` | **Fixed dark appearance** across both themes. |
| **Mobile Dropdown** | `#12131C` / `#1A1A24` | `#12131C` / `#1A1A24` | **Fixed dark appearance** across both themes. |
| **Landing Hero Area**| `#FFFFFF` (White) | `#20202B` (Charcoal) | Area behind floating navbar matches hero exactly. |
| **Landing Lower Stage**| `#F1F0F6` (Lavender-gray) | `#0F0F15` (Deep Black) | Distinct surface revealing hero bottom curvature. |
| **Interior Pages** | `#F7F7F9` | `#101015` | Default page background for `/builder`, `/result`, etc. |
| **Cards & Containers**| `#FFFFFF` (`border-[#E2E1EA]`)| `#161822` (`border-[#242738]`)| Clean modular frames with high contrast text. |
| **Elevated Sub-Cards**| `#F8F7FC` | `#0D0E12` | Sub-boxes for metrics, inputs, preview fixtures. |
| **Primary Typography**| `#17171D` | `#F8F8FA` / `#FFFFFF` | Clear, readable high-contrast headings & labels. |
| **Secondary Typography**| `#666675` | `#9496A6` / `#ACACBA` | Supporting text, timestamps, helper paragraphs. |

---

## 3. Invariants & Rapid Toggle Protection
1. **Instantaneous Structural Surface Transitions**: Structural layout wrappers (`App.vue`, `landing-stage`, `upper-hero-sheet`, `lower-stage`) must NOT use `transition-colors duration-200`. This prevents rectangular color flashes or cutoffs when toggling themes rapidly.
2. **Zero Seam Guarantee**: In dark mode, the area behind the floating capsule navbar is `#20202B`, matching the upper hero sheet seamlessly with 0px horizontal line.
3. **Storage Resilience**: All localStorage read/write calls must be wrapped in `try/catch` to gracefully support private browsing modes and sandboxed iframes.
