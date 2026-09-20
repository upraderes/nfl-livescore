export type GameStatusType = {
  id?: number;
  name: string;
  state: 'pre' | 'in' | 'post';
  description: string;
  detail?: string;
  shortDetail?: string;
  completed?: boolean;
};

export type GameStatus = {
  clock?: number;
  displayClock?: string;
  period?: number;
  type: GameStatusType;
};

export type Team = {
  id?: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  logo: string;
  color?: string;
  alternateColor?: string;
};

export type Competitor = {
  id?: string;
  homeAway: 'home' | 'away';
  team: Team;
  score?: string;
  winner?: boolean;
  records?: Array<{ summary?: string }>;
};

export type Situation = {
  homeTimeouts?: number;
  awayTimeouts?: number;
  possession?: string;
  possessionText?: string;
  down?: number;
  distance?: number;
  downDistanceText?: string;
  isRedZone?: boolean;
};

export type Competition = {
  id: string;
  competitors: Competitor[];
  status: GameStatus;
  situation?: Situation;
  venue?: { fullName?: string };
};

export type ScoreboardEvent = {
  id: string;
  date?: string;
  name: string;
  shortName: string;
  competitions: Competition[];
  week?: { number?: number };
};

export type ScoreboardResponse = {
  week?: { number?: number };
  events: ScoreboardEvent[];
};
