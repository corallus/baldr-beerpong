import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import * as firebase from 'firebase';

import { Match } from './match';
import { PlayerService } from '../../players/shared/player.service';
import { LeagueService } from '../../leagues/shared/league.service';
import { adjustment, Result } from './elo';

@Injectable()
export class MatchService implements OnDestroy {

  private collection: AngularFirestoreCollection<Match>;

  constructor(private leagueService: LeagueService, private playerService: PlayerService) {
    console.log('MatchService instance created.');
    this.collection = this.leagueService.document.collection('matches');
  }
  ngOnDestroy() { console.log('MatchService instance destroyed.'); }

  create(match: Match): void {
    this.collection.add({ 'timestamp': firebase.database.ServerValue.TIMESTAMP, ...match }).catch(error => this.handleError(error));
  }

  private resetPlayerScores(match: Match) {
    if (match.result !== undefined) {
      this.playerService.updateScore(match.white, -match.adjustment.shift.white);
      this.playerService.updateScore(match.black, -match.adjustment.shift.black);
    }
  }

  // Deletes a single match
  delete(match: Match): void {
    this.collection.doc(match.id).delete().then(_ => {
      this.resetPlayerScores(match)
    }).catch(error => this.handleError(error));
  }

  updateResult(match: Match, result: Result) {
    if (match.result !== result) {
      let shift_white: number = 0
      let shift_black: number = 0
      if (match.result !== undefined) {
        shift_white -= match.adjustment.shift.white
        shift_black -= match.adjustment.shift.black
      }
      this.leagueService.get().pipe(
        tap(league => {
          const adj = adjustment(match.white.score, match.black.score, result, league.kfactor)
          this.collection.doc(match.id).update({ result: result, adjustment: adj })
          this.playerService.updateScore(match.white, shift_white + adj.shift.white)
          this.playerService.updateScore(match.black, shift_black + adj.shift.black)
        }),
        take(1)
      )
        .subscribe()
    }
  }

  list(): Observable<Match[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
    );
  }

  finishedMatches(): Observable<Match[]> {
    return this.list().pipe(map(matches =>
      matches.filter(match => match.result !== undefined)
    ))
  }

  plannedMatches(): Observable<Match[]> {
    return this.list().pipe(map(matches =>
      matches.filter(match => match.result === undefined)
    ))
  }

  private handleError(error) {
    console.log(error);
    console.log('in matchService');
  }
}