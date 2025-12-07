export enum GameStatus {
  START = 'START',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

export interface GameResult {
  score: number;
  duration: number; // in seconds
  message: string;
  subMessage: string;
}

export interface TouchState {
  left: boolean;
  right: boolean;
}
