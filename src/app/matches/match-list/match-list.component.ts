import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../shared/match';
import { MatchService } from '../shared/match.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { League } from '../../leagues/shared/league';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {
  public matches: Observable<Match[]>;

  constructor(private service: MatchService) { }

  ngOnInit() {
    this.matches = this.service.list();
  }

  delete(key: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.delete(key);
    }
  }
}
