import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
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

  listOwnedLeagues(uid: string): Observable<League[]> {
    return this.list()
      .pipe(map(leagues =>
        leagues.filter(league => league.uid === uid),
      ))
  }

  private setDocument(key: string) {
    this.document = this.collection.doc(key)
  }

  get(): Observable<League> {
    return this.document.valueChanges();
  }

  // Return a single observable item
  set(key: string): Observable<League> {
    this.setDocument(key);
    return this.get();
  }

  add(league: League): void {
    this.auth.user.subscribe(user => {
      if (user) this.collection.add({ ...league, uid: user.uid }).catch(error => this.handleError(error));
    })
  }

  update(league: League): void {
    delete league.id
    this.document.update(league).catch(error => this.handleError(error))
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

class LeagueServiceMock extends LeagueService {
  mockData: League[] = [
      {
        'name': 'beerpong',
        'kfactor': 12,
        'uid': '7e9'
      }
    ]
  list(): Observable<League[]> {
    return of(this.mockData)
  }

  get(): Observable<League> {
    return of(this.mockData[0])
  }

  add(league: League): void {
    this.mockData.push(league)
  }

}
