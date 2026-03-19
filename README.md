# My Portfolio

Portfolio pessoal desenvolvido em **React + Vite + TypeScript**, com suporte a tema claro/escuro, internacionalização (PT/EN) e design responsivo.

🔗 **Live:** [rodolfo-silva.com](https://rodolfo-silva.com)

---

## ✨ Funcionalidades

- 🌗 **Tema claro/escuro** — alternância com persistência em `localStorage`
- 🌐 **Internacionalização PT/EN** — via `react-i18next` com carregamento dinâmico dos JSONs
- 📱 **Totalmente responsivo** — menu hamburguer, grids adaptativos, "Ver mais/menos" no mobile
- 🐙 **GitHub Dashboard** — repos e atividade recentes via API pública do GitHub
- 🚀 **Deploy automático** — AWS Amplify com CI/CD integrado ao GitHub
- ♿ **Acessibilidade** — `aria-labels`, `aria-expanded`, foco visível, `role="dialog"`

---

## 🏗️ Stack

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | React 19 |
| Build tool | Vite 6 |
| Linguagem | TypeScript 5.6 |
| Roteamento | react-router-dom v7 |
| i18n | react-i18next + i18next-http-backend |
| Estilo | CSS Modules + CSS Variables |
| Deploy | AWS Amplify |

---

## 📁 Estrutura

```
src/
├── components/
│   ├── ui/                  # Modal, Carousel, ThemeSwitch, ToggleButton, ShowMoreButton
│   ├── Navbar/
│   ├── Footer/
│   ├── PersonalData/        # Hero section
│   ├── Profile/
│   ├── Skills/
│   ├── Education/           # Graus + Certificações com modais
│   ├── ProfessionalExperiences/
│   ├── Projects/            # Cards + modal com carousel
│   ├── ProjectDetails/      # Página /project/:name
│   └── GithubDashboard/
├── contexts/
│   ├── ThemeContext.tsx      # Light / Dark mode
│   └── LanguageContext.tsx   # PT / EN
├── hooks/
│   ├── useGithub.ts          # Repos e atividade da API GitHub
│   ├── useProjects.ts        # Projetos dos JSONs de i18n
│   └── useIsMobile.ts        # Breakpoint detector
├── types/                    # Interfaces TypeScript
├── styles/
│   └── global.css            # CSS Variables, reset, layout base
└── i18n.ts                   # Configuração do i18next

public/
├── locales/
│   ├── en/translation.json
│   └── pt/translation.json
└── icons/                    # SVGs das tecnologias
```

---

## 🚀 Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## 🌐 Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_GITHUB_USERNAME=rodolfodiegosilva
```

---

## 🎨 Design System

O projeto usa CSS Variables para garantir consistência e suporte a temas:

| Variável | Claro | Escuro |
|----------|-------|--------|
| `--bg` | `#f6f9ff` | `#253448` |
| `--surface` | `rgba(255,255,255,0.92)` | `#2e4160` |
| `--text` | `#0a0f1e` | `#e4eef8` |
| `--text-muted` | `#3d526a` | `#85a8c8` |
| `--primary` | `#2ea8ff` | `#2ea8ff` |
| `--accent` | `#a2e718` | `#a2e718` |

---

## ☁️ Deploy (AWS Amplify)

O arquivo `amplify.yml` já está configurado para build Vite:

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

## 📄 Licença

MIT © Rodolfo Silva
