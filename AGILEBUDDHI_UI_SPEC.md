# AgileBuddhi - UI Design Specification
## Nvidia-Inspired Design System

---

## 1. Brand Identity

### Logo Concept
- **Primary Logo**: Stylized "AB" with GPU-inspired geometric shape
- **Tagline**: "Intelligence Amplified"
- **Symbol**: Hexagonal chip/gear hybrid with green glow

### Logo Usage
```
Light Background:  Green logo (#76B900) on dark
Dark Background:   Green logo with subtle glow
Favicon:           Mini chip icon in green
Social:            Full logo with tagline
```

---

## 2. Color System

### Primary Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Nvidia Green | `#76B900` | 118, 185, 0 | Primary brand color |
| Deep Green | `#5A8F00` | 90, 143, 0 | Pressed state |
| Light Green | `#8AD100` | 138, 209, 0 | Hover state |
| Neon Green | `#00FF88` | 0, 255, 136 | Accent/highlights |
| Pulse Green | `#00CC6A` | 0, 204, 106 | Secondary accent |

### Background System

| Name | Hex | Usage |
|------|-----|-------|
| Void Black | `#000000` | True black sections |
| Deep Black | `#0D0D0D` | Main backgrounds |
| Carbon | `#121212` | Elevated surfaces |
| Graphite | `#1A1A1A` | Card backgrounds |
| Gunmetal | `#242424` | Input backgrounds |
| Steel | `#2D2D2D` | Borders, dividers |
| Slate | `#3D3D3D` | Disabled states |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Electric Blue | `#00D4FF` | Links, info |
| Cyber Purple | `#9D4EDD` | AI features |
| Warning Amber | `#FFB800` | Warnings |
| Alert Red | `#FF4444` | Errors |
| Success Cyan | `#00E5CC` | Success |

---

## 3. Typography

### Font Stack

```css
/* Display/Headings */
font-family: 'Rajdhani', 'Orbitron', sans-serif;

/* Body Text */
font-family: 'Inter', -apple-system, sans-serif;

/* Monospace/Code */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Style | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| Display | Rajdhani | 56px | 700 | 1.1 |
| H1 | Rajdhani | 40px | 600 | 1.2 |
| H2 | Rajdhani | 32px | 600 | 1.25 |
| H3 | Inter | 24px | 600 | 1.3 |
| H4 | Inter | 20px | 600 | 1.35 |
| Body Large | Inter | 16px | 400 | 1.6 |
| Body | Inter | 14px | 400 | 1.5 |
| Caption | Inter | 12px | 400 | 1.4 |
| Overline | Inter | 11px | 600 | 1.2 |

---

## 4. Spacing System

### Base Unit: 4px

```
4px    = 0.25rem   (space-1)
8px    = 0.5rem    (space-2)
12px   = 0.75rem   (space-3)
16px   = 1rem      (space-4)
20px   = 1.25rem   (space-5)
24px   = 1.5rem    (space-6)
32px   = 2rem      (space-8)
40px   = 2.5rem    (space-10)
48px   = 3rem      (space-12)
64px   = 4rem      (space-16)
```

---

## 5. Visual Effects

### Shadows

```css
/* Subtle */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);

/* Card */
shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);

/* Elevated */
shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);

/* Modal */
shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);

/* Green Glow */
shadow-glow: 0 0 20px rgba(118, 185, 0, 0.3);

/* Purple AI Glow */
shadow-ai: 0 0 20px rgba(157, 78, 221, 0.3);
```

### Gradients

```css
/* Background Gradient */
bg-gradient: linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%);

/* Hero Gradient */
hero-gradient: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%);

/* Card Gradient */
card-gradient: linear-gradient(180deg, #1F1F1F 0%, #1A1A1A 100%);

/* Green Accent */
accent-gradient: linear-gradient(90deg, #76B900 0%, #00FF88 100%);

/* AI Feature */
ai-gradient: linear-gradient(90deg, #9D4EDD 0%, #00D4FF 100%);

/* Mesh Gradient Background */
mesh-gradient: radial-gradient(at 40% 20%, rgba(118, 185, 0, 0.1) 0px, transparent 50%),
               radial-gradient(at 80% 0%, rgba(157, 78, 221, 0.1) 0px, transparent 50%),
               radial-gradient(at 0% 50%, rgba(0, 212, 255, 0.05) 0px, transparent 50%);
```

### Border Radius

```css
rounded-sm:   4px;   /* Inputs, small elements */
rounded-md:   6px;   /* Buttons, cards */
rounded-lg:   8px;   /* Modals, panels */
rounded-xl:   12px;  /* Large cards */
rounded-2xl:  16px;  /* Hero sections */
rounded-full: 9999px; /* Pills, avatars */
```

---

## 6. Component Specifications

### Buttons

#### Primary Button
```css
.btn-primary {
  background: #76B900;
  color: #0D0D0D;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #8AD100;
    box-shadow: 0 0 20px rgba(118, 185, 0, 0.4);
    transform: translateY(-1px);
  }
  
  &:active {
    background: #5A8F00;
    transform: translateY(0);
  }
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #76B900;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 6px;
  border: 1px solid #76B900;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(118, 185, 0, 0.1);
    box-shadow: 0 0 12px rgba(118, 185, 0, 0.2);
  }
}
```

#### AI Button (Special)
```css
.btn-ai {
  background: linear-gradient(90deg, #9D4EDD 0%, #00D4FF 100%);
  color: #FFFFFF;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: shimmer 2s infinite;
  }
  
  &:hover {
    box-shadow: 0 0 24px rgba(157, 78, 221, 0.5);
  }
}

@keyframes shimmer {
  100% { left: 100%; }
}
```

### Input Fields

```css
.input {
  background: #0D0D0D;
  border: 1px solid #3D3D3D;
  border-radius: 6px;
  color: #FFFFFF;
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: #4D4D4D;
  }
  
  &:hover {
    border-color: #4D4D4D;
  }
  
  &:focus {
    outline: none;
    border-color: #76B900;
    box-shadow: 0 0 0 3px rgba(118, 185, 0, 0.15);
  }
  
  &:disabled {
    background: #1A1A1A;
    color: #4D4D4D;
    cursor: not-allowed;
  }
}
```

### Cards

```css
.card {
  background: #1A1A1A;
  border: 1px solid #2D2D2D;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.25s ease;
  
  &:hover {
    border-color: #3D3D3D;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  &.card-interactive:hover {
    border-color: #76B900;
    box-shadow: 0 8px 32px rgba(118, 185, 0, 0.1);
    transform: translateY(-2px);
  }
  
  &.card-ai {
    border-color: rgba(157, 78, 221, 0.3);
    background: linear-gradient(180deg, rgba(157, 78, 221, 0.05) 0%, #1A1A1A 100%);
  }
}
```

### Badges & Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.badge-success {
    background: rgba(0, 255, 136, 0.15);
    color: #00FF88;
    border: 1px solid rgba(0, 255, 136, 0.3);
  }
  
  &.badge-ai {
    background: linear-gradient(90deg, rgba(157, 78, 221, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%);
    color: #9D4EDD;
    border: 1px solid rgba(157, 78, 221, 0.3);
  }
}
```

---

## 7. Animations

### Loading States

#### Skeleton Pulse
```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

.skeleton {
  background: linear-gradient(90deg, #1A1A1A 25%, #2D2D2D 50%, #1A1A1A 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
```

#### Green Pulse
```css
@keyframes green-pulse {
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(118, 185, 0, 0.4);
  }
  50% { 
    box-shadow: 0 0 20px 5px rgba(118, 185, 0, 0.2);
  }
}

.pulse-green {
  animation: green-pulse 2s ease-in-out infinite;
}
```

#### AI Processing
```css
@keyframes ai-processing {
  0% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
  100% { 
    background-position: 0% 50%;
  }
}

.ai-processing {
  background: linear-gradient(90deg, #9D4EDD, #00D4FF, #9D4EDD);
  background-size: 200% 100%;
  animation: ai-processing 2s linear infinite;
}
```

### Page Transitions

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fade-in-up 0.3s ease-out forwards;
}
```

---

## 8. Layout Patterns

### App Shell

```
┌────────────────────────────────────────────────────────────────────┐
│ TOPBAR (56px)                                                      │
│ ┌──────┬────────────────────────────────────────────┬────────────┐ │
│ │ LOGO │  Search [Ctrl+K]           │ [AI] [🔔] [👤]│            │ │
│ └──────┴────────────────────────────────────────────┴────────────┘ │
├─────────┬──────────────────────────────────────────────────────────┤
│ SIDEBAR │  MAIN CONTENT                                            │
│ (240px) │  ┌────────────────────────────────────────────────────┐ │
│         │  │ Header: Page Title + Actions                       │ │
│ ┌─────┐ │  ├────────────────────────────────────────────────────┤ │
│ │Apps │ │  │                                                    │ │
│ │Menu │ │  │                                                    │ │
│ │     │ │  │              Content Area                          │ │
│ │     │ │  │                                                    │ │
│ │     │ │  │                                                    │ │
│ └─────┘ │  └────────────────────────────────────────────────────┘ │
├─────────┴──────────────────────────────────────────────────────────┤
│ AI Panel (Collapsible, 360px width when open)                     │
└────────────────────────────────────────────────────────────────────┘
```

### Dashboard Grid
```
Desktop:     12-column grid, 24px gap
Tablet:      8-column grid, 16px gap
Mobile:      4-column grid, 12px gap
```

### Responsive Breakpoints
```css
sm: 640px;   /* Mobile landscape */
md: 768px;   /* Tablet */
lg: 1024px;  /* Desktop */
xl: 1280px;  /* Large desktop */
2xl: 1536px; /* Wide screen */
```

---

## 9. Icon System

### Icon Style
- Stroke-based icons (1.5px stroke)
- Rounded corners on line ends
- Consistent 24x24px viewBox

### Custom Icon Categories

#### Module Icons
- CRM: Customer/person with connection
- Sales: Chart with upward trend
- Inventory: Box/package
- Project: Kanban board
- HR: People/group
- Accounting: Calculator/coins
- Marketing: Megaphone
- Helpdesk: Headset/chat

#### AI Icons
- Sparkle/brain: AI-powered
- Robot face: AI assistant
- Lightning: AI automation
- Document scan: AI analysis

---

## 10. Dark Mode Implementation

### CSS Variables Approach
```css
:root {
  /* Light mode (optional) */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --text-primary: #0D0D0D;
}

[data-theme="dark"] {
  /* Default dark mode */
  --bg-primary: #0D0D0D;
  --bg-secondary: #1A1A1A;
  --text-primary: #FFFFFF;
  --text-secondary: #B3B3B3;
  --border: #2D2D2D;
  --accent: #76B900;
  --accent-glow: rgba(118, 185, 0, 0.3);
}
```

---

## 11. Accessibility

### Color Contrast
- Primary text: #FFFFFF on #0D0D0D (Ratio: 19:1)
- Secondary text: #B3B3B3 on #0D0D0D (Ratio: 8.7:1)
- Links: #00D4FF on #0D0D0D (Ratio: 9.5:1)
- All WCAG AAA compliant

### Focus States
```css
*:focus-visible {
  outline: 2px solid #76B900;
  outline-offset: 2px;
}
```

---

## 12. Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        nvidia: {
          green: '#76B900',
          'green-light': '#8AD100',
          'green-dark': '#5A8F00',
          neon: '#00FF88',
        },
        surface: {
          black: '#0D0D0D',
          carbon: '#1A1A1A',
          graphite: '#242424',
          steel: '#2D2D2D',
        },
        accent: {
          blue: '#00D4FF',
          purple: '#9D4EDD',
          amber: '#FFB800',
          red: '#FF4444',
        }
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(118, 185, 0, 0.3)',
        'glow-lg': '0 0 40px rgba(118, 185, 0, 0.4)',
        'ai-glow': '0 0 20px rgba(157, 78, 221, 0.3)',
      },
      animation: {
        'pulse-green': 'green-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      }
    }
  }
}
```

---

## 13. Component Examples

### KPI Card
```
┌─────────────────────────────────────────┐
│ ┌─────┐                                 │
│ │ 📊  │  Monthly Revenue                │
│ └─────┘                                 │
│                                         │
│ $124,500                                │
│ ▲ +12.5% vs last month                 │
│                                         │
│ ████████████░░░░░░░░ 75% of target     │
└─────────────────────────────────────────┘
```

### AI Insight Card
```
┌────────────────────────────────────────────────────┐
│ 🤖 AI Insight                                     │
│                                                    │
│ 3 leads have high conversion probability         │
│                                                    │
│ ─────────────────────────────────────────────     │
│                                                    │
│ • Acme Corp - 92% (New)                           │
│ • TechStart Inc - 87% (Proposal)                  │
│ • GlobalTech - 81% (Negotiation)                 │
│                                                    │
│ [View All Leads]                                  │
└────────────────────────────────────────────────────┘
```

### Data Table Row
```
┌──────────────────────────────────────────────────────────────┐
│ ☐ │ John Doe │ john@company.com │ $1,200 │ [View] [Edit]  │
└──────────────────────────────────────────────────────────────┘
  Hover: Row background → #242424
  Selected: Left border 3px #76B900
```

---

*End of UI Design Specification*
