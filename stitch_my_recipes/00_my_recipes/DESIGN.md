---
name: Culinary Zen
colors:
  surface: '#f7faf4'
  surface-dim: '#d8dbd5'
  surface-bright: '#f7faf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5ee'
  surface-container: '#ecefe9'
  surface-container-high: '#e6e9e3'
  surface-container-highest: '#e0e3dd'
  on-surface: '#181d19'
  on-surface-variant: '#404940'
  inverse-surface: '#2d312d'
  inverse-on-surface: '#eff2eb'
  outline: '#707a6f'
  outline-variant: '#c0c9bd'
  surface-tint: '#266b3b'
  primary: '#236939'
  on-primary: '#ffffff'
  primary-container: '#3e824f'
  on-primary-container: '#f7fff3'
  inverse-primary: '#90d79c'
  secondary: '#4a654e'
  on-secondary: '#ffffff'
  secondary-container: '#cceacd'
  on-secondary-container: '#506b54'
  tertiary: '#9aa09a'
  on-tertiary: '#ffffff'
  tertiary-container: '#ac5c6d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#abf3b6'
  primary-fixed-dim: '#90d79c'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#035225'
  secondary-fixed: '#cceacd'
  secondary-fixed-dim: '#b1ceb2'
  on-secondary-fixed: '#07200f'
  on-secondary-fixed-variant: '#334d37'
  tertiary-fixed: '#ffd9de'
  tertiary-fixed-dim: '#ffb1bf'
  on-tertiary-fixed: '#3d0416'
  on-tertiary-fixed-variant: '#743041'
  background: '#f7faf4'
  on-background: '#181d19'
  surface-variant: '#e0e3dd'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  base: 8px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  margin-mobile: 16px
  margin-desktop: 40px
  gutter: 24px
  container-max: 1200px
---

## Brand & Style

Culinary Zen embodies a **Modern Minimalist** aesthetic with a strong **Editorial** influence. The brand personality is mindful, sophisticated, and organic, catering to a home cook who values clarity and quality over complexity.

The visual style leverages significant whitespace, high-quality culinary photography, and a refined palette of meadow greens and soft floral accents to evoke a sense of calm. It blends the structural reliability of a functional cooking app with the elegant pacing of a premium food magazine. Interaction is characterized by "soft" transitions (like the hover-lift effect) and tactile feedback that reinforces a premium, intentional user experience.

## Colors

The palette is rooted in nature, using a base of **Warm Off-Whites** (`#fbf9f8`) and fresh greens to maintain an organic, living feel. 

- **Primary (Meadow Green):** `#418552` is used for brand identity, primary actions, and active states. It signals growth and freshness.
- **Secondary (Muted Sage):** `#637e66` is used for supporting text and icons, providing enough contrast for legibility while maintaining the muted organic tone.
- **Tertiary (Soft Stone):** A light grey `#9aa09a` — lighter than the neutral stone (`#747873`) — used sparingly for de-emphasized hint text and subtle borders.
- **Neutral/Surface:** A range of stone tones derived from `#747873` are used for borders and container backgrounds to create subtle structural separation.

## Typography

The system uses a sophisticated pairing of fonts:
1. **Playfair Display:** Used for main headlines and brand titles to provide a high-contrast, editorial feel.
2. **Inter:** The functional workhorse used for all body text, UI labels, and data points to ensure maximum readability and a clean, modern interface.

Hierarchies are strictly enforced through uppercase tracking on labels and generous line heights on body copy to ensure a "breathable" reading experience for long-form instructions.

## Layout & Spacing

The system follows a **Fixed-Width Container** model on desktop (max 1200px) with fluid adaptation for mobile.

- **Asymmetric Grid:** On desktop, use a 12-column grid. Recipe layouts utilize an asymmetric split (e.g., a 4-column sidebar for ingredients and an 8-column main area for instructions) to create visual interest.
- **Vertical Rhythm:** Large sections are separated by `xl` (80px) spacing to denote distinct content shifts.
- **Negative Margin:** Use negative top margins (e.g., -48px) for primary content cards to overlap hero imagery, creating depth and a "layered" look.

## Elevation & Depth

Culinary Zen avoids traditional heavy shadows in favor of **Tonal Layers** and **Subtle Interactivity**.

- **Surface Tiers:** Depth is established by placing `surface-container-lowest` (pure white) cards on top of `background-warm` surfaces.
- **Borders over Shadows:** Fine, 1px borders in `#c3c8c1` are the primary method of element containment.
- **Interactive Depth:** Only interactive cards use the "Hover Lift" effect: a subtle translation upward (-2px) combined with an extremely diffused, tinted shadow to suggest tactility without breaking the minimalist aesthetic.

## Shapes

The shape language is **Soft and Organic**. 
- **Standard Corners:** Most containers and cards use a 1rem (`rounded-lg`) radius to feel approachable.
- **Pills:** All tags, badges, and primary buttons use full pill rounding or `rounded-full` to contrast against the more structured content cards.
- **Images:** Food photography should always be housed in `rounded-xl` (1.5rem) containers to maintain the soft-focus brand feel.

## Components

- **Buttons:** Primary buttons are solid-fill (Meadow Green) with pill-shaped corners and `label-lg` typography. They transition to a slightly more saturated green on hover.
- **Cards:** White backgrounds, 1px border, `rounded-lg` corners. Cards may include a `hover-lift` class for interactivity.
- **Checkboxes:** Custom-styled square inputs (4px radius). When checked, they fill with the primary color and trigger a `line-through` and color-dimming effect on the associated label text.
- **Tags/Chips:** Small, low-contrast background (`surface-variant`) or the tertiary blossom color for highlight tags, using uppercase `label-sm` text.
- **Lists:** Ingredient lists use `sm` (12px) internal spacing and a subtle hover state that changes the row background to a faint stone grey.
- **Hero Units:** Full-width or container-width high-bleed imagery with a distinctive floating "Stats Card" that uses backdrop-blur and transparency.