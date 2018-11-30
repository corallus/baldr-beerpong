import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { League } from './league';
import { AuthService } from '../../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService implements OnDestroy {
  document: AngularFirestoreDocument<League> = null;

  private collection: AngularFirestoreCollection<League>;

  constructor(private auth: AuthService, private db: AngularFirestore) { 
    console.log('LeagueService instance created.');
    this.collection = this.db.collection<League>('leagues');
  }
  ngOnDestroy() { 
    console.log('LeagueService instance destroyed.'); 
  }

  list(): Observable<League[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as League;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getLeague(): Observable<League> {
    return this.document.valueChanges();
  }
  
  // Return a single observable item
  get(key: string): Observable<League> {
    this.document = this.collection.doc(key);
    return this.getLeague();
  }

  add(league: League): void {
    this.auth.user.subscribe(user => {
      if(user) this.collection.add({ ...league, uid: user.uid }).catch(error => this.handleError(error));
    })
  }

  update(league: League): void {
      this.document.update(league).catch(error => this.handleError(error));
  }
 
  // Deletes a single league
  delete(key: string): void {
    this.collection.doc(key).delete().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
    console.log('in leagueService');
  }
}
