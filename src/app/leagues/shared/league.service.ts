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
  private uid: string;

  private collection: AngularFirestoreCollection<League>;

  constructor(private auth: AuthService, private db: AngularFirestore) { 
    console.log('LeagueService instance created.');
    this.collection = this.db.collection<League>('leagues');
    this.auth.user.subscribe(user => {
      if(user) this.uid = user.uid
    })
  }
  ngOnDestroy() { console.log('LeagueService instance destroyed.'); }

  list(): Observable<League[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as League;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
  // Return a single observable item
  get(key: string): AngularFirestoreDocument<League> {
    return this.collection.doc(key);
    //return this.doc.valueChanges();
  }

  add(league: League): void {
    this.auth.user.subscribe(user => {
      if(user) this.collection.add({ ...league, uid: this.uid }).catch(error => this.handleError(error));
    })
  }

  update(document: AngularFirestoreDocument<League>, league: League): void {
      document.update(league).catch(error => this.handleError(error));
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
