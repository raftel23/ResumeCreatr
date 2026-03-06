# ResumeCreatr

A professional, privacy-first **React + Vite** resume builder with real-time preview and 5 beautiful templates.

## Features

- ✨ **5 Resume Templates** — Classic, Minimalist, Executive, Creative, Technical
- ⚡ **Real-time Preview** — See changes as you type
- 🔒 **100% Private** — All data stays in your browser
- 🖨️ **Print / PDF Export** — One-click print-to-PDF
- 📱 **Collapsible Sections** — Clean, organized editor

## Tech Stack

- **React 19** + **Vite 7** (SWC)
- Vanilla CSS with custom property theming
- No external state library — `useResumeStore` custom hook

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Branch Strategy

| Branch | Purpose |
|---|---|
| `Development` | Active development, feature work |
| `Production` | Stable, production-ready releases |

## Project Structure

```
src/
├── hooks/
│   └── useResumeStore.js   # Global state hook
├── components/
│   ├── EditorPanel.jsx     # Left editor pane
│   ├── ControlsBar.jsx     # Template selector + print
│   ├── PersonalInfoForm.jsx
│   ├── DynamicSection.jsx  # Generic list section (DRY)
│   ├── SkillsForm.jsx
│   ├── ResumePreview.jsx   # Right preview pane
│   └── ResumeDocument.jsx  # Pure resume renderer
├── App.jsx
├── main.jsx
└── index.css               # All styles + 5 theme variables
```
