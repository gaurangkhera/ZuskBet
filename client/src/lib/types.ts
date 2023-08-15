export type User = {
    id: string;
    username: string;
    email: string;
    bets: Bet[];
}

export type Bet = {
    id: string;
    amount: number;
    betFor: string;
    user: string;
}

  