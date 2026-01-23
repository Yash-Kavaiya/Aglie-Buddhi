# SVG Summary Page Creator Skill

> **name:** svg-summary-page  
> **description:** Create beautiful, professional 1-page SVG visual summaries and infographics. Use this skill when users request visual summaries, infographics, one-pagers, visual abstracts, concept maps, or any single-page visual representation of information. Ideal for summarizing documents, articles, concepts, processes, comparisons, or any content that benefits from visual representation. Outputs clean, scalable .svg files.

---

## Overview

Create stunning 1-page visual summaries as scalable SVG files. These summaries transform complex information into beautiful, scannable visual documents.

---

## Core Principles

### Visual Hierarchy
- **Title**: Large, bold, top-center (24-36px)
- **Sections**: Clear visual separation with cards, dividers, or color blocks
- **Key Points**: Icons + short text (max 8-10 words per point)
- **Data**: Charts, numbers, or visual metrics when applicable

### Design Standards
| Property | Value |
|----------|-------|
| Canvas (Portrait) | 800x1200px |
| Canvas (Landscape) | 1200x800px |
| Margins | 40px minimum on all sides |
| Color Palette | 3-5 colors max (1 primary, 1 accent, 2-3 neutrals) |
| Typography | Sans-serif fonts (Arial, Helvetica, system fonts) |
| Spacing | Consistent 20px gaps between elements |

---

## Layout Patterns

### Pattern 1: Header + Grid
**Best for:** Lists, features, comparisons

```
┌──────────────────────────────┐
│         TITLE                │
│       Subtitle/tagline       │
├──────────┬──────────┬────────┤
│  Card 1  │  Card 2  │ Card 3 │
├──────────┼──────────┼────────┤
│  Card 4  │  Card 5  │ Card 6 │
└──────────┴──────────┴────────┘
```

### Pattern 2: Hero + Sections
**Best for:** Processes, timelines

```
┌──────────────────────────────┐
│    HERO VISUAL + TITLE       │
├──────────────────────────────┤
│  Step 1  →  Step 2  →  Step 3│
├──────────────────────────────┤
│       Key Takeaways          │
└──────────────────────────────┘
```

### Pattern 3: Central + Radial
**Best for:** Concepts, relationships

```
┌──────────────────────────────┐
│           TITLE              │
│    ┌───┐     ┌───┐          │
│    │ A ├──┬──┤ B │          │
│    └───┘  │  └───┘          │
│      ┌────┴────┐            │
│      │ CENTRAL │            │
│      └────┬────┘            │
│    ┌───┐  │  ┌───┐          │
│    │ C ├──┴──┤ D │          │
│    └───┘     └───┘          │
└──────────────────────────────┘
```

### Pattern 4: Stats Dashboard
**Best for:** Metrics, KPIs, data

```
┌──────────────────────────────┐
│           TITLE              │
├────────┬────────┬────────────┤
│  BIG   │  BIG   │   BIG      │
│ NUMBER │ NUMBER │  NUMBER    │
├────────┴────────┴────────────┤
│    Chart or Visualization    │
├──────────────────────────────┤
│      Insights / Notes        │
└──────────────────────────────┘
```

---

## SVG Base Template

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
  <defs>
    <!-- Gradient for header -->
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4F46E5"/>
      <stop offset="100%" style="stop-color:#7C3AED"/>
    </linearGradient>
    
    <!-- Shadow filter for cards -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.1"/>
    </filter>
    
    <!-- Arrow marker for flow diagrams -->
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#CBD5E1"/>
    </marker>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="1200" fill="#F8FAFC"/>
  
  <!-- Header Section -->
  <rect x="0" y="0" width="800" height="180" fill="url(#headerGrad)"/>
  <text x="400" y="80" text-anchor="middle" font-family="Arial, sans-serif" 
        font-size="36" font-weight="bold" fill="white">TITLE HERE</text>
  <text x="400" y="120" text-anchor="middle" font-family="Arial, sans-serif" 
        font-size="16" fill="rgba(255,255,255,0.85)">Subtitle or tagline</text>
  <text x="400" y="155" text-anchor="middle" font-family="Arial, sans-serif" 
        font-size="12" fill="rgba(255,255,255,0.6)">Category • Date • Source</text>
  
  <!-- Content Sections go here -->
  
  <!-- Footer -->
  <text x="400" y="1180" text-anchor="middle" font-family="Arial, sans-serif" 
        font-size="11" fill="#94A3B8">Generated Summary</text>
</svg>
```

---

## Visual Elements Library

### Cards with Shadow

```xml
<g filter="url(#shadow)">
  <rect x="40" y="200" width="220" height="140" rx="12" fill="white"/>
  <circle cx="80" cy="240" r="20" fill="#4F46E5"/>
  <text x="60" y="290" font-family="Arial" font-size="14" font-weight="600" fill="#1E293B">Card Title</text>
  <text x="60" y="315" font-family="Arial" font-size="12" fill="#64748B">Description text here</text>
</g>
```

### Metric Boxes

```xml
<g>
  <rect x="40" y="180" width="160" height="100" rx="8" fill="#EEF2FF"/>
  <text x="120" y="230" text-anchor="middle" font-family="Arial" 
        font-size="36" font-weight="bold" fill="#4F46E5">87%</text>
  <text x="120" y="260" text-anchor="middle" font-family="Arial" 
        font-size="12" fill="#64748B">Success Rate</text>
</g>
```

### Process Steps with Arrows

```xml
<!-- Step Box -->
<g>
  <rect x="0" y="0" width="160" height="80" rx="8" fill="#4F46E5"/>
  <text x="80" y="35" text-anchor="middle" font-family="Arial" 
        font-size="11" fill="rgba(255,255,255,0.8)">STEP 1</text>
  <text x="80" y="55" text-anchor="middle" font-family="Arial" 
        font-size="14" font-weight="600" fill="white">Start Here</text>
</g>

<!-- Arrow connector -->
<path d="M175 40 L210 40" stroke="#CBD5E1" stroke-width="2" marker-end="url(#arrowhead)"/>
```

### Callout Box

```xml
<g transform="translate(40, 870)">
  <rect x="0" y="0" width="720" height="100" rx="12" fill="#F0F9FF" stroke="#0EA5E9" stroke-width="2"/>
  <circle cx="40" cy="50" r="20" fill="#0EA5E9"/>
  <text x="40" y="56" text-anchor="middle" font-family="Arial" font-size="18" fill="white">💡</text>
  <text x="80" y="40" font-family="Arial" font-size="14" font-weight="600" fill="#0C4A6E">Key Takeaway</text>
  <text x="80" y="62" font-family="Arial" font-size="13" fill="#0369A1">Important insight text here.</text>
</g>
```

### Section Header with Underline

```xml
<text x="40" y="350" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1E293B">Section Title</text>
<rect x="40" y="360" width="60" height="3" rx="1.5" fill="#4F46E5"/>
```

### Number Badge

```xml
<g>
  <circle cx="40" cy="40" r="24" fill="#EEF2FF"/>
  <text x="40" y="46" text-anchor="middle" font-family="Arial" font-size="20" fill="#4F46E5">1</text>
</g>
```

---

## Color Palettes

### Professional Blue
| Role | Color |
|------|-------|
| Primary | `#2563EB` |
| Accent | `#F59E0B` |
| Background | `#F8FAFC` |
| Text | `#1E293B` |
| Muted | `#64748B` |

### Modern Purple
| Role | Color |
|------|-------|
| Primary | `#7C3AED` |
| Accent | `#10B981` |
| Background | `#FAFAFA` |
| Text | `#18181B` |
| Muted | `#71717A` |

### Warm Coral
| Role | Color |
|------|-------|
| Primary | `#F43F5E` |
| Accent | `#06B6D4` |
| Background | `#FFFBEB` |
| Text | `#292524` |
| Muted | `#78716C` |

### Dark Mode
| Role | Color |
|------|-------|
| Primary | `#818CF8` |
| Accent | `#34D399` |
| Background | `#1E293B` |
| Text | `#F1F5F9` |
| Muted | `#94A3B8` |

### Metric Color Backgrounds
| Type | Background | Text |
|------|------------|------|
| Blue/Default | `#EEF2FF` | `#4F46E5` |
| Green/Success | `#F0FDF4` | `#10B981` |
| Yellow/Warning | `#FEF3C7` | `#F59E0B` |
| Pink/Highlight | `#FCE7F3` | `#EC4899` |
| Cyan/Info | `#F0F9FF` | `#0EA5E9` |

---

## Icons Library

All icons designed for 24x24 viewBox. Wrap in `<g transform="translate(x,y) scale(s)">` to position and resize.

### Checkmark / Success
```xml
<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
```

### Lightbulb / Idea
```xml
<path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26A7 7 0 0012 2zM9 21h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
```

### Star / Important
```xml
<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
```

### Arrow Right
```xml
<path d="M5 12h14m-7-7l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
```

### Arrow Up / Increase
```xml
<path d="M12 19V5m-7 7l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
```

### Chart / Data
```xml
<path d="M3 3v18h18M7 16v-4m4 4V8m4 8v-6m4 6V6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
```

### Document / File
```xml
<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M14 2v6h6M16 13H8m8 4H8m2-8H8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
```

### User / Person
```xml
<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
```

### Clock / Time
```xml
<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M12 6v6l4 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
```

### Target / Goal
```xml
<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="2"/>
```

### Warning / Alert
```xml
<path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
```

### Zap / Fast
```xml
<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
```

### Globe / World
```xml
<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke="currentColor" stroke-width="2"/>
```

### Plus
```xml
<path d="M12 5v14m-7-7h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
```

### X / Close
```xml
<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
```

---

## Workflow

1. **Analyze Content**: Identify key points, hierarchy, relationships
2. **Choose Layout**: Select pattern based on content type
3. **Select Palette**: Pick colors matching tone
4. **Build Structure**: Create SVG with proper viewBox and defs
5. **Add Elements**: Header → Main content → Footer
6. **Refine**: Check alignment, spacing, legibility
7. **Export**: Save as `.svg` file

---

## Quality Checklist

- [ ] Title is clear and prominent
- [ ] Information hierarchy is obvious
- [ ] Color palette is consistent (max 5 colors)
- [ ] All text is legible (min 11px body, 14px labels)
- [ ] Visual elements are aligned
- [ ] White space provides breathing room
- [ ] No overlapping elements
- [ ] Valid SVG with proper xmlns

---

## Quick Reference

For a topic summary, aim for:
- **1 title** (bold, 24-36px)
- **1 subtitle** (muted, 14-16px)
- **3-6 key points** with icons
- **1-2 data highlights** (big numbers)
- **1 conclusion/takeaway**

**Keep total word count under 150. Let visuals carry the message.**

---

## Complete Example Template

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
  <defs>
    <!-- Gradient for header -->
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4F46E5"/>
      <stop offset="100%" style="stop-color:#7C3AED"/>
    </linearGradient>
    
    <!-- Shadow filter for cards -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.1"/>
    </filter>
    
    <!-- Arrow marker -->
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#CBD5E1"/>
    </marker>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="1200" fill="#F8FAFC"/>
  
  <!-- Header Section -->
  <rect x="0" y="0" width="800" height="180" fill="url(#headerGrad)"/>
  <text x="400" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="white">Summary Title</text>
  <text x="400" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.85)">A brief subtitle or tagline goes here</text>
  <text x="400" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.6)">Category • Date • Source</text>
  
  <!-- Stats Row -->
  <g transform="translate(40, 210)">
    <!-- Stat 1 -->
    <g>
      <rect x="0" y="0" width="220" height="90" rx="12" fill="#EEF2FF"/>
      <text x="110" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#4F46E5">85%</text>
      <text x="110" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748B">First Metric</text>
    </g>
    <!-- Stat 2 -->
    <g transform="translate(250, 0)">
      <rect x="0" y="0" width="220" height="90" rx="12" fill="#F0FDF4"/>
      <text x="110" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#10B981">2.4x</text>
      <text x="110" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748B">Second Metric</text>
    </g>
    <!-- Stat 3 -->
    <g transform="translate(500, 0)">
      <rect x="0" y="0" width="220" height="90" rx="12" fill="#FEF3C7"/>
      <text x="110" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#F59E0B">12K</text>
      <text x="110" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748B">Third Metric</text>
    </g>
  </g>
  
  <!-- Section Title -->
  <text x="40" y="350" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1E293B">Key Points</text>
  <rect x="40" y="360" width="60" height="3" rx="1.5" fill="#4F46E5"/>
  
  <!-- Key Points Cards -->
  <g transform="translate(40, 390)">
    <!-- Card 1 -->
    <g filter="url(#shadow)">
      <rect x="0" y="0" width="340" height="120" rx="12" fill="white"/>
      <circle cx="40" cy="40" r="24" fill="#EEF2FF"/>
      <text x="40" y="46" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#4F46E5">1</text>
      <text x="80" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#1E293B">First Key Point</text>
      <text x="80" y="55" font-family="Arial, sans-serif" font-size="12" fill="#64748B">Brief explanation of this important</text>
      <text x="80" y="72" font-family="Arial, sans-serif" font-size="12" fill="#64748B">point in two lines maximum.</text>
    </g>
    
    <!-- Card 2 -->
    <g transform="translate(380, 0)" filter="url(#shadow)">
      <rect x="0" y="0" width="340" height="120" rx="12" fill="white"/>
      <circle cx="40" cy="40" r="24" fill="#F0FDF4"/>
      <text x="40" y="46" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#10B981">2</text>
      <text x="80" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#1E293B">Second Key Point</text>
      <text x="80" y="55" font-family="Arial, sans-serif" font-size="12" fill="#64748B">Another important insight that</text>
      <text x="80" y="72" font-family="Arial, sans-serif" font-size="12" fill="#64748B">supports the main message.</text>
    </g>
    
    <!-- Card 3 -->
    <g transform="translate(0, 140)" filter="url(#shadow)">
      <rect x="0" y="0" width="340" height="120" rx="12" fill="white"/>
      <circle cx="40" cy="40" r="24" fill="#FEF3C7"/>
      <text x="40" y="46" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#F59E0B">3</text>
      <text x="80" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#1E293B">Third Key Point</text>
      <text x="80" y="55" font-family="Arial, sans-serif" font-size="12" fill="#64748B">Critical information that helps</text>
      <text x="80" y="72" font-family="Arial, sans-serif" font-size="12" fill="#64748B">readers understand the topic.</text>
    </g>
    
    <!-- Card 4 -->
    <g transform="translate(380, 140)" filter="url(#shadow)">
      <rect x="0" y="0" width="340" height="120" rx="12" fill="white"/>
      <circle cx="40" cy="40" r="24" fill="#FCE7F3"/>
      <text x="40" y="46" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#EC4899">4</text>
      <text x="80" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#1E293B">Fourth Key Point</text>
      <text x="80" y="55" font-family="Arial, sans-serif" font-size="12" fill="#64748B">Final point that rounds out</text>
      <text x="80" y="72" font-family="Arial, sans-serif" font-size="12" fill="#64748B">the complete picture.</text>
    </g>
  </g>
  
  <!-- Process Flow Section -->
  <text x="40" y="710" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1E293B">Process Overview</text>
  <rect x="40" y="720" width="60" height="3" rx="1.5" fill="#4F46E5"/>
  
  <!-- Process Steps -->
  <g transform="translate(40, 750)">
    <!-- Step 1 -->
    <g>
      <rect x="0" y="0" width="160" height="80" rx="8" fill="#4F46E5"/>
      <text x="80" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="rgba(255,255,255,0.8)">STEP 1</text>
      <text x="80" y="55" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="white">Start Here</text>
    </g>
    <!-- Arrow 1 -->
    <path d="M175 40 L210 40" stroke="#CBD5E1" stroke-width="2" marker-end="url(#arrowhead)"/>
    
    <!-- Step 2 -->
    <g transform="translate(225, 0)">
      <rect x="0" y="0" width="160" height="80" rx="8" fill="#7C3AED"/>
      <text x="80" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="rgba(255,255,255,0.8)">STEP 2</text>
      <text x="80" y="55" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="white">Process</text>
    </g>
    <!-- Arrow 2 -->
    <path d="M400 40 L435 40" stroke="#CBD5E1" stroke-width="2" marker-end="url(#arrowhead)"/>
    
    <!-- Step 3 -->
    <g transform="translate(450, 0)">
      <rect x="0" y="0" width="160" height="80" rx="8" fill="#10B981"/>
      <text x="80" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="rgba(255,255,255,0.8)">STEP 3</text>
      <text x="80" y="55" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="white">Complete</text>
    </g>
  </g>
  
  <!-- Callout Box -->
  <g transform="translate(40, 870)">
    <rect x="0" y="0" width="720" height="100" rx="12" fill="#F0F9FF" stroke="#0EA5E9" stroke-width="2"/>
    <circle cx="40" cy="50" r="20" fill="#0EA5E9"/>
    <text x="40" y="56" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="white">💡</text>
    <text x="80" y="40" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#0C4A6E">Key Takeaway</text>
    <text x="80" y="62" font-family="Arial, sans-serif" font-size="13" fill="#0369A1">The most important insight from this summary that readers should remember.</text>
    <text x="80" y="82" font-family="Arial, sans-serif" font-size="13" fill="#0369A1">This drives home the main message.</text>
  </g>
  
  <!-- Footer -->
  <rect x="0" y="1010" width="800" height="190" fill="#1E293B"/>
  <text x="400" y="1060" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="white">Ready to Learn More?</text>
  <text x="400" y="1090" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#94A3B8">Visit the source for complete details and additional resources.</text>
  
  <!-- Footer Links -->
  <g transform="translate(200, 1120)">
    <rect x="0" y="0" width="180" height="40" rx="8" fill="#4F46E5"/>
    <text x="90" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="white">Get Started →</text>
  </g>
  <g transform="translate(420, 1120)">
    <rect x="0" y="0" width="180" height="40" rx="8" fill="transparent" stroke="#64748B" stroke-width="1"/>
    <text x="90" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#94A3B8">Learn More</text>
  </g>
  
  <text x="400" y="1185" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#64748B">Generated Summary • Replace with actual source attribution</text>
</svg>
```

---

## Usage Examples

### Example 1: Summarize an Article
> "Create a visual summary of this article about climate change"

→ Use **Pattern 1: Header + Grid** with key facts as cards

### Example 2: Explain a Process
> "Make an infographic showing how to set up a development environment"

→ Use **Pattern 2: Hero + Sections** with step-by-step flow

### Example 3: Compare Options
> "Create a one-pager comparing React vs Vue vs Angular"

→ Use **Pattern 1: Header + Grid** with comparison cards

### Example 4: Show Metrics
> "Visualize our Q4 sales performance"

→ Use **Pattern 4: Stats Dashboard** with big numbers and charts
