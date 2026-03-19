import { useState, useEffect } from 'react';
import type { Repository, Activity } from '../types/github.types';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string;

export function useGithub() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${USERNAME}/events?per_page=10`),
        ]);
        const reposData: Repository[] = await reposRes.json();
        const eventsData: Activity[] = await eventsRes.json();
        setRepos(Array.isArray(reposData) ? reposData : []);
        setActivities(
          Array.isArray(eventsData)
            ? eventsData.filter(e => e.type === 'PushEvent' || e.type === 'PullRequestEvent').slice(0, 5)
            : []
        );
      } catch {
        setError('Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { repos, activities, loading, error };
}
