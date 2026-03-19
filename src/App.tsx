import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { PersonalData } from './components/PersonalData/PersonalData';
import { Profile } from './components/Profile/Profile';
import { Skills } from './components/Skills/Skills';
import { Education } from './components/Education/Education';
import { ProfessionalExperiences } from './components/ProfessionalExperiences/ProfessionalExperiences';
import { Projects } from './components/Projects/Projects';
import { GithubDashboard } from './components/GithubDashboard/GithubDashboard';
import { ProjectDetails } from './components/ProjectDetails/ProjectDetails';

function HomePage() {
  return (
    <main>
      <PersonalData />
      <Profile />
      <Skills />
      <Education />
      <Projects />
      <GithubDashboard />
      <ProfessionalExperiences />
    </main>
  );
}

function ProjectDetailsPage() {
  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <ProjectDetails />
    </main>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:name" element={<ProjectDetailsPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
