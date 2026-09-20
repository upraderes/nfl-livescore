import { Competitor } from '../types';

type TeamRowProps = {
  competitor: Competitor;
  isPossession: boolean;
};

export function TeamRow({ competitor, isPossession }: TeamRowProps) {
  const team = competitor.team;
  const scoreValue = Number(competitor.score ?? 0);

  return (
    <div
      className={`flex items-center justify-between rounded-xl border bg-slate-950/40 px-3 py-2 ${
        isPossession ? 'border-amber-400/60 shadow-[0_0_0_1px_rgba(251,191,36,0.2)]' : 'border-slate-800'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
          <img
            src={team.logo}
            alt={`${team.displayName} logo`}
            className="h-8 w-8 object-contain"
          />
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            {competitor.homeAway === 'home' ? 'Home' : 'Away'}
          </div>
          <div className="text-sm font-semibold text-white sm:text-base">
            {team.shortDisplayName || team.displayName}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isPossession && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
            Ball
          </span>
        )}
        <div className="text-3xl font-black text-white">{scoreValue}</div>
      </div>
    </div>
  );
}
