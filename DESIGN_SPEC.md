# HiddenApply - Design Specification & Creative Brief
**Version:** 1.0 (The "10000x" Polish)
**Status:** Ready for Design
**Target Audience:** Pro Product Managers, Engineers, and Designers looking for "secret" jobs.

---

## 1. Brand Identity & Vibe
**Concept:** "The Insider's Tool."
The app should not feel like a generic job board. It should feel like a *secret weapon* or a *pro utility*. Think of it as the "Bloomberg Terminal for Job Seekers" but with the simplicity of Google Search.

*   **Keywords:** Precision, Speed, Exclusive, Minimalist, High-Trust.
*   **Visual Inspiration:**
    *   **Linear / Vercel**: High contrast, subtle borders, perfect typography.
    *   **Raycast**: Command-bar efficiency, keyboard-first feel.
    *   **Glassmorphism**: Subtle usage in the header/sticky elements to maintain context.

## 2. Color Palette System
The designer should refine these, but this is the starting direction for the "Pro" look.

### Primary (Trust & Action)
*   **Deep Blue (Brand)**: `#0F172A` (Slate 900) - For heavy text and primary backgrounds in "Dark Mode".
*   **Electric Blue (Action)**: `#2563EB` (Blue 600) - Primary buttons, links, and active states.
*   **Highlight Cyan**: `#06B6D4` (Cyan 500) - For subtle gradients or "freshness" indicators.

### Functional Colors
*   **Success (Greenhouse/Lever)**: `#059669` (Emerald 600) - "Open" signals or "DuckDuckGo" trust.
*   **Warning/Tip**: `#D97706` (Amber 600) - Pro tips and alerts.
*   **Pro Gold**: `#EAB308` (Yellow 500) - Gradients for the "Go Pro" button. strictly used for monetization features.

## 3. Typography
**Font Family:** *Geist Sans*, *Inter*, or *SF Pro Display*.
*   **Headings**: Tight tracking (letter-spacing: -0.02em), heavy weights (Bold/Extrabold).
*   **Data/Code**: *JetBrains Mono* or *Fira Code* for the actual "dork" queries (shows technical precision).

---

## 4. UI Component Specifications

### A. The "Hero" (First Impression)
The goal is to stop the user from scrolling.
*   **Typo**: Massive, centered text. "Uncover **Hidden** Jobs."
*   **Effect**: The word "Hidden" could have a subtle glowing underline or a "reveal" animation.
*   **Background**: Clean white/light gray with a very subtle "dot grid" pattern to suggest technical precision.
*   **Badge**: A "Live" pill badge showing "70+ Roles now active" pulsing green.

### B. The "Command Console" (Filter Section)
This is the core interaction. It shouldn't look like a standard HTML form. It should look like a **Control Panel**.
*   **Container**: floating "Island" design. Heavy shadow (`shadow-2xl`), rounded corners (`rounded-2xl`), white background.
*   **Inputs**:
    *   **Large Click Areas**: height `56px` or `64px` for inputs.
    *   **Icons**: Every input must have a leading icon (Briefcase for Role, Map Pin for Location).
    *   **Focus State**: When active, the input should have a thick, colored ring (Blue 500) or a glow.
*   **"Custom Role" Toggle**: Instead of a clunky button, design a sleek "Segmented Control" or "Toggle Switch" inside the input group.

### C. The "Search Reactor" (Action Button)
The "Find Hidden Jobs" button is the "Launch" button.
*   **State 1 (Idle)**: Large, wide button. Gradient Blue background. Icon: Search or Rocket.
*   **State 2 (Loading)**: The button transforms into a progress bar or spinner. Text: "Constructing Dorks..." "Bypassing Filters...".
*   **State 3 (Disabled)**: Clear opacity reduction.

### D. The "Results Stream" (Cards)
The results should feel like "cards" in a feed.
*   **Layout**: Grid (2 columns on Desktop, 1 on Mobile).
*   **Card Design**:
    *   **Header**: Platform Logo (Greenhouse leaf, Lever L) + Name.
    *   **Action Row**: The 4 buttons (DuckDuckGo, Bing, Google, Direct) need hierarchy.
        *   *Primary*: DuckDuckGo (Green/Safe). Large button.
        *   *Secondary*: Bing (Blue). Medium button.
        *   *Tertiary*: Google (Gray/Outlined). "Manual Copy" icon style.
    *   **The "Pro" Lock**: For locked platforms (9-12), design a beautiful "blurred" card with a Lock Icon and a "Unlock with Pro" CTA overlay.

### E. The Onboarding Tooltip
A "Guide" element.
*   **Style**: Dark popover (Inverse color scheme). Dark Slate background, white text.
*   **Position**: Pointing directly at the "Time Range" or "Exclude" filter.
*   **Animation**: Bobbing/bouncing up and down slightly to catch the eye.

---

## 5. Animation Guidelines (Motion Design)
*   **Entrance**: Results should "stagger" in (Card 1 appears, then Card 2, etc.) rather than appearing all at once.
*   **Hover**: Cards should lift slightly (`translate-y-1`) on hover.
*   **Feedback**: Clicking "Copy" should result in a satisfying "Checkmark" morph animation.

## 6. Mobile Responsiveness
*   **Bottom Sheet**: On mobile, the "Filters" could potentially be a sticky bottom bar or a drawer, rather than taking up the top half of the screen.
*   **Thumb Zone**: Ensure the "Search" button is always within easy thumb reach.

---

**Deliverables Required:**
1.  **High-Fidelity Mockups**: Desktop (1440px) and Mobile (375px).
2.  **Component Library**: Buttons, Inputs, Cards, Dropdowns (States: Default, Hover, Active, Disabled).
3.  **Icon Set**: Selection of consistency icons (Lucide or custom).
