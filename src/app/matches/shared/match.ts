import { Player } from "../../players/shared/player";

export type Result = 1 | 0 | -1;

export class Match {
    id?: string;
    white: Player;
    black: Player;
    result?: Result;
}