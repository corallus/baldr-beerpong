import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { League } from './league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private basePath: string = '/leagues';

  items: Observable<League[]> = null; //  list of objects
  item: Observable<League> = null; //   single object

  constructor(private db: AngularFirestore) { }
}
