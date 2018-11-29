import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Player } from './player';
import { League } from '../../leagues/shared/league';

@Injectable()
export class PlayerService implements OnDestroy {
  private collection: AngularFirestoreCollection<Player>;

  constructor() { console.log('PlayerService instance created.'); }
  ngOnDestroy() { console.log('PlayerService instance destroyed.'); }

  init(leagueDoc: AngularFirestoreDocument<League>): void {
    this.collection = leagueDoc.collection('players');
  }

  create(player: Player): void  {
    this.collection.add({... player});
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
