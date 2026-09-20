import { GameCard } from './components/GameCard';
import { useNFLScores } from './hooks/useNFLScores';
import { ScoreboardEvent } from './types';

const sortEvents = (left: ScoreboardEvent, right: ScoreboardEvent) => {
  const statusOrder = { in: 3, pre: 2, post: 1 } as const;
  const leftState = left.competitions[0]?.status.type.state ?? 'post';
  const rightState = right.competitions[0]?.status.type.state ?? 'post';

  const statusDiff = (statusOrder[rightState] ?? 0) - (statusOrder[leftState] ?? 0);

  if (statusDiff !== 0) {
    return statusDiff;
  }

  const leftTimestamp = left.date ? new Date(left.date).getTime() : 0;
  const rightTimestamp = right.date ? new Date(right.date).getTime() : 0;

  return leftTimestamp - rightTimestamp;
};

function App() {
  const { games, loading, error, weekNumber } = useNFLScores();
  const orderedGames = [...games].sort(sortEvents);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.38em] text-sky-400">NFL Live Scores</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
              Current Week{weekNumber ? ` • Week ${weekNumber}` : ''}
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/50 bg-sky-500/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-200">
            Auto-refresh 10s
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading && games.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300">
            Chargement des matchs...
          </div>
        ) : orderedGames.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300">
            Aucun match disponible pour le moment.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {orderedGames.map((event) => (
              <GameCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
