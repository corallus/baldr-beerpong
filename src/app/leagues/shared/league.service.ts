import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { League, Match, Player } from './league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private basePath: string = '/leagues';

  private leagueDoc: AngularFirestoreDocument<League>;
  league: Observable<League> = null;

  private leagueCollection: AngularFirestoreCollection<League>;
  leagues: Observable<League[]> = null;

  private matchCollection: AngularFirestoreCollection<Match>;
  matches: Observable<Match[]> = null;

  private playerCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]> = null;

  constructor(private db: AngularFirestore) { 
    this.leagueCollection = this.db.collection<League>(this.basePath);
  }

  get_matches(): Observable<Match[]> {
    this.matches = this.matchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.matches
  }

  get_players(): Observable<Player[]> {
    this.players = this.playerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.players
  }

  play(match: Match): void  {
    this.matchCollection.add({... match});
  }

  list(): Observable<League[]> {
    this.leagues = this.leagueCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as League;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.leagues
  }
  
  // Return a single observable item
  get(key: string): Observable<League> {
    const leaguePath =  `${this.basePath}/${key}`;
    const matchPath = `${leaguePath}/matches`;
    const playerPath = `${leaguePath}/players`;
    this.matchCollection = this.db.collection<Match>(matchPath);
    this.playerCollection = this.db.collection<Player>(playerPath);
    this.leagueDoc = this.db.doc<League>(leaguePath);
    this.league = this.leagueDoc.valueChanges();
    return this.league
  }

  create(league: League): void  {
    this.leagueCollection.add({... league});
  }
 
  // Update an existing league
  update(league: League): void {
    this.leagueDoc.update(league);
  }
 
  // Deletes a single league
  delete(key: string): void {
    const league = this.get(key);
    this.leagueDoc.delete();
  }
 
  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }u
}
