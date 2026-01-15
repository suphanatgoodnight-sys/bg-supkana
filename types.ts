
export enum GameStatus {
  Available = 'Available',
  Borrowed = 'Borrowed',
}

export interface BoardGame {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  players: string;
  playTime: string;
  status: GameStatus;
}

export interface User {
  name: string;
  email: string;
  picture: string;
}

export interface BorrowingRecord {
  id: string;
  gameId: number;
  gameTitle: string;
  userEmail: string;
  
  players: string;
  room: string;
  borrowerId: string;
  branch: string;

  borrowTimestamp: string;
  returnTimestamp?: string;
}
