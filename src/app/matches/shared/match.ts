import { Player } from "../../players/shared/player";
import { Adjustment, Result } from "./elo"

export class Match {
    id?: string;
    white: Player;
    black: Player;
    result?: Result = 0;
    adjustment?: Adjustment;
    timestamp: string;
}