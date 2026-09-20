import { Competition, Situation } from '../types';

type SituationBarProps = {
  competition: Competition;
};

const renderTimeouts = (count: number) =>
  Array.from({ length: 3 }, (_, index) => (
    <span
      key={`${count}-${index}`}
      className={`h-2.5 w-2.5 rounded-full ${
        index < count ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'bg-slate-700'
      }`}
    />
  ));

export function SituationBar({ competition }: SituationBarProps) {
  const situation = competition.situation as Situation | undefined;

  if (!situation || competition.status.type.state !== 'in') {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/80 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
        <span className="font-medium text-slate-100">
          {situation.downDistanceText ?? 'Drive information unavailable'}
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">
          {competition.status.type.detail ?? `Q${competition.status.period ?? 1}`}
        </span>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Home TO</span>
          <div className="flex items-center gap-1.5">{renderTimeouts(situation.homeTimeouts ?? 0)}</div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Away TO</span>
          <div className="flex items-center gap-1.5">{renderTimeouts(situation.awayTimeouts ?? 0)}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
        <span>Possession</span>
        <span className="font-semibold text-amber-300">
          {situation.possessionText ?? 'N/A'}
        </span>
      </div>
    </div>
  );
}
