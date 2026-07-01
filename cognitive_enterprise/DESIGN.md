---
name: Cognitive Enterprise
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#43474e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f88'
  primary: '#002045'
  on-primary: '#ffffff'
  primary-container: '#1a365d'
  on-primary-container: '#86a0cd'
  inverse-primary: '#adc7f7'
  secondary: '#1960a3'
  on-secondary: '#ffffff'
  secondary-container: '#7db6ff'
  on-secondary-container: '#00477f'
  tertiary: '#321b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f2e00'
  on-tertiary-container: '#c6955e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#d3e4ff'
  secondary-fixed-dim: '#a2c9ff'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#004881'
  tertiary-fixed: '#ffddba'
  tertiary-fixed-dim: '#f2bc82'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#633f0f'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  nav-rail-width: 64px
  sidebar-expanded: 240px
  gutter: 16px
  container-padding: 24px
  stack-compact: 8px
  stack-comfortable: 16px
---

## Brand & Style
The design system is engineered for high-density information environments where clarity and operational speed are paramount. The brand personality is **trustworthy, efficient, and data-driven**, prioritizing utility over decoration to support long-duration cognitive tasks.

The visual style is **Corporate / Modern**, leaning into a highly structured, systematic aesthetic. It utilizes a restrained "Utility-First" approach: heavy reliance on whitespace for grouping, a strict geometric grid, and subtle tonal layering to define hierarchy. The interface aims to feel like a precision instrument—reliable, scalable, and professional.

## Colors
The palette is anchored by **Deep Professional Blues** to evoke stability and authority. 
- **Primary (#1A365D):** Reserved for high-level navigation, primary actions, and brand identification.
- **Secondary (#2B6CB0):** Used for active states, text links, and secondary interactive elements.
- **Functional Accents:** Success (Emerald), Warning (Amber), and Danger (Rose) are used strictly for semantic feedback and status indicators within data density.
- **Neutrals:** A range of slate grays is used for borders, subtle backgrounds, and body text to reduce visual fatigue. Surface backgrounds use a cool off-white (#F8FAFC) to differentiate from pure white content cards.

## Typography
This design system employs **Inter** for its exceptional legibility in dense UI environments. The type scale is compact to maximize information density without sacrificing readability.

- **Data Density:** `body-sm` (13px) is the workhorse for table data and form labels. 
- **Tabular Numbers:** For financial figures and IDs within tables, use a monospaced font (JetBrains Mono) or enable `tnum` (tabular figures) OpenType features in Inter to ensure vertical alignment.
- **Hierarchy:** `label-caps` is used for section headers in sidebars and small metadata labels to create distinct visual separation.

## Layout & Spacing
The layout follows a **Dashboard-Centric** model with a multi-tier navigation structure:
1.  **Primary Rail:** A slim, 64px left-hand rail for top-level application switching.
2.  **Contextual Sidebar:** A 240px collapsible panel for module-specific navigation.
3.  **Main Content:** A fluid canvas that uses a 12-column grid.

**Density Toggles:** The system supports "Compact" and "Comfortable" modes. Compact mode reduces vertical padding in tables and lists by 50% for power users.
**Breakpoints:** 
- Mobile (<768px): Sidebar becomes a hidden drawer; Nav rail moves to a bottom bar.
- Tablet (768px - 1280px): Sidebar is collapsed by default.
- Desktop (>1280px): Sidebar is persisted.

## Elevation & Depth
Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows, maintaining a "flat" professional profile.

- **Level 0 (Background):** #F8FAFC - The application canvas.
- **Level 1 (Cards/Sections):** White surface with a 1px border (#E2E8F0). No shadow.
- **Level 2 (Popovers/Dropdowns):** White surface with a 1px border and a subtle, soft shadow (0px 4px 12px rgba(0,0,0,0.05)).
- **Active States:** Elements being dragged or high-priority modals use a tinted shadow (Blue-900 at 10% opacity) to signify focus.

## Shapes
The design system uses a **Soft (0.25rem)** roundedness approach. This slight rounding softens the industrial nature of an ERP without appearing too "consumer-grade" or playful. 

- **Standard Elements:** 4px (0.25rem) for buttons, input fields, and small cards.
- **Containers:** 8px (0.5rem) for main content cards and modals.
- **Status Badges:** Fully rounded (pill) to distinguish them from interactive buttons.

## Components
- **Data Tables:** The core of the system. Feature "Zebra-striping" on hover, sticky headers, and inline cell editing. Header cells include integrated sort/filter icons.
- **Buttons:** 
  - *Primary:* Solid Deep Blue (#1A365D), white text.
  - *Secondary:* Ghost style with Slate-200 border, Slate-700 text.
- **Multi-tab Navigation:** Located at the top of the main content area. Active tabs use a 2px bottom border in Primary Blue; inactive tabs are Slate-500.
- **Status Badges:** Small, high-contrast labels (e.g., "Paid", "Pending", "Overdue"). Use light tinted backgrounds with dark text for accessibility (e.g., Success: Emerald-100 background with Emerald-900 text).
- **Form Layouts:** Vertical labels by default for readability in narrow columns. Use "Focus Rings" (2px #2B6CB0) to clearly indicate the active input field.
- **Collapsible Sidebars:** Nested navigation using a chevron-right/down pattern. Uses a subtle Blue-50 background tint for the active menu item.