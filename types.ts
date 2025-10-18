
export type SaunaType = 'wood' | 'electric' | 'smoke' | 'other';

export interface Sauna {
  id: string;
  name: string;
  description: string;
  type: SaunaType;
  latitude: number;
  longitude: number;
}
