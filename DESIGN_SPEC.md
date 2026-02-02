# HiddenApply - Master Design & Functional Specification
**Version:** 1.1 (Functional Inventory Added)
**Status:** Ready for Design
**Target Audience:** Pro Product Managers, Engineers, and Designers looking for "secret" jobs.

---

## 1. Brand Identity & Vibe (The "Feel")
**Concept:** "The Insider's Tool."
The app should not feel like a generic job board. It should feel like a *secret weapon* or a *pro utility*. Think of it as the "Bloomberg Terminal for Job Seekers" but with the simplicity of Google Search.

*   **Keywords:** Precision, Speed, Exclusive, Minimalist, High-Trust.
*   **Visual Inspiration:**
    *   **Linear / Vercel**: High contrast, subtle borders, perfect typography.
    *   **Raycast**: Command-bar efficiency, keyboard-first feel.
    *   **Glassmorphism**: Subtle usage in the header/sticky elements.

---

## 2. Screen Inventory & Functional Requirements
This section details every screen, every input the user provides, and exactly what the UI must return.

### SCREEN 1: The Main Dashboard (Landing)
*State: Initial Load / Pre-Search*

**Goal:** Get the user to configure their "Search Dork" comfortably.

#### **A. Header Area**
*   **Outputs:**
    *   **Logo**: "HiddenApply" (Text + Icon).
    *   **Nav Links**: "How It Works".
    *   **CTA**: "Go Pro" button (Yellow/Gold gradient).

#### **B. Hero Area**
*   **Outputs:**
    *   **Headline**: "Uncover Hidden Remote Jobs Instantly."
    *   **Subtext**: Value prop explanation.
    *   **Live Badge**: "70+ Roles supported".

#### **C. The Link Engine (Input Form)**
*Container: A floating, heavy-shadow "Card" or "Island".*

**User Inputs (Controls):**
1.  **Role Selector** (Dropdown/Combobox):
    *   *User Action*: Selects from 70+ Presets (e.g., "Product Manager", "React Developer").
    *   *Feature*: Must allow grouping (Product, Eng, Design).
2.  **Custom Role Toggle** (Switch/Button):
    *   *User Action*: Clicks "Custom".
    *   *Interaction*: Swaps the Dropdown for a **Text Input**.
    *   *Input*: User types "Blockchain Developer".
3.  **Location Type** (Dropdown):
    *   *Options*: Remote, Hybrid, On-site, Specific, Any.
4.  **Specific Location Input** (Conditional):
    *   *Condition*: Appears ONLY if "Specific" is selected above.
    *   *Input*: User types "San Francisco" or "London".
5.  **Exclude Terms** (Text Input):
    *   *Input*: User types words to ban (e.g., "senior, lead, c++").
6.  **Time Range** (Dropdown):
    *   *Options*: 24h, 7d, 30d, etc.

**System Outputs:**
*   **Real-time Query Preview**: text block showing the generated dork in readable English.
    *   *Example*: "Searching for Product Manager jobs in Remote excluding 'senior'..."

---

### SCREEN 2: The Results Feed
*State: Post-Search (Appears below search box)*

**Goal:** Present the "Hidden" links clearly and ensure successful navigation despite browser blocks.

#### **A. Search Status**
*   **Outputs:**
    *   **Count**: "12 Platforms Found".
    *   **Warning Box**: Information about Google blocking automated queries.

#### **B. Platform Cards (The List)**
*Repeated Element (8-12 times)*

*   **Card Header**:
    *   **Platform Name**: "Greenhouse".
    *   **Domain**: "boards.greenhouse.io".
*   **Action Area (Outputs)**:
    *   **Primary Button (Green)**: "DuckDuckGo" (Safest, works 100%).
    *   **Secondary Button (Blue)**: "Bing".
    *   **Manual Action (Gray)**: "Copy Query" (Copies dork to clipboard).
    *   **Direct Link**: Icon link to the ATS home.
*   **Query Reveal**:
    *   *Interaction*: User clicks "View Query".
    *   *Output*: Displays the raw code: `site:greenhouse.io "Product Manager" ...`

#### **C. The "Pro" Gate (Bottom of Feed)**
*   **Condition**: Specific to Free users (Cards 9-12 are locked).
*   **Visual**: Blurred out card content.
*   **CTA**: "Unlock 4 more platforms with Pro".

---

### SCREEN 3: Share Modal
*State: Overlay when user clicks "Share"*

**Goal:** Viral growth.

*   **Inputs**:
    *   **Copy Button**: User clicks to copy link.
*   **Outputs**:
    *   **Generated URL**: `hiddenapply.com/?role=Product...`
    *   **Social Links**: "Post to X", "Post to LinkedIn" (Pre-filled text).

---

### SCREEN 4: Onboarding Tooltip
*State: First-time visitor overlay*

*   **Visual**: Popover pointing at the "Exclude" filter.
*   **Content**: "💡 **Pro Tip**: Exclude 'senior' to find entry-level jobs!"
*   **Input**: "Got it" button to dismiss.

---

## 3. UI Component Specifications (Design System)

### Colors
*   **Primary Background**: `#F8FAFC` (Slate 50) - Clean, not stark white.
*   **Surface (Cards)**: `#FFFFFF` (White) - With `shadow-lg`.
*   **Primary Brand**: `#2563EB` (Blue 600) - Main Buttons.
*   **Accent/Pro**: `#EAB308` (Yellow 500) - Upgrade CTAs.
*   **Safe Action**: `#059669` (Emerald 600) - DuckDuckGo buttons.

### Typography
*   **Headings**: *Inter* or *Geist Sans*. Tight tracking (`-0.02em`). Bold.
*   **Body**: *Inter*. Readable, high contrast.
*   **Code/Queries**: *JetBrains Mono* or *Fira Code*.

### State Requirements
1.  **Hover States**: All cards must lift (`translate-y-1`) or glow on hover.
2.  **Focus States**: Inputs need massive, accessible focus rings.
3.  **Loading**: The main Search button needs a "Processing" state (spinner + text change).

---

## 4. Mobile Responsiveness
*   **Constraint**: The "Filter Island" is too wide for mobile.
*   **Mobile Solution**: Stack inputs vertically in a single column 100% width.
*   **Results**: Cards stack vertically. Buttons inside cards wrap to 2 rows.

---

**Deliverables Required:**
1.  **High-Fidelity Mockups**: Desktop (1440px) and Mobile (375px).
2.  **Prototype**: Clickable flow from Landing -> input -> Search -> Result.
