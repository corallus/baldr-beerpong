import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { Player } from './player';
import { LeagueService } from '../../leagues/shared/league.service';

@Injectable()
export class PlayerService implements OnDestroy {
  private collection: AngularFirestoreCollection<Player>;

  constructor(private leagueService: LeagueService) { 
    console.log('PlayerService instance created.'); 
    this.collection = this.leagueService.document.collection<Player>('players', ref => {
      return ref.orderBy('score', 'desc');
    });
  }
  ngOnDestroy() { console.log('PlayerService instance destroyed.'); }

  create(player: Player): void  {
    this.collection.add({... player});
  }

  filterByName(name: string): Observable<Player[]> {
    const filterValue = name.toLowerCase();
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return { id, ...data };
      }).filter(player => player.name.toLowerCase().includes(filterValue))
      )
    );
  }

  updateScore(player: Player, shift: number) {
    this.get(player.id).pipe(
      tap(dbplayer => {
        if (dbplayer) {
          const score = dbplayer.score + shift;
          this.collection.doc(player.id).update({ score: score })
            .catch(error => this.handleError(error));
        }
      }),
      take(1)
    )
      .subscribe();
  }

  // Return a single observable item
  get(key: string): Observable<Player> {
    return this.collection.doc<Player>(key).valueChanges();
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
