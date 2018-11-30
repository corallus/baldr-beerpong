import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Match, Result } from '../shared/match';
import { MatchService } from '../shared/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {
  finishedMatches: Observable<Match[]>;
  plannedMatches: Observable<Match[]>;

  constructor(private service: MatchService) { }

  ngOnInit() {
    this.finishedMatches = this.service.finishedMatches();
    this.plannedMatches = this.service.plannedMatches()
  }

  delete(key: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.delete(key);
    }
  }

  setResult(match: Match, result: Result) {
    this.service.updateResult(match, result);
  }
}
