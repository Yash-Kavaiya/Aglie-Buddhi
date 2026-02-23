# Aglie-Buddhi

> Multi-project workspace for **Agile Buddhi** products:
> 1) a DevOps AI Agents web app, and 2) a Remotion promo video project.

## 📦 Repository Structure

```text
Aglie-Buddhi/
├─ devops-ai-agents/   # React + Vite app (8 DevOps AI agents + MCP dashboard)
├─ my-video/           # Remotion project for promo video rendering
└─ README.md
```

---

## 1) DevOps AI Agents (`devops-ai-agents`)

A modern frontend for interacting with specialized DevOps AI personas.

### ✨ Highlights
- 8 specialized agents:
  - CI/CD
  - Infrastructure
  - Monitoring
  - Security
  - Container
  - Cloud
  - Config
  - Incident
- Agent-specific chat interface
- MCP (Model Context Protocol) dashboard and server compatibility mapping
- Responsive dashboard UI (Google Material-inspired)
- Mock API response layer for local development
- Test suite with Vitest + Testing Library + property tests (`fast-check`)

### 🧰 Tech Stack
- React 19 + TypeScript
- Vite 7
- React Router
- Tailwind CSS v4
- Vitest + Testing Library

### 🚀 Run Locally
```bash
cd devops-ai-agents
npm install
npm run dev
```
Open the Vite URL shown in terminal (usually `http://localhost:5173`).

### 🧪 Tests
```bash
npm run test
```

### 📜 Scripts
- `npm run dev` – start dev server
- `npm run build` – type-check + production build
- `npm run preview` – preview built app
- `npm run test` – run tests once
- `npm run test:watch` – run tests in watch mode

---

## 2) Promo Video (`my-video`)

Remotion-based vertical promo video composition for Agile Buddhi branding.

### ✨ Highlights
- Composition: `PromoVideo`
- Format: **1080x1920** (vertical)
- Duration: **360 frames @ 30 FPS** (~12 seconds)
- 3 scenes:
  1. Logo reveal
  2. Animated feature bullets
  3. CTA pulse sequence

### 🧰 Tech Stack
- Remotion
- React + TypeScript

### 🚀 Run Locally
```bash
cd my-video
npm install
npm run studio
```

### 🎬 Render Video
```bash
npm run render
```
Output file:

```text
my-video/out/promo.mp4
```

---

## ✅ Prerequisites
- Node.js **20+** recommended
- npm

---

## 🛣️ Suggested Next Steps
- Add backend integration for real agent responses in `devops-ai-agents`
- Add `.env.example` and API config docs
- Add CI workflow for tests + builds
- Publish demo screenshots/GIF in README

---

## 📄 License
No explicit license is currently defined for this repo. Add a `LICENSE` file before external distribution.
