import { useCallback, useEffect, useState } from 'react';
import { ScoreboardEvent, ScoreboardResponse } from '../types';

const API_URL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

const normalizeEvent = (event: ScoreboardEvent): ScoreboardEvent => ({
  ...event,
  competitions: (event.competitions ?? []).map((competition) => ({
    ...competition,
    competitors: (competition.competitors ?? []).map((competitor) => ({
      ...competitor,
      score: competitor.score ?? '0',
    })),
  })),
});

export function useNFLScores() {
  const [games, setGames] = useState<ScoreboardEvent[]>([]);
  const [weekNumber, setWeekNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = useCallback(async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as ScoreboardResponse;
      const nextGames = (data.events ?? []).map(normalizeEvent);

      setGames(nextGames);
      setWeekNumber(data.week?.number ?? null);
      setError(null);
    } catch (fetchError) {
      setError('Impossible de charger les scores NFL en direct.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchScores();

    const intervalId = window.setInterval(() => {
      void fetchScores();
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fetchScores]);

  return { games, loading, error, weekNumber };
}
