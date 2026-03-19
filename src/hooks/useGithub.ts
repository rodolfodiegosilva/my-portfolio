import { useState, useEffect } from 'react';
import type { Repository, Activity } from '../types/github.types';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string;
const TOKEN    = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

function getHeaders(): HeadersInit {
  return TOKEN
    ? { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' }
    : { Accept: 'application/vnd.github+json' };
}

export function useGithub() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!USERNAME) {
      setError('GitHub username not configured');
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const headers = getHeaders();
        const [reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=9`, { headers }),
          fetch(`https://api.github.com/users/${USERNAME}/events?per_page=15`, { headers }),
        ]);

        if (!reposRes.ok) throw new Error(`GitHub API error: ${reposRes.status}`);

        const reposData: Repository[] = await reposRes.json();
        const eventsData: Activity[] = await eventsRes.json();

        setRepos(Array.isArray(reposData) ? reposData : []);
        setActivities(
          Array.isArray(eventsData)
            ? eventsData
                .filter(e => ['PushEvent', 'PullRequestEvent', 'CreateEvent'].includes(e.type))
                .slice(0, 8)
            : []
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { repos, activities, loading, error };
}
