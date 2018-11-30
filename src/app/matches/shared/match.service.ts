import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Match, Result } from './match';
import { PlayerService } from '../../players/shared/player.service';
import { LeagueService } from '../../leagues/shared/league.service';
import { Elo } from './elo';

@Injectable()
export class MatchService implements OnDestroy {

  private collection: AngularFirestoreCollection<Match>;

  constructor(private leagueService: LeagueService, private playerService: PlayerService) { 
    console.log('MatchService instance created.'); 
    this.collection = this.leagueService.document.collection('matches');
  }
  ngOnDestroy() { console.log('MatchService instance destroyed.'); }

  create(match: Match): void  {
    this.collection.add({... match}).catch(error => this.handleError(error));
  }

  updateResult(match: Match, result: Result) {
    const adj = Elo.adjustment(match.white.score, match.black.score, result);
    this.collection.doc(match.id).update({result: result, adjustment: adj})
    .then(_ => {
      this.playerService.updateScore(match.white, adj.white);
      this.playerService.updateScore(match.black, adj.black);
    })
    .catch(error => this.handleError(error));
  }

  finishedMatches(): Observable<Match[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        return { id, ...data };
      }).filter(match => match.result !== undefined)
      )
    );
  }

  plannedMatches(): Observable<Match[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions
        .map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        return { id, ...data };
      }).filter(match => match.result === undefined)
      )
    );
  }
  
  // Deletes a single match
  delete(key: string): void {
    this.collection.doc<Match>(key).delete().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
    console.log('in matchService');
  }
}