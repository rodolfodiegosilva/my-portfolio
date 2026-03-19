import { useTranslation } from 'react-i18next';
import type { Project } from '../types/project.types';

export function useProjects() {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true }) as Project[];
  return { projects: Array.isArray(projects) ? projects : [] };
}

export function useProjectByName(name: string) {
  const { projects } = useProjects();
  return projects.find(p => p.project === name) ?? null;
}
