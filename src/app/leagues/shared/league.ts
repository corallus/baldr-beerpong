export class League {
    name: string = '';
    kfactor: number = 32;
}

export class Player {
    name: string = '';
    score: number = 1500;
}

export class Match {
    winner: Player;
    loser: Player;
    winner_score: number;
    loser_score: number;
}
 