---
name: Luminous Precision
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#414753'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005cbb'
  primary: '#0059b5'
  on-primary: '#ffffff'
  primary-container: '#0071e3'
  on-primary-container: '#fcfbff'
  inverse-primary: '#abc7ff'
  secondary: '#5e5e63'
  on-secondary: '#ffffff'
  secondary-container: '#e0dfe4'
  on-secondary-container: '#626267'
  tertiary: '#9b3f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c25100'
  on-tertiary-container: '#fffaf9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#e3e2e7'
  secondary-fixed-dim: '#c7c6cb'
  on-secondary-fixed: '#1a1b1f'
  on-secondary-fixed-variant: '#46464b'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb693'
  on-tertiary-fixed: '#341000'
  on-tertiary-fixed-variant: '#7a3000'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 19px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.47'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1200px
  gutter: 20px
---

## Brand & Style

This design system is built on the principles of **high-fidelity minimalism** and **corporate clarity**. It targets premium SaaS, high-end consumer electronics, and professional services where trust and precision are paramount. The aesthetic is heavily influenced by the "California Modern" movement: expansive white space, razor-sharp typography, and a deliberate lack of unnecessary ornamentation.

The emotional response should be one of quiet confidence and effortless sophistication. By using a pure white canvas, we emphasize the content and product photography above the interface itself. The style is strictly **Corporate / Modern** with a slight infusion of **Glassmorphism** for utility-based overlays.

## Colors

The palette is strictly controlled to maximize readability and focus. 

- **Primary Background:** Pure `#FFFFFF` is used for all main content areas to create an "infinite" feel.
- **Primary Text:** `#1D1D1F` (Deep Black) provides the highest possible contrast ratio for legibility.
- **Secondary Text:** `#86868B` is utilized for captions and less critical information to establish hierarchy.
- **Accent/Action:** `#0071E3` (Vibrant Blue) is reserved exclusively for interactive elements like links and primary CTA fills.
- **Surfaces:** `#F5F5F7` is used for subtle grouping or background transitions where pure white would lack sufficient definition.

## Typography

This design system uses **Inter** to emulate the tight aperture and high-legibility characteristics of San Francisco. 

- **Hierarchy:** Use bold weights sparingly for headlines to create a strong "anchor" for the eye. 
- **Body Copy:** Body text should maintain a 1.47x to 1.5x line height to ensure breathability within dense information blocks.
- **Letter Spacing:** Apply slight negative tracking to larger display sizes to maintain a cohesive "locked-in" look, while keeping labels and body text at zero or slightly positive tracking for maximum clarity.

## Layout & Spacing

The layout philosophy follows a **fixed grid** approach for desktop views to maintain a "magazine" feel, while transitioning to fluid margins for mobile devices.

- **Grid:** A 12-column grid with a maximum width of 1200px.
- **Rhythm:** An 8pt spatial system is used for component-level spacing, while 20px/40px/64px increments are used for section-level layout to create distinct "beats" of content.
- **Negative Space:** Don't be afraid of large margins. Large vertical spacing (64px+) between sections is encouraged to prevent the interface from feeling cluttered.

## Elevation & Depth

Elevation in this design system is subtle and functional. We avoid heavy shadows in favor of **Tonal Layers** and **Low-contrast Outlines**.

- **Z-Axis:** Surfaces are layered using slight color shifts (White on Light Grey).
- **Shadows:** When necessary (e.g., dropdowns or modals), use an extremely diffused ambient shadow: `0px 10px 30px rgba(0,0,0,0.05)`.
- **Blur:** For navigation bars and floating overlays, use a `20px` backdrop-filter blur with an `80%` opacity white background to create a sense of context and depth without obscuring the content beneath.

## Shapes

The shape language is characterized by "Squircle" logic—smooth, intentional curves that feel organic yet engineered. 

- **Standard Radius:** 8px (0.5rem) for most buttons and input fields.
- **Large Radius:** 16px (1rem) for cards and container modules.
- **Extra Large Radius:** 24px (1.5rem) for featured banners or promotional sections.
- **Consistency:** Never mix sharp corners with rounded corners in the same component group.

## Components

- **Buttons:** Primary buttons use a solid blue fill. Secondary buttons must feature a **subtle gradient border** (Light Grey to Silver) with a transparent or white background. This is achieved using a border-image or a pseudo-element to maintain a "machined" look.
- **Input Fields:** Use a subtle `#D2D2D7` border that shifts to the primary blue on focus. The background should be transparent or white, never grey.
- **Cards:** Cards should be "borderless" with a subtle `#F5F5F7` background or a 1px soft stroke `#D2D2D7`. Avoid heavy shadows; rely on the background color for separation.
- **Chips/Tags:** Small, pill-shaped elements with a light grey background (`#F5F5F7`) and medium-weight text for categorization.
- **Navigation:** The global header should be persistent, utilizing the glassmorphic blur effect to remain unobtrusive yet accessible.