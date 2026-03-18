# Plano de Migração: Angular 18 → React + Vite

**Data de criação:** 18/03/2026  
**Projeto de origem:** `my-portifolio-angular`  
**Projeto destino:** `my-portifolio-react` (diretório irmão)

---

## 1. Análise do Projeto Angular Atual

### 1.1 Stack Tecnológico Atual

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | Angular 18 (Standalone Components) |
| Estado global | NgRx Store (apenas idioma) |
| i18n | ngx-translate + HTTP Loader |
| Roteamento | Angular Router |
| UI Components | Angular Material (cards) |
| CSS Framework | Bootstrap 5 (CDN) |
| Ícones | Font Awesome 5 (CDN) + SVGs locais |
| HTTP | Angular HttpClient |
| Infraestrutura | AWS Amplify + S3 |
| Build | Angular CLI + esbuild |

### 1.2 Estrutura de Componentes (Angular)

```
AppComponent (raiz)
├── NavbarComponent
│   └── AppToggleButtonComponent (toggle idioma EN/PT)
├── PersonalDataComponent (hero section)
├── ProfileComponent (sobre mim)
├── SkillsComponent (grid de habilidades)
├── EducationComponent
│   ├── EducationModalComponent
│   └── TechnologyModalComponent
├── ProfessionalExperiencesComponent
│   └── ProfessionalExperienceModalComponent
├── ProjectsComponent
│   └── ProjectModalComponent (com carousel)
├── GithubDashboardComponent
└── FooterComponent

Rota separada:
└── ProjectDetailsComponent (/project/:name)
```

### 1.3 Serviços e Estado

| Serviço Angular | Responsabilidade | Equivalente React |
|-----------------|------------------|-------------------|
| `ThemeService` | Light/Dark tema + localStorage | `ThemeContext` (Context API) |
| `GithubService` | Chamadas à API pública do GitHub | `useGithub` custom hook |
| `ProjectService` | Busca projetos dos JSONs de i18n | `useProjects` custom hook |
| NgRx Store (language) | Estado global do idioma | `LanguageContext` (Context API) |

### 1.4 Dados e Assets

- **Dados de conteúdo**: 100% estáticos nos arquivos `src/assets/i18n/en.json` e `pt.json`
  - Projetos, experiências, skills, educação, certificações
- **Imagens**: Hospedadas em AWS S3 (`my-portifolio-images.s3.us-east-2.amazonaws.com`)
- **Ícones SVG**: `src/assets/icons/` — 16 ícones de tecnologias
- **GitHub username**: `rodolfodiegosilva` (em `environment.ts`)

### 1.5 Sistema de Design

- CSS Variables com suporte a Light/Dark mode via `html[data-theme='dark']`
- Variáveis: `--bg`, `--surface`, `--text`, `--primary (#2ea8ff)`, `--accent (#a2e718)`, `--radius (18px)`
- Background aurora (gradientes radiais duplos no body)
- Glassmorphism na navbar (`backdrop-filter: blur(12px)`)
- Fontes: Inter (Google Fonts) + Font Awesome 5 (CDN)
- Bootstrap 5 usado para: grid, modais, carousel, badges (será eliminado)

---

## 2. Stack Tecnológico do Novo Projeto

| Categoria | Tecnologia Escolhida | Justificativa |
|-----------|---------------------|---------------|
| Framework | React 18 + TypeScript | Migração solicitada |
| Build tool | Vite 5 | Rápido, moderno, DX excelente |
| Roteamento | react-router-dom v6 | Padrão de mercado para React |
| i18n | react-i18next + i18next + i18next-http-backend | Equivalente direto ao ngx-translate |
| Estado global | Context API (React nativo) | NgRx era overkill para apenas 1 slice |
| HTTP | fetch nativo (com custom hooks) | Sem dependência extra necessária |
| CSS | CSS Modules + CSS Variables | Preservar sistema de design existente |
| Modais | Implementação própria (Portal React) | Sem dependência Bootstrap |
| Carousel | Implementação própria (CSS scroll) | Leve e customizável |
| Ícones | Font Awesome 5 (CDN) | Igual ao atual |

---

## 3. Mapeamento Angular → React

### 3.1 Conceitos e Padrões

| Angular | React |
|---------|-------|
| Standalone Components | Function Components |
| `@Input()` | `props` |
| `@Output() EventEmitter` | callback props |
| `*ngFor="let x of list"` | `{list.map(x => ...)}` |
| `*ngIf="condition"` | `{condition && ...}` ou ternário |
| `[class.active]="cond"` | `className={cond ? 'active' : ''}` |
| `(click)="handler()"` | `onClick={handler}` |
| `{{ 'key' \| translate }}` | `{t('key')}` (hook `useTranslation`) |
| `ngOnInit()` | `useEffect(() => {}, [])` |
| `ngOnChanges()` | `useEffect(() => {}, [deps])` |
| `ChangeDetectionStrategy.OnPush` | `React.memo()` |
| `@HostListener('window:resize')` | `window.addEventListener('resize')` no useEffect |
| `@ViewChild` | `useRef` |
| `NgRx Store dispatch` | `useContext` + setState |
| `NgRx Store select` | `useContext` |
| `router.navigate(['/'])` | `navigate('/')` (useNavigate) |
| `ActivatedRoute.params` | `useParams()` |
| `Router.events NavigationEnd` | `useLocation()` + useEffect |
| Bootstrap Modal JS | `useState(isOpen)` + Portal |
| Bootstrap Carousel | State + CSS transitions |
| Angular Material Card | `<div className={styles.card}>` |

### 3.2 Estrutura de Pastas do Projeto React

```
my-portifolio-react/
├── public/
│   ├── locales/
│   │   ├── en/translation.json    ← (antigo src/assets/i18n/en.json)
│   │   └── pt/translation.json    ← (antigo src/assets/i18n/pt.json)
│   └── icons/                     ← (antigo src/assets/icons/)
│       ├── angular-material.svg
│       ├── aws.svg
│       └── ... (16 ícones)
├── src/
│   ├── assets/                    ← favicon e outros
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.module.css
│   │   ├── PersonalData/
│   │   │   ├── PersonalData.tsx
│   │   │   └── PersonalData.module.css
│   │   ├── Profile/
│   │   │   ├── Profile.tsx
│   │   │   └── Profile.module.css
│   │   ├── Skills/
│   │   │   ├── Skills.tsx
│   │   │   └── Skills.module.css
│   │   ├── Education/
│   │   │   ├── Education.tsx
│   │   │   ├── Education.module.css
│   │   │   ├── EducationModal.tsx
│   │   │   ├── EducationModal.module.css
│   │   │   ├── TechnologyModal.tsx
│   │   │   └── TechnologyModal.module.css
│   │   ├── ProfessionalExperiences/
│   │   │   ├── ProfessionalExperiences.tsx
│   │   │   ├── ProfessionalExperiences.module.css
│   │   │   ├── ExperienceModal.tsx
│   │   │   └── ExperienceModal.module.css
│   │   ├── Projects/
│   │   │   ├── Projects.tsx
│   │   │   ├── Projects.module.css
│   │   │   ├── ProjectModal.tsx
│   │   │   └── ProjectModal.module.css
│   │   ├── ProjectDetails/
│   │   │   ├── ProjectDetails.tsx
│   │   │   └── ProjectDetails.module.css
│   │   ├── GithubDashboard/
│   │   │   ├── GithubDashboard.tsx
│   │   │   └── GithubDashboard.module.css
│   │   └── ui/
│   │       ├── Modal.tsx           ← componente modal genérico (Portal)
│   │       ├── Modal.module.css
│   │       ├── Carousel.tsx        ← carousel simples
│   │       ├── Carousel.module.css
│   │       ├── ToggleButton.tsx    ← toggle idioma
│   │       └── ToggleButton.module.css
│   ├── contexts/
│   │   ├── ThemeContext.tsx        ← substitui ThemeService
│   │   └── LanguageContext.tsx     ← substitui NgRx language store
│   ├── hooks/
│   │   ├── useGithub.ts           ← substitui GithubService
│   │   └── useProjects.ts         ← substitui ProjectService
│   ├── types/
│   │   ├── education.types.ts     ← migrado de education.model.ts
│   │   ├── github.types.ts        ← migrado de github.models.ts
│   │   └── project.types.ts       ← migrado de project.service.ts
│   ├── i18n/
│   │   └── i18n.ts                ← configuração do i18next
│   ├── App.tsx                    ← raiz da aplicação
│   ├── main.tsx                   ← entry point (Vite)
│   └── styles/
│       └── global.css             ← migrado de styles.css (CSS vars + body/base)
├── .env                           ← VITE_GITHUB_USERNAME=rodolfodiegosilva
├── index.html                     ← com Font Awesome e Google Fonts (CDN)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 4. Plano de Implementação — Itens em Ordem

### FASE 1 — Scaffold e Configuração Base

#### Item 1: Criar projeto React + Vite
```bash
cd /home/diego-seven/Documents/repositories
npm create vite@latest my-portifolio-react -- --template react-ts
cd my-portifolio-react
npm install
```

#### Item 2: Instalar dependências
```bash
npm install react-router-dom react-i18next i18next i18next-http-backend
npm install @types/react-router-dom
```

#### Item 3: Configurar arquivos base
- `vite.config.ts` — sem configurações especiais necessárias
- `tsconfig.json` — strict mode, paths
- `index.html` — CDN links (Font Awesome, Google Fonts Inter)
- `.env` — `VITE_GITHUB_USERNAME=rodolfodiegosilva`
- `src/i18n/i18n.ts` — configuração do i18next com HTTP backend
- `src/main.tsx` — entry point com providers

---

### FASE 2 — Sistema de Design e Assets

#### Item 4: Migrar estilos globais
- Copiar CSS Variables (light/dark) de `styles.css` para `src/styles/global.css`
- Adicionar reset CSS moderno
- Manter background aurora, scroll behavior, seleção de texto

#### Item 5: Copiar assets
- `src/assets/icons/*.svg` → `public/icons/`
- `src/assets/i18n/en.json` → `public/locales/en/translation.json`
- `src/assets/i18n/pt.json` → `public/locales/pt/translation.json`

---

### FASE 3 — Contexts e Hooks

#### Item 6: ThemeContext
```typescript
// Persiste em localStorage com key 'portfolio.theme'
// Fallback: prefers-color-scheme
// Aplica: document.documentElement.dataset['theme'] = 'dark'|'light'
```

#### Item 7: LanguageContext
```typescript
// Persiste em localStorage com key 'portfolio.language'
// Integrado com i18next (i18n.changeLanguage)
// Idioma inicial: 'en'
```

#### Item 8: Types (interfaces TypeScript)
```typescript
// types/education.types.ts — Education, Course, Technology
// types/github.types.ts — Repository, Activity, GitHubRepoResponse, GitHubEventResponse
// types/project.types.ts — Project, TestDetails
```

#### Item 9: useGithub hook
```typescript
// GET /users/rodolfodiegosilva/repos → Repository[]
// GET /users/rodolfodiegosilva/events → Activity[]
// Filtra e ordena igual ao Angular
```

#### Item 10: useProjects hook
```typescript
// Usa i18next diretamente para ler projects.list do JSON
// getProjects(): Project[]
// getProjectByName(name): Project | undefined
```

---

### FASE 4 — Componentes UI Genéricos

#### Item 11: Modal component (Portal)
```typescript
// Usa ReactDOM.createPortal para renderizar fora do DOM tree
// Props: isOpen, onClose, title, children
// Animação: fade + scale
// Fecha com Escape e click no backdrop
```

#### Item 12: Carousel component
```typescript
// Props: images: string[]
// Botões prev/next, indicadores de dots
// Swipe touch support
```

#### Item 13: ToggleButton (toggle idioma)
```typescript
// Exibe bandeira USA (EN) ou BR (PT)
// Integrado ao LanguageContext
```

---

### FASE 5 — Componentes de Seção

#### Item 14: Navbar
- Menu fixo com glassmorphism
- Links com scroll suave para seções
- Botão de tema (sol/lua)
- Toggle de idioma (EN/PT)
- Menu hamburguer mobile

#### Item 15: Footer
- 3 colunas: About, Links, Social
- Textos via i18n
- Background `#54acd8`

#### Item 16: PersonalData (hero)
- Grid 2 colunas
- Foto de perfil (S3)
- Botões: Download CV, GitHub, LinkedIn
- Texto via i18n

#### Item 17: Profile (sobre mim)
- Grid 2 colunas
- Texto + card de stats
- Atualiza com mudança de idioma

#### Item 18: Skills
- Grid 4 colunas de cards
- Barra de progresso por nível (Advanced=100%, Intermediate=66%, Beginner=33%)
- Dados via i18n

#### Item 19: Education
- 2 colunas: Degrees + Certifications
- Cards com botão "View Details"
- Modal de grau acadêmico
- Modal de tecnologia/cursos

#### Item 20: ProfessionalExperiences
- Cards de experiência
- Modal com responsabilidades e stack
- Botão "Download CV" (link S3)

#### Item 21: Projects
- Grid de cards com imagem, nome, descrição
- Modal com carousel, links, tecnologias com ícones SVG
- Botão "View Details" navega para /project/:name

#### Item 22: GithubDashboard
- Grid de cards de repositórios
- iframe do ghchart (só desktop)
- Lista de atividades recentes (PushEvent + PullRequestEvent)

#### Item 23: ProjectDetails (página /project/:name)
- Carousel de imagens
- Descrição completa
- Grid Frontend vs Backend
- Tecnologias com ícones
- CI/CD, hosting, testes

---

### FASE 6 — Integração Final

#### Item 24: App.tsx
- Providers: ThemeProvider, LanguageProvider, BrowserRouter
- Rota `/` — todas as seções empilhadas
- Rota `/project/:name` — ProjectDetails
- Detecção de rota para mostrar/ocultar seções

#### Item 25: Polimentos e responsividade
- Testar todas as seções em mobile
- Animações de entrada (fade-in, slide-up) via CSS
- Performance: lazy loading de imagens
- Acessibilidade: aria labels, roles
- SEO: meta tags no index.html

---

## 5. Decisões de Design

### 5.1 Sem Bootstrap — CSS Puro
O Bootstrap 5 atual é usado apenas para grid, modais e badges. Na migração:
- **Grid**: CSS Grid/Flexbox nativo
- **Modais**: Implementação própria com Portal React
- **Badges**: `<span>` com CSS customizado
- **Carousel**: Implementação própria

### 5.2 CSS Modules por componente
Cada componente terá seu próprio `.module.css` para encapsulamento, mantendo as CSS variables globais do `global.css`.

### 5.3 Context API vs Zustand/Redux
O NgRx do projeto Angular só gerencia 1 estado (idioma). Context API é suficiente. Se necessário no futuro, migrar para Zustand.

### 5.4 i18next com HTTP Backend
Mantém a mesma estrutura de JSONs, carregando dinamicamente os arquivos de tradução do `public/locales/`.

---

## 6. Riscos e Observações

| Risco | Mitigação |
|-------|-----------|
| Amplify CI/CD buildspec | Atualizar `amplify.yml` para build Vite (`npm run build` → output `dist/`) |
| Modais Bootstrap JS | Reimplementar com React state + Portal |
| Carousel Bootstrap | Reimplementar com CSS scroll/transform |
| Angular Material prebuilt theme | Substituir por CSS customizado |
| `zone.js` removido | React não precisa |
| `environment.ts` → `.env` | `VITE_GITHUB_USERNAME=rodolfodiegosilva` |
| `ChangeDetectionStrategy.OnPush` | `React.memo()` onde necessário |

---

## 7. Cronograma Estimado

| Fase | Itens | Prioridade |
|------|-------|-----------|
| 1 - Scaffold | Itens 1-3 | Alta |
| 2 - Estilos/Assets | Itens 4-5 | Alta |
| 3 - Contexts/Hooks | Itens 6-10 | Alta |
| 4 - Componentes UI | Itens 11-13 | Média |
| 5 - Seções | Itens 14-23 | Alta |
| 6 - Integração | Itens 24-25 | Alta |

---

*Plano criado com base em análise profunda do projeto Angular. Cada item será implementado em sequência, verificando funcionamento antes de avançar para o próximo.*
