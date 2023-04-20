export interface FetchResult<T> {
  docs: T[];
  limit: number;
  offset: number;
  page: number;
  pages: number;
  total: number;
};

export interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
};

export interface Character {
  _id: string;
  name: string;
  birth: string;
  death: string;
  gender: string;
  race: string;
  wikiUrl: string;
};

export interface Quote {
  _id: string;
  movie: string;
  character: string;
  dialog: string;
};
