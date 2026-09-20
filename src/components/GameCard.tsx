import { Competition, ScoreboardEvent } from '../types';
import { SituationBar } from './SituationBar';
import { StatusBadge } from './StatusBadge';
import { TeamRow } from './TeamRow';

type GameCardProps = {
  event: ScoreboardEvent;
};

export function GameCard({ event }: GameCardProps) {
  const competition: Competition | undefined = event.competitions?.[0];

  if (!competition) {
    return null;
  }

  const home = competition.competitors.find((competitor) => competitor.homeAway === 'home');
  const away = competition.competitors.find((competitor) => competitor.homeAway === 'away');

  if (!home || !away) {
    return null;
  }

  const possessionTeamId = competition.situation?.possession;
  const isRedZone = competition.situation?.isRedZone;

  return (
    <article
      className={`rounded-2xl border p-4 shadow-xl backdrop-blur-sm ${
        competition.status.type.state === 'in'
          ? 'border-emerald-500/60 bg-slate-900/90 ring-1 ring-emerald-500/40'
          : 'border-slate-700/60 bg-slate-900/70'
      } ${isRedZone ? 'shadow-red-500/10' : ''}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{event.shortName}</p>
          <p className="mt-1 text-sm text-slate-300">
            {competition.status.type.detail ?? competition.status.type.description}
          </p>
        </div>

        <StatusBadge status={competition.status} />
      </div>

      <div className="space-y-2">
        <TeamRow competitor={away} isPossession={possessionTeamId === away.team.id} />
        <TeamRow competitor={home} isPossession={possessionTeamId === home.team.id} />
      </div>

      <SituationBar competition={competition} />
    </article>
  );
}
