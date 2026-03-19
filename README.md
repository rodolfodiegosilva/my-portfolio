<div align="center">

# Rodolfo Silva — Personal Portfolio

A modern, responsive personal portfolio built with **React 19 + Vite + TypeScript**, featuring dark/light theming, full internationalization (EN/PT), a live GitHub dashboard, and automated CI/CD deployment on AWS Amplify.

[![Live](https://img.shields.io/badge/Live-rodolfo--silva.com-2ea8ff?style=for-the-badge&logo=amazonaws)](https://rodolfo-silva.com)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![AWS Amplify](https://img.shields.io/badge/AWS-Amplify-ff9900?style=for-the-badge&logo=awsamplify)](https://aws.amazon.com/amplify)

</div>

---

## Features

| Feature | Description |
|---|---|
| 🌗 **Dark / Light Theme** | One-click toggle with preference persisted in `localStorage` |
| 🌐 **EN / PT i18n** | Full internationalization via `react-i18next` with lazy-loaded JSON files |
| 📱 **Fully Responsive** | Hamburger menu, adaptive grids, "Show more / less" on mobile |
| 🐙 **GitHub Dashboard** | Real-time repos and recent activity via the public GitHub API |
| 🚀 **Project Showcase** | Interactive cards with image carousel, tech stack pills with icons, and live demo links |
| ♿ **Accessibility** | `aria-labels`, `aria-expanded`, visible focus, `role="dialog"` throughout |
| ⚡ **CI/CD** | Automatic deploys via AWS Amplify on every push to `main` |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Language | TypeScript 5.6 |
| Routing | react-router-dom v7 |
| Internationalization | react-i18next + i18next-http-backend |
| Styling | CSS Modules + CSS Custom Properties |
| Icons | Devicon v2 + Font Awesome 5 (CDN) |
| Deployment | AWS Amplify |

---

## Project Structure

```
src/
├── components/
│   ├── ui/                        # Modal, Carousel, ThemeSwitch, ShowMoreButton
│   ├── Navbar/
│   ├── Footer/
│   ├── PersonalData/              # Hero section
│   ├── Profile/
│   ├── Skills/                    # Skills grid with progress bars
│   ├── Education/                 # Degrees & certifications with modals
│   ├── ProfessionalExperiences/
│   ├── Projects/                  # Cards + modal with image carousel
│   ├── ProjectDetails/            # Full detail page at /project/:name
│   └── GithubDashboard/
├── contexts/
│   ├── ThemeContext.tsx            # Light / Dark mode
│   └── LanguageContext.tsx         # EN / PT
├── hooks/
│   ├── useGithub.ts               # Repos and activity from GitHub API
│   ├── useProjects.ts             # Projects loaded from i18n JSONs
│   └── useIsMobile.ts             # Responsive breakpoint detector
├── utils/
│   └── techIcons.tsx              # Shared tech icon map & TechIcon component
├── types/                         # TypeScript interfaces
├── styles/
│   └── global.css                 # CSS variables, reset, base layout
└── i18n.ts                        # i18next configuration

public/
├── locales/
│   ├── en/translation.json        # English content
│   └── pt/translation.json        # Portuguese content
└── icons/                         # Technology SVG icons
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/rodolfodiegosilva/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_GITHUB_USERNAME=rodolfodiegosilva
```

### Development

```bash
# Start dev server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Design System

The project uses CSS Custom Properties for consistent theming across light and dark modes:

| Variable | Light | Dark |
|---|---|---|
| `--bg` | `#f6f9ff` | `#253448` |
| `--surface` | `rgba(255,255,255,0.92)` | `#2e4160` |
| `--text` | `#0a0f1e` | `#e4eef8` |
| `--text-muted` | `#3d526a` | `#85a8c8` |
| `--primary` | `#2ea8ff` | `#2ea8ff` |
| `--accent` | `#a2e718` | `#a2e718` |

---

## Deployment

The project is deployed on **AWS Amplify** with automatic builds triggered by pushes to `main`. The `amplify.yml` configuration:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

---

## License

MIT © [Rodolfo Silva](https://rodolfo-silva.com)


aws amplify update-app \
  --app-id d1er6cwuop5atf \
  --profile conta-aws \
  --environment-variables VITE_GITHUB_USERNAME=rodolfodiegosilva,VITE_GITHUB_TOKEN=ghp_SEU_TOKEN_AQUI