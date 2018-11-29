import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Match } from './match';
import { League } from '../../leagues/shared/league';
import { PlayerService } from '../../players/shared/player.service';

@Injectable()
export class MatchService implements OnDestroy {

  private collection: AngularFirestoreCollection<Match>;

  constructor(private playerService: PlayerService) { console.log('MatchService instance created.'); }
  ngOnDestroy() { console.log('MatchService instance destroyed.'); }

  init(leagueDoc: AngularFirestoreDocument<League>): void {
    this.collection = leagueDoc.collection('matches');
  }

  create(match: Match): void  {
    this.collection.add({... match}).catch(error => this.handleError(error));;
  }

  list(): Observable<Match[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
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