import { GameStatus } from '../types';

type StatusBadgeProps = {
  status: GameStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const state = status?.type?.state ?? 'pre';
  const label = status?.type?.description ?? 'Scheduled';

  const stylesByState: Record<string, string> = {
    pre: 'border-blue-500/50 bg-blue-500/10 text-blue-200',
    in: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200',
    post: 'border-slate-500/50 bg-slate-500/10 text-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${stylesByState[state] ?? stylesByState.pre}`}
    >
      {label}
    </span>
  );
}
