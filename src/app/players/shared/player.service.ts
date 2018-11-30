import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Player } from './player';
import { LeagueService } from '../../leagues/shared/league.service';

@Injectable()
export class PlayerService implements OnDestroy {
  private collection: AngularFirestoreCollection<Player>;

  constructor(private leagueService: LeagueService) { 
    console.log('PlayerService instance created.'); 
    this.collection = this.leagueService.document.collection('players', ref => {
      return ref.orderBy('score', 'desc');
    });
  }
  ngOnDestroy() { console.log('PlayerService instance destroyed.'); }

  create(player: Player): void  {
    this.collection.add({... player});
  }

  updateScore(player: Player, score: number) {
    this.collection.doc(player.id).update({score: score })
    .then(_ => console.log('player score updated'))
    .catch(error => this.handleError(error));
  }

  // Return a single observable item
  get(key: string) {
    let doc: AngularFirestoreDocument<Player> = this.collection.doc(key);
    return doc.snapshotChanges();
  }

  list(): Observable<Player[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
 
  // Deletes a single player
  delete(key: string): void {
    this.collection.doc<Player>(key).delete().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
    console.log('in playerService');
  }
}
